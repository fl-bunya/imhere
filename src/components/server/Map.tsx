import { type FC, Fragment } from 'hono/jsx';
import type { Location } from '../../types';

type MapProps = {
  location: Location;
};

// JSXコンポーネント（Honoのサーバーサイドレンダリングで使用）
export const Map: FC<MapProps> = ({ location }) => {
  return (
    <Fragment>
      <div className="map-container">
        <div id="map"></div>
        <button 
          id="reset-map-btn" 
          className="reset-map-button" 
          type="button"
          title="現在地に戻る"
        >
          📍 現在地に戻る
        </button>
      </div>
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <script dangerouslySetInnerHTML={{
        __html: `
        // サーバーサイドから渡されたデータをグローバル変数として定義
        window.myLocation = ${JSON.stringify(location)};
        
        // 現在地に戻るボタンのイベントリスナー
        document.addEventListener('DOMContentLoaded', function() {
          const resetBtn = document.getElementById('reset-map-btn');
          if (resetBtn) {
            resetBtn.addEventListener('click', function() {
              if (typeof displayCurrentLocation === 'function' && window.myLocation) {
                displayCurrentLocation(window.myLocation);
                
                // 選択中のカードのハイライトを解除
                document.querySelectorAll('.location-card').forEach(card => {
                  card.classList.remove('active');
                });
              }
            });
          }
        });
        `
      }}></script>
      <script src="/map.js"></script>
      
      <style jsx>{`
        .map-container {
          position: relative;
          width: 100%;
          height: 400px;
          margin-bottom: 1rem;
        }
        #map {
          width: 100%;
          height: 100%;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .reset-map-button {
          position: absolute;
          bottom: 20px;
          right: 20px;
          padding: 8px 12px;
          background-color: white;
          border: 1px solid #ccc;
          border-radius: 4px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          cursor: pointer;
          z-index: 1000;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 4px;
          opacity: 0.8;
          transition: opacity 0.2s, transform 0.2s;
        }
        .reset-map-button:hover {
          opacity: 1;
          transform: translateY(-2px);
        }
      `}</style>
    </Fragment>
  );
}; 