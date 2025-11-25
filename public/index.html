<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>RC CAR 급발진 모니터</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f5f5f5;
      margin: 20px;
    }
    h1 {
      margin-bottom: 10px;
    }
    .card {
      background: #ffffff;
      border-radius: 10px;
      padding: 15px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      margin-bottom: 20px;
      max-width: 600px;
    }
    .label {
      font-weight: bold;
    }
    .map-link {
      display: inline-block;
      margin-top: 8px;
      padding: 8px 12px;
      border-radius: 6px;
      background: #4285f4;
      color: #fff;
      text-decoration: none;
      font-size: 0.9rem;
    }
    .map-link.disabled {
      background: #999;
      pointer-events: none;
    }
    #eventList .event-item {
      background: #ffffff;
      border-radius: 8px;
      padding: 10px;
      margin-bottom: 10px;
      box-shadow: 0 1px 4px rgba(0,0,0,0.08);
    }
    #eventList .event-item small {
      color: #555;
    }
  </style>
</head>
<body>

  <h1>🚗 RC CAR 급발진 모니터</h1>

  <!-- 현재 상태 카드 -->
  <div class="card">
    <h2>현재 상태</h2>
    <p><span class="label">AC 압력:</span> <span id="ac">0</span> %</p>
    <p><span class="label">BR 압력:</span> <span id="br">0</span> %</p>
    <p><span class="label">위도(lat):</span> <span id="lat">0</span></p>
    <p><span class="label">경도(lon):</span> <span id="lon">0</span></p>
    <p><span class="label">시간:</span> <span id="time">-</span></p>

    <a id="mapLink" class="map-link disabled" href="#" target="_blank">
      📍 구글맵으로 위치 보기
    </a>
  </div>

  <!-- 급발진 사고 기록 -->
  <div class="card">
    <h2>📜 급발진 사고 기록</h2>
    <div id="eventList">
      <p>기록을 불러오는 중...</p>
    </div>
  </div>

  <script>
    // /data 에서 현재 상태 가져오기
    async function loadCurrentData() {
      try {
        const res = await fetch('/data');
        if (!res.ok) throw new Error('response not ok');
        const data = await res.json();

        document.getElementById('ac').textContent = data.AC ?? 0;
        document.getElementById('br').textContent = data.BR ?? 0;
        document.getElementById('lat').textContent = data.lat ?? 0;
        document.getElementById('lon').textContent = data.lon ?? 0;
        document.getElementById('time').textContent = data.time ?? '-';

        const mapLinkEl = document.getElementById('mapLink');

        // 서버에서 googleMapUrl을 보내주면 그대로 사용, 아니면 lat/lon으로 생성
        let mapUrl = data.googleMapUrl;
        if (!mapUrl && data.lat && data.lon) {
          mapUrl = `https://www.google.com/maps?q=${data.lat},${data.lon}`;
        }

        if (mapUrl && data.lat != 0 && data.lon != 0) {
          mapLinkEl.href = mapUrl;
          mapLinkEl.classList.remove('disabled');
        } else {
          mapLinkEl.href = '#';
          mapLinkEl.classList.add('disabled');
        }

      } catch (err) {
        console.error('loadCurrentData error:', err);
      }
    }

    // /events 에서 급발진 기록 가져오기
    async function loadEvents() {
      try {
        const res = await fetch('/events');
        if (!res.ok) throw new Error('response not ok');
        const events = await res.json();

        const container = document.getElementById('eventList');
        container.innerHTML = '';

        if (!events || events.length === 0) {
          container.innerHTML = '<p>기록 없음</p>';
          return;
        }

        // 최신 기록이 위로 오도록 뒤집기
        const reversed = events.slice().reverse();

        reversed.forEach((ev, idx) => {
          const div = document.createElement('div');
          div.className = 'event-item';

          const ac = ev.AC ?? 0;
          const br = ev.BR ?? 0;
          const lat = ev.lat ?? 0;
          const lon = ev.lon ?? 0;
          const time = ev.time ?? '-';

          let mapUrl = ev.googleMapUrl;
          if (!mapUrl && lat && lon) {
            mapUrl = `https://www.google.com/maps?q=${lat},${lon}`;
          }

          div.innerHTML = `
            <div><strong>#${reversed.length - idx}</strong></div>
            <div><span class="label">시간:</span> ${time}</div>
            <div><span class="label">AC:</span> ${ac} % / <span class="label">BR:</span> ${br} %</div>
            <div><span class="label">위도:</span> ${lat} / <span class="label">경도:</span> ${lon}</div>
            ${mapUrl && lat != 0 && lon != 0
              ? `<div><a href="${mapUrl}" target="_blank" class="map-link">📍 이 위치를 구글맵에서 보기</a></div>`
              : `<div><small>위치 정보 없음</small></div>`
            }
          `;
          container.appendChild(div);
        });

      } catch (err) {
        console.error('loadEvents error:', err);
        const container = document.getElementById('eventList');
        container.innerHTML = '<p>기록을 불러오는 중 오류가 발생했습니다.</p>';
      }
    }

    // 최초 1회 로드
    loadCurrentData();
    loadEvents();

    // 주기적으로 갱신 (필요하면 간격 조정)
    setInterval(loadCurrentData, 3000); // 3초마다 현재 상태
    setInterval(loadEvents, 5000);      // 5초마다 이벤트 목록
  </script>
</body>
</html>
