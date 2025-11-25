// app.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// JSON 파싱 + 정적 파일(public 폴더) 제공
app.use(bodyParser.json());
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

// 급발진 이벤트 로그
let rapidEvents = [];
let lastEventTime = 0;
const EVENT_COOLTIME = 10000; // 10초

// =====================
// RC CAR → SERVER 업로드
// =====================
app.post('/upload', (req, res) => {
  console.log("📩 RC카에서 수신:", req.body);

  const now = Date.now();

  // 숫자 안전하게 변환
  const ac  = Number(req.body.AC)  || 0;
  const br  = Number(req.body.BR)  || 0;
  const lat = Number(req.body.lat) || 0;
  const lon = Number(req.body.lon) || 0;

  const mapUrl = `https://www.google.com/maps?q=${lat},${lon}`;
  const timeStr = new Date().toLocaleString();

  // 최신 데이터 갱신
  latestData = {
    AC: ac,
    BR: br,
    lat,
    lon,
    time: timeStr,
    googleMapUrl: mapUrl
  };

  // 급발진 로그 (쿨타임 적용)
  if (now - lastEventTime >= EVENT_COOLTIME) {
    rapidEvents.push({
      AC: ac,
      BR: br,
      lat,
      lon,
      time: timeStr,
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
// 최신 데이터 (/data)
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
// 서버 상태 (/status)
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
