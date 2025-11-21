// app.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));  // public 폴더의 index.html 제공

// 최신 데이터 저장용 (메모리)
let latestData = {
  AC_pct: 0,
  BR_pct: 0,
  lat: 0,
  lon: 0,
  time: ""
};

// ESP01/ESP32에서 데이터를 업로드하는 엔드포인트
app.post('/upload', (req, res) => {
  console.log("📩 RC카에서 수신:", req.body);
  latestData = {
    ...req.body,
    time: new Date().toLocaleString()
  };
  res.send({ status: "OK" });
});

// 브라우저/프론트엔드에서 데이터를 가져가는 엔드포인트
app.get('/data', (req, res) => {
  res.send(latestData);
});

app.listen(PORT, () => {
  console.log(`🚀 Node 서버 실행 중: 포트 ${PORT}`);
});
