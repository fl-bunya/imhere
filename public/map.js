// グローバル変数
let globalMap = null;
let currentMarkers = [];

// 地図の初期化処理を行う関数
function initializeMap(location) {
  const mapElement = document.getElementById('map');
  if (!mapElement) return;
  
  try {
    if (!location) {
      throw new Error('位置情報データが見つかりません');
    }
    
    // 地図を初期化 (初期中心点は仮で最初のロケーション)
    const map = L.map('map');
    globalMap = map; // グローバル変数に保存
    
    // タイルレイヤーを追加 (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // 現在の位置情報を表示
    displayCurrentLocation(location);
    
  } catch (error) {
    console.error('Error initializing map:', error);
    
    // エラー時はデフォルトの地図を表示 (東京)
    const map = L.map('map').setView([35.6895, 139.6917], 13);
    globalMap = map; // グローバル変数に保存
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    L.marker([35.6895, 139.6917])
      .addTo(map)
      .bindPopup('デフォルト位置: 東京')
      .openPopup();
  }
}

// 現在の位置情報を地図に表示する関数
function displayCurrentLocation(location) {
  if (!globalMap) return;
  
  // 既存のマーカーをクリア
  clearMarkers();
  
  // マーカーを配置するための境界ボックスを作成
  const bounds = L.latLngBounds();
  
  // 各種位置情報のマーカーを追加
  if (location.browser && location.browser.lat && location.browser.lng) {
    const marker = createMarker(location.browser.lat, location.browser.lng, 'ブラウザ位置', 'blue');
    if (marker) {
      bounds.extend([location.browser.lat, location.browser.lng]);
      currentMarkers.push(marker);
    }
  }
  
  if (location.ip && location.ip.lat && location.ip.lng) {
    const marker = createMarker(location.ip.lat, location.ip.lng, `IP位置: ${location.ip.city || ''}`, 'gold');
    if (marker) {
      bounds.extend([location.ip.lat, location.ip.lng]);
      currentMarkers.push(marker);
    }
  }
  
  if (location.cf && location.cf.lat && location.cf.lng) {
    const marker = createMarker(location.cf.lat, location.cf.lng, `Cloudflare: ${location.cf.city || ''} - ${location.cf.colo || ''}`, 'orange');
    if (marker) {
      bounds.extend([location.cf.lat, location.cf.lng]);
      currentMarkers.push(marker);
    }
  }
  
  // 地図の表示範囲を調整して全てのマーカーを表示
  if (bounds.isValid()) {
    globalMap.fitBounds(bounds, {
      padding: [50, 50], // 境界から少し余白を持たせる
      maxZoom: 15        // ズームしすぎないように制限
    });
  } else {
    // 境界が無効な場合は東京をデフォルト表示
    globalMap.setView([35.6895, 139.6917], 13);
  }
}

// 保存された位置情報を表示する関数
function displaySavedLocation(locationData) {
  if (!globalMap) return;
  
  // 既存のマーカーをクリア
  clearMarkers();
  
  // マーカーを配置するための境界ボックスを作成
  const bounds = L.latLngBounds();
  
  // 保存された位置情報のマーカーを追加
  if (locationData.browser_lat && locationData.browser_lng) {
    const marker = createMarker(
      locationData.browser_lat, 
      locationData.browser_lng, 
      `ブラウザ位置 (${locationData.emoji || '📍'})`, 
      'blue'
    );
    if (marker) {
      bounds.extend([locationData.browser_lat, locationData.browser_lng]);
      currentMarkers.push(marker);
    }
  }
  
  if (locationData.ip_lat && locationData.ip_lng) {
    const marker = createMarker(
      locationData.ip_lat, 
      locationData.ip_lng, 
      `IP位置: ${locationData.ip_city || ''} (${locationData.emoji || '📍'})`, 
      'gold'
    );
    if (marker) {
      bounds.extend([locationData.ip_lat, locationData.ip_lng]);
      currentMarkers.push(marker);
    }
  }
  
  if (locationData.cf_lat && locationData.cf_lng) {
    const marker = createMarker(
      locationData.cf_lat, 
      locationData.cf_lng, 
      `Cloudflare: ${locationData.cf_city || ''} - ${locationData.cf_colo || ''} (${locationData.emoji || '📍'})`, 
      'orange'
    );
    if (marker) {
      bounds.extend([locationData.cf_lat, locationData.cf_lng]);
      currentMarkers.push(marker);
    }
  }
  
  // メッセージがあれば表示
  if (locationData.message) {
    const messageLatLng = locationData.browser_lat && locationData.browser_lng
      ? [locationData.browser_lat, locationData.browser_lng]
      : bounds.getCenter();
    const messagePopup = L.popup()
      .setLatLng(messageLatLng)
      .setContent(`<div class="saved-popup"><strong>${locationData.emoji || '📍'}</strong><p>${locationData.message}</p><small>${new Date(locationData.created_at).toLocaleString('ja-JP')}</small></div>`)
      .openOn(globalMap);
    
    // スタイルを追加
    const style = document.createElement('style');
    style.textContent = `
      .saved-popup { text-align: center; }
      .saved-popup strong { font-size: 1.5rem; display: block; margin-bottom: 0.5rem; }
      .saved-popup p { margin: 0.5rem 0; }
      .saved-popup small { color: #666; display: block; margin-top: 0.5rem; }
    `;
    document.head.appendChild(style);
  }
  
  // 地図の表示範囲を調整して全てのマーカーを表示
  if (bounds.isValid()) {
    globalMap.fitBounds(bounds, {
      padding: [50, 50], // 境界から少し余白を持たせる
      maxZoom: 15        // ズームしすぎないように制限
    });
  }
}

// マーカーを作成する関数
function createMarker(lat, lng, info, color) {
  if (!lat || !lng || !globalMap) {
    console.warn('マーカーの位置情報が不完全です', lat, lng);
    return null;
  }
  
  // カスタムマーカーアイコンを作成
  const coloredIcon = createColoredMarkerIcon(color);
  
  // マーカーを追加
  const marker = L.marker([lat, lng], { icon: coloredIcon })
    .addTo(globalMap)
    .bindPopup(info);
  
  return marker;
}

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

// 既存のマーカーをクリアする関数
function clearMarkers() {
  if (!globalMap) return;
  
  // 現在のマーカーをすべて削除
  currentMarkers.forEach(marker => {
    globalMap.removeLayer(marker);
  });
  
  // マーカーの配列をクリア
  currentMarkers = [];
  
  // ポップアップをすべて閉じる
  globalMap.closePopup();
  
  console.log('マーカーをクリアしました');
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

/**
 * 緯度経度から住所情報を取得する
 * @param {number} lng - 経度
 * @param {number} lat - 緯度
 * @returns {Promise<Object>} 住所情報のオブジェクト
 */
async function getAddressFromCoordinates(lng, lat) {
  try {
    if (!lng || !lat || isNaN(lng) || isNaN(lat)) {
      return null;
    }
    
    const response = await fetch(
      `https://geoapi.heartrails.com/api/json?method=searchByGeoLocation&x=${lng}&y=${lat}`
    );
    
    if (!response.ok) {
      console.error('住所情報の取得に失敗しました:', response.statusText);
      return null;
    }
    
    const data = await response.json();
    if (data?.response?.location && data.response.location.length > 0) {
      const location = data.response.location[0];
      return {
        pref: location.prefecture,
        city: location.city,
        town: location.town,
        postal: location.postal
      };
    }
    
    return null;
  } catch (error) {
    console.error('住所情報の取得中にエラーが発生しました:', error);
    return null;
  }
}

// 位置情報カードのクリックイベントをセットアップする関数
function setupLocationCardEvents() {
  // すべての位置情報カードを取得
  const locationCards = document.querySelectorAll('.location-card');
  
  // 各カードにクリックイベントを追加
  locationCards.forEach(card => {
    card.addEventListener('click', function() {
      // カードのデータ属性から位置情報を取得
      const locationData = JSON.parse(this.getAttribute('data-location') || '{}');
      
      // 位置情報を地図に表示
      if (locationData.id) {
        displaySavedLocation(locationData);
        
        // クリックされたカードをハイライト
        document.querySelectorAll('.location-card').forEach(c => {
          c.classList.remove('active');
        });
        this.classList.add('active');
      }
    });
  });
}

// 現在地に戻るボタンのセットアップ関数
function resetMapButtonSetup() {
  const resetBtn = document.getElementById('reset-map-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', function() {
      if (typeof window.myLocation === 'object') {
        // マップを完全にリセット
        clearMarkers();
        
        // ブラウザの位置情報を再取得
        getCurrentPosition().then(position => {
          // ブラウザの位置情報を更新
          if (!window.myLocation.browser) {
            window.myLocation.browser = {};
          }
          window.myLocation.browser.lat = position.latitude;
          window.myLocation.browser.lng = position.longitude;
          
          // 住所情報を取得して更新
          getAddressFromCoordinates(position.longitude, position.latitude).then(addressInfo => {
            if (addressInfo) {
              window.myLocation.browser.pref = addressInfo.pref;
              window.myLocation.browser.city = addressInfo.city;
              window.myLocation.browser.town = addressInfo.town;
              
              // フォームの住所情報も更新
              const browserPrefInput = document.querySelector('input[name="browser_pref"]');
              const browserCityInput = document.querySelector('input[name="browser_city"]');
              const browserTownInput = document.querySelector('input[name="browser_town"]');
              
              if (browserPrefInput) browserPrefInput.value = addressInfo.pref || '';
              if (browserCityInput) browserCityInput.value = addressInfo.city || '';
              if (browserTownInput) browserTownInput.value = addressInfo.town || '';
            }
            
            // フォームの位置情報も更新
            const browserLatInput = document.getElementById('browser_lat');
            const browserLngInput = document.getElementById('browser_lng');
            if (browserLatInput) browserLatInput.value = position.latitude;
            if (browserLngInput) browserLngInput.value = position.longitude;
            
            // 現在位置を表示
            displayCurrentLocation(window.myLocation);
          }).catch(error => {
            console.error('住所情報の取得に失敗しました:', error);
            
            // 住所情報が取得できなくても位置情報だけで地図を表示
            const browserLatInput = document.getElementById('browser_lat');
            const browserLngInput = document.getElementById('browser_lng');
            if (browserLatInput) browserLatInput.value = position.latitude;
            if (browserLngInput) browserLngInput.value = position.longitude;
            
            displayCurrentLocation(window.myLocation);
          });
        }).catch(error => {
          console.error('位置情報の取得に失敗しました:', error);
          // エラーが発生しても既存の位置情報で地図を表示
          displayCurrentLocation(window.myLocation);
        });
        
        // 選択中のカードのハイライトを解除
        document.querySelectorAll('.location-card').forEach(card => {
          card.classList.remove('active');
        });
        
        console.log('地図を現在地に戻しました');
      }
    });
  }
}

// ページ読み込み時に実行
document.addEventListener('DOMContentLoaded', async () => {
  // IP, Cloudflare位置を取得
  const location = window.myLocation;

  try {
    // ユーザーの現在位置を取得
    const position = await getCurrentPosition();
    
    // 初期化または空のオブジェクトを作成
    if (!location.browser) {
      location.browser = {};
    }
    
    location.browser.lat = position.latitude;
    location.browser.lng = position.longitude;
    
    // 住所情報を取得
    try {
      const addressInfo = await getAddressFromCoordinates(position.longitude, position.latitude);
      if (addressInfo) {
        location.browser.pref = addressInfo.pref;
        location.browser.city = addressInfo.city;
        location.browser.town = addressInfo.town;
        
        // フォームの住所情報も更新
        const browserPrefInput = document.querySelector('input[name="browser_pref"]');
        const browserCityInput = document.querySelector('input[name="browser_city"]');
        const browserTownInput = document.querySelector('input[name="browser_town"]');
        
        if (browserPrefInput) browserPrefInput.value = addressInfo.pref || '';
        if (browserCityInput) browserCityInput.value = addressInfo.city || '';
        if (browserTownInput) browserTownInput.value = addressInfo.town || '';
      }
    } catch (addressError) {
      console.error('住所情報の取得に失敗しました:', addressError);
    }
    
    // フォームのinputフィールドに位置情報を設定
    const browserLatInput = document.getElementById('browser_lat');
    const browserLngInput = document.getElementById('browser_lng');
    
    if (browserLatInput) browserLatInput.value = position.latitude;
    if (browserLngInput) browserLngInput.value = position.longitude;
    
    console.log('ブラウザの位置情報をフォームに設定しました:', position.latitude, position.longitude);
    
    // 地図を初期化
    initializeMap(location);
    
  } catch (error) {
    console.error('位置情報の取得に失敗しました:', error);
    
    // 位置情報が取得できなくても地図は表示
    initializeMap(location);
  }
  
  // 位置情報カードのイベントをセットアップ
  setupLocationCardEvents();
  
  // 現在地に戻るボタンのセットアップ
  resetMapButtonSetup();
  
  // DOMが変更された場合（新しいカードが追加された場合など）の対応
  const observer = new MutationObserver(function(mutations) {
    setupLocationCardEvents();
  });
  
  // 監視対象の設定
  const locationsContainer = document.querySelector('.locations-container');
  if (locationsContainer) {
    observer.observe(locationsContainer, { childList: true, subtree: true });
  }
}); 