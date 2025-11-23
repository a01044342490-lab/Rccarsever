// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());              // ⭐ CORS 허용
app.use(bodyParser.json());   // JSON 파싱
app.use(express.static('public'));

let latestData = {
  AC: 0,
  BR: 0,
  lat: 0,
  lon: 0,
  time: ""
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

  // 최신 데이터 업데이트
  latestData = {
    ...req.body,
    time: new Date().toLocaleString()
  };

  // 급발진 서버 쿨타임 처리
  if (now - lastEventTime >= EVENT_COOLTIME) {
    rapidEvents.push({
      ...req.body,
      time: new Date().toLocaleString(),
      googleMapUrl: `https://www.google.com/maps?q=${req.body.lat},${req.body.lon}`
    });

    lastEventTime = now;
    console.log("🚨 급발진 이벤트 기록됨!");
  } else {
    console.log("⏳ 급발진 중복 이벤트 무시됨 (쿨타임)");
  }

  res.json({ status: "OK" });
});

// =====================
// 최신 데이터 + Google Map URL 반환
// =====================
app.get('/data', (req, res) => {
  const googleMapUrl = `https://www.google.com/maps?q=${latestData.lat},${latestData.lon}`;
  
  res.json({
    ...latestData,
    googleMapUrl
  });
});

// =====================
// 급발진 이벤트 목록 조회
// =====================
app.get('/events', (req, res) => {
  res.json(rapidEvents);
});

// =====================
// 서버 상태
// =====================
app.get('/status', (req, res) => {
  res.json({
    server: "running",
    totalEvents: rapidEvents.length,
    lastEvent: lastEventTime
      ? new Date(lastEventTime).toLocaleString()
      : "None",
  });
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`🚀 Node 서버 실행 중: http://localhost:${PORT}`);
});
