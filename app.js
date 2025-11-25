// app.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());   // JSON 파싱
app.use(express.static('public'));

// 최신 데이터 저장
let latestData = {
  AC: 0,
  BR: 0,
  lat: 0,
  lon: 0,
  time: "",
  googleMapUrl: ""
};

// 급발진 이벤트 기록
let rapidEvents = [];
let lastEventTime = 0;
const EVENT_COOLTIME = 10000; // 10초 쿨타임

// =====================
// RC CAR → SERVER 업로드
// =====================
app.post('/upload', (req, res) => {
  console.log("📩 RC카에서 수신:", req.body);

  const now = Date.now();

  // 구글맵 링크 생성
  const mapUrl = `https://www.google.com/maps?q=${req.body.lat},${req.body.lon}`;

  // 최신 데이터 갱신
  latestData = {
    ...req.body,
    time: new Date().toLocaleString(),
    googleMapUrl: mapUrl
  };

  // 급발진 기록 (쿨타임 적용)
  if (now - lastEventTime >= EVENT_COOLTIME) {

    rapidEvents.push({
      AC: req.body.AC,
      BR: req.body.BR,
      lat: req.body.lat,
      lon: req.body.lon,
      time: new Date().toLocaleString(),
      googleMapUrl: mapUrl
    });

    lastEventTime = now;
    console.log("🚨 급발진 이벤트 기록됨!");
  } else {
    console.log("⏳ 급발진 중복 이벤트 무시됨 (쿨타임)");
  }

  res.json({ status: "OK" });
});

// =====================
// 최신 데이터 반환 (/data)
// =====================
app.get('/data', (req, res) => {
  res.json(latestData);
});

// =====================
// 급발진 이벤트 목록 (/events)
// =====================
app.get('/events', (req, res) => {
  res.json(rapidEvents);
});

// =====================
// 서버 상태 체크
// =====================
app.get('/status', (req, res) => {
  res.json({
    server: "running",
    totalEvents: rapidEvents.length,
    lastEvent: lastEventTime
      ? new Date(lastEventTime).toLocaleString()
      : "None"
  });
});

// =====================
// 서버 실행
// =====================
app.listen(PORT, () => {
  console.log(`🚀 Node 서버 실행 중: http://localhost:${PORT}`);
});
