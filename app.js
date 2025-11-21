// app.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// JSON 파싱
app.use(bodyParser.json());

// public 폴더(index.html) 정적 페이지 제공
app.use(express.static('public'));

// 최신 데이터 저장 변수
let latestData = {
  AC: 0,
  BR: 0,
  lat: 0,
  lon: 0,
  time: ""
};

// *********************
//  RC CAR → SERVER 업로드
// *********************
app.post('/upload', (req, res) => {
  console.log("📩 RC카에서 수신:", req.body);

  // JSON 업데이트
  latestData = {
    ...req.body,
    time: new Date().toLocaleString()
  };

  res.json({ status: "OK" });
});

// *********************
//  브라우저 → 서버에서 데이터 읽기
// *********************
app.get('/data', (req, res) => {
  res.json(latestData);
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`🚀 Node 서버 실행 중: http://localhost:${PORT}`);
});
