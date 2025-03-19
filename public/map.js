// 地図の初期化処理を行う関数
function initializeMap(lat, lng, locationInfo = null) {
  const mapElement = document.getElementById('map');
  if (!mapElement) return;
  
  try {
    if (lat === undefined || lng === undefined) {
      throw new Error('位置情報データが見つかりません');
    }
    
    // 地図を初期化
    const map = L.map('map').setView([lat, lng], 13);
    
    // タイルレイヤーを追加 (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // マーカーを追加
    const popupContent = locationInfo 
      ? `位置情報: ${locationInfo.city || '不明'}, ${locationInfo.region || '不明'}, ${locationInfo.country_name || '不明'}`
      : '現在地';
    
    L.marker([lat, lng])
      .addTo(map)
      .bindPopup(popupContent)
      .openPopup();
  } catch (error) {
    console.error('Error initializing map:', error);
    
    // エラー時はデフォルトの地図を表示 (東京)
    const map = L.map('map').setView([35.6895, 139.6917], 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    L.marker([35.6895, 139.6917])
      .addTo(map)
      .bindPopup('デフォルト位置: 東京')
      .openPopup();
  }
}

/**
 * 現在の位置情報（緯度・経度）を取得する
 * @returns {Promise<{latitude: number, longitude: number, accuracy: number}>} 緯度・経度・精度を含むオブジェクトのPromise
 */
async function getCurrentPosition() {
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  // ブラウザが Geolocation API をサポートしているか確認
  if (!navigator.geolocation) {
    throw new Error('お使いのブラウザは位置情報の取得をサポートしていません。');
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      // 成功時のコールバック
      (position) => {
        const result = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        };
        console.log("Your current position is:");
        console.log(`Latitude : ${result.latitude}`);
        console.log(`Longitude: ${result.longitude}`);
        console.log(`More or less ${result.accuracy} meters.`);
        resolve(result);
      },
      // エラー時のコールバック
      (error) => {
        let errorMessage;
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = '位置情報の利用が許可されていません。ブラウザの設定で位置情報の利用を許可してください。';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = '現在位置を取得できませんでした。';
            break;
          case error.TIMEOUT:
            errorMessage = '位置情報の取得がタイムアウトしました。';
            break;
          case error.UNKNOWN_ERROR:
          default:
            errorMessage = '不明なエラーが発生しました。';
            break;
        }
        console.warn(`ERROR(${error.code}): ${errorMessage}`);
        reject(new Error(errorMessage));
      },
      options
    );
  });
}

// ページ読み込み時に実行
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // ユーザーの現在位置を取得
    const position = await getCurrentPosition();
    console.log('%cpublic/map.js:98 position', 'color: #007acc;', position);
    
    // グローバル変数 serverGeoData がサーバーサイドから渡されていることを想定
    if (typeof window.serverGeoData !== 'undefined') {
      initializeMap(window.latitude, window.longitude, window.serverGeoData);
    } else {
      initializeMap(window.latitude, window.longitude);
    }
  } catch (error) {
    console.error('位置情報の取得に失敗しました:', error);
    // デフォルトの東京の位置情報で初期化
    const defaultLocation = {
      city: '東京',
      region: '東京都',
      country_name: '日本'
    };
    initializeMap(35.6895, 139.6917, defaultLocation);
  }
}); 