/** @jsxImportSource hono/jsx */
import { type FC } from 'hono/jsx';
import type { LocationRecord } from '../../types';

type LocationsProps = {
  savedLocations: LocationRecord[];
};

export const Locations: FC<LocationsProps> = ({ savedLocations }) => {
  return (
    <div className="locations-container">
      <h2>保存された位置情報</h2>
      
      {savedLocations.length === 0 ? (
        <div className="no-locations">
          <p>保存された位置情報はありません。</p>
          <p>地図上の現在地を保存してみましょう！</p>
        </div>
      ) : (
        <div className="location-grid">
          {savedLocations.map((location, index) => {
            // 日付フォーマットの処理
            const dateObj = new Date(location.created_at);
            const formattedDate = `${dateObj.getFullYear()}/${(dateObj.getMonth() + 1).toString().padStart(2, '0')}/${dateObj.getDate().toString().padStart(2, '0')} ${dateObj.getHours().toString().padStart(2, '0')}:${dateObj.getMinutes().toString().padStart(2, '0')}`;
            
            // 住所情報を整形
            const address = [location.browser_pref, location.browser_city, location.browser_town]
              .filter(part => part && part.trim() !== '')
              .join(' ');
            
            return (
              <div 
                className="location-card" 
                key={location.id} 
                data-location={JSON.stringify(location)}
                id={index === 0 ? 'latest-location' : undefined}
              >
                <div className="location-emoji">{location.emoji || '📍'}</div>
                <div className="location-date">{formattedDate}</div>
                
                {location.message && (
                  <div className="location-message">{location.message}</div>
                )}
                
                <div className="location-meta">
                  <div className="location-address">{address}</div>
                  <div className="location-details">
                    {location.browser_lat && location.browser_lng && (
                      <span className="location-coords">
                        ({location.browser_lat.toFixed(5)},{location.browser_lng.toFixed(5)})
                      </span>
                    )}
                    {location.cf_colo && (
                      <span className="location-colo">CF:{location.cf_colo}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <style jsx>{`
        .locations-container {
          width: 100%;
          padding: 1.5rem 1rem;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.08);
          border: 1px solid rgba(255,255,255,0.8);
          margin-top: 2rem;
          margin-bottom: 2rem;
        }
        
        h2 {
          margin-bottom: 1.5rem;
          color: #2c3e50;
          text-align: center;
          font-weight: 600;
          position: relative;
          padding-bottom: 0.5rem;
        }
        
        h2:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 50px;
          height: 3px;
          background-color: #4a89dc;
          border-radius: 3px;
        }
        
        .no-locations {
          text-align: center;
          padding: 2rem 0;
          color: #6c757d;
          background-color: rgba(255, 255, 255, 0.6);
          border-radius: 8px;
        }
        
        .location-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1rem;
        }
        
        .location-card {
          background-color: white;
          border-radius: 10px;
          padding: 1.2rem;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
          transition: transform 0.3s, box-shadow 0.3s;
          position: relative;
          border: 1px solid #e9ecef;
          cursor: pointer;
          min-height: 120px;
          display: flex;
          flex-direction: column;
        }
        
        .location-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
        }
        
        .location-card.active {
          border: 2px solid #4a89dc;
          background-color: #f0f5ff;
          transform: translateY(-5px);
          box-shadow: 0 8px 15px rgba(74, 137, 220, 0.2);
        }
        
        .location-emoji {
          position: absolute;
          top: -15px;
          left: 50%;
          transform: translateX(-50%);
          background-color: #4a89dc;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-size: 1.5rem;
          color: white;
          box-shadow: 0 4px 8px rgba(74, 137, 220, 0.3);
          z-index: 1;
        }
        
        .location-date {
          text-align: right;
          font-size: 0.8rem;
          color: #6c757d;
          margin-bottom: 0.7rem;
          margin-top: 0.3rem;
        }
        
        .location-message {
          background-color: #f8f9fa;
          border-left: 3px solid #4a89dc;
          padding: 0.7rem;
          margin-bottom: 1rem;
          border-radius: 4px;
          font-style: italic;
          color: #495057;
          word-break: break-word;
        }
        
        .location-meta {
          font-size: 0.85rem;
          color: #495057;
          margin-top: auto;
          word-break: break-word;
          line-height: 1.4;
        }
        
        .location-address {
          margin-bottom: 0.2rem;
        }
        
        .location-details {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .location-coords, .location-colo {
          font-size: 0.75rem;
          color: #adb5bd;
          font-family: monospace;
        }
        
        .location-colo {
          margin-left: auto;
        }
        
        /* ハイライトパルスアニメーション */
        @keyframes highlightPulse {
          0% { box-shadow: 0 0 0 0 rgba(74, 137, 220, 0.7); }
          70% { box-shadow: 0 0 0 15px rgba(74, 137, 220, 0); }
          100% { box-shadow: 0 0 0 0 rgba(74, 137, 220, 0); }
        }
        
        .highlight-pulse {
          animation: highlightPulse 1s ease-out infinite;
        }
        
        @media (max-width: 576px) {
          .locations-container {
            padding: 1rem 0.8rem;
          }
          
          .location-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .location-card {
            padding: 1rem;
            min-height: 100px;
          }
          
          .location-meta {
            font-size: 0.8rem;
          }
          
          .location-coords, .location-colo {
            font-size: 0.7rem;
          }
        }
        
        @media (min-width: 992px) {
          .location-grid {
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 1.5rem;
          }
        }
      `}</style>
      
      <script dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener('DOMContentLoaded', function() {
            // URLのハッシュをチェック
            if (window.location.hash === '#latest-location') {
              // 最新の位置情報カードを取得
              const latestCard = document.getElementById('latest-location');
              
              if (latestCard) {
                // スムーズにスクロール
                setTimeout(() => {
                  latestCard.scrollIntoView({ behavior: 'smooth', block: 'end' });
                  
                  // カードをハイライト表示
                  latestCard.classList.add('active');
                  
                  // 位置情報を地図に表示
                  const locationData = JSON.parse(latestCard.getAttribute('data-location') || '{}');
                  if (locationData.id && window.displaySavedLocation) {
                    window.displaySavedLocation(locationData);
                  }
                  
                  // アニメーション効果
                  latestCard.classList.add('highlight-pulse');
                  setTimeout(() => {
                    latestCard.classList.remove('highlight-pulse');
                  }, 2000);
                }, 300);
                
                // ハッシュを削除（ページを再読み込みしても自動スクロールしないように）
                history.replaceState(null, document.title, window.location.pathname);
              }
            }
          });
        `
      }}></script>
    </div>
  );
};
