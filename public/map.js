// 地図の初期化処理を行う関数
function initializeMap(locations) {
  const mapElement = document.getElementById('map');
  if (!mapElement) return;
  
  try {
    if (!locations || !Array.isArray(locations) || locations.length === 0) {
      throw new Error('位置情報データが見つかりません');
    }
    
    // 地図を初期化 (初期中心点は仮で最初のロケーション)
    const map = L.map('map');
    
    // タイルレイヤーを追加 (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // マーカーを配置するための境界ボックスを作成
    const bounds = L.latLngBounds();
    
    // カスタムマーカーアイコンを作成する関数
    function createColoredMarkerIcon(color = 'blue') {
      return L.divIcon({
        className: 'custom-div-icon',
        html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 3px rgba(0,0,0,0.5);"></div>`,
        iconSize: [22, 22],
        iconAnchor: [11, 11],
        popupAnchor: [0, -11]
      });
    }

    // 各位置にマーカーを追加
    locations.forEach((location) => {
      const lat = location.latitude;
      const lng = location.longitude;
      const info = location.info || null;
      const color = location.color || 'blue'; // デフォルトは青
      
      if (lat === undefined || lng === undefined) {
        console.warn('マーカーの位置情報が不完全です', location);
        return; // この位置はスキップ
      }
      
      // 境界ボックスに位置を追加
      bounds.extend([lat, lng]);
      
      // マーカーを追加
      const popupContent = info 
        ? `位置情報: ${info.city || '不明'}, ${info.region || '不明'}, ${info.country_name || '不明'}`
        : location.label || '位置情報';
      
      // 各マーカーに一意のポップアップを割り当て
      const popup = L.popup().setContent(popupContent);
      
      // 色付きマーカーを作成
      const coloredIcon = createColoredMarkerIcon(color);
      
      L.marker([lat, lng], { icon: coloredIcon })
        .addTo(map)
        .bindPopup(popupContent)
        .openPopup();
    });
    
    // 地図の表示範囲を調整して全てのマーカーを表示
    if (bounds.isValid()) {
      map.fitBounds(bounds, {
        padding: [50, 50], // 境界から少し余白を持たせる
        maxZoom: 15        // ズームしすぎないように制限
      });
    } else {
      // 境界が無効な場合は東京をデフォルト表示
      map.setView([35.6895, 139.6917], 13);
    }
    
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
    enableHighAccuracy: false,
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
  // IP, Cloudflare位置を取得
  const locations = window.locations;

  try {

    // ユーザーの現在位置を取得
    const position = await getCurrentPosition();
    locations.push({
      latitude: position.latitude,
      longitude: position.longitude,
      name: '現在地',
      label: '現在地',
      color: 'blue'
    })
    
    // 複数のピンを表示
    initializeMap(locations);
    
  } catch (error) {
    console.error('位置情報の取得に失敗しました:', error);
    
    initializeMap(locations);
  }
}); 