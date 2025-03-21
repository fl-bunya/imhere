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
        <p>保存された位置情報はありません。</p>
      ) : (
        <div className="locations-list">
          {savedLocations.map((loc) => (
            <div key={loc.id} className="location-card">
              <div className="location-header">
                <span className="location-emoji">{loc.emoji || '📍'}</span>
                <span className="location-date">{new Date(loc.created_at).toLocaleString('ja-JP')}</span>
              </div>
              <div className="location-content">
                {loc.message && <p className="location-message">{loc.message}</p>}
                <div className="location-details">
                  {loc.client_ip && (
                    <div className="location-info">
                      <strong>IP:</strong> {loc.client_ip}
                    </div>
                  )}
                  {loc.ip_city && (
                    <div className="location-info">
                      <strong>IP位置:</strong> {loc.ip_city} ({loc.ip_lat.toFixed(4)}, {loc.ip_lng.toFixed(4)})
                    </div>
                  )}
                  {loc.cf_city && (
                    <div className="location-info">
                      <strong>Cloudflare:</strong> {loc.cf_city} - {loc.cf_colo} ({loc.cf_lat.toFixed(4)}, {loc.cf_lng.toFixed(4)})
                    </div>
                  )}
                  {loc.browser_lat && loc.browser_lng && (
                    <div className="location-info">
                      <strong>ブラウザ位置:</strong> ({loc.browser_lat.toFixed(4)}, {loc.browser_lng.toFixed(4)})
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <style jsx>{`
        .locations-container {
          width: 100%;
          max-width: 800px;
          margin-top: 2rem;
        }
        h2 {
          margin-bottom: 1rem;
          color: #333;
          text-align: center;
        }
        .locations-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1rem;
        }
        .location-card {
          background-color: #f8f9fa;
          border-radius: 8px;
          padding: 1rem;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          transition: transform 0.2s;
        }
        .location-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .location-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
          border-bottom: 1px solid #eee;
          padding-bottom: 0.5rem;
        }
        .location-emoji {
          font-size: 1.5rem;
        }
        .location-date {
          font-size: 0.8rem;
          color: #666;
        }
        .location-message {
          font-style: italic;
          margin-bottom: 1rem;
          color: #555;
        }
        .location-details {
          font-size: 0.9rem;
        }
        .location-info {
          margin-bottom: 0.5rem;
        }
      `}</style>
    </div>
  );
};
