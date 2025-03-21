/** @jsxImportSource hono/jsx */
import { type FC } from 'hono/jsx';
import type { Location } from '../../types';

type LocationFormProps = {
  currentLocation: Location;
};

export const LocationForm: FC<LocationFormProps> = ({ currentLocation }) => {
  return (
    <div className="form-container">
      <h2>この位置情報を保存</h2>
      <form action="/api/locations" method="post">
        <input type="hidden" id="browser_lat" name="browser_lat" value={currentLocation.browser?.lat || 0} />
        <input type="hidden" id="browser_lng" name="browser_lng" value={currentLocation.browser?.lng || 0} />
        <input type="hidden" name="ip_lat" value={currentLocation.ip?.lat || 0} />
        <input type="hidden" name="ip_lng" value={currentLocation.ip?.lng || 0} />
        <input type="hidden" name="ip_city" value={currentLocation.ip?.city || ''} />
        <input type="hidden" name="cf_lat" value={currentLocation.cf?.lat || 0} />
        <input type="hidden" name="cf_lng" value={currentLocation.cf?.lng || 0} />
        <input type="hidden" name="cf_city" value={currentLocation.cf?.city || ''} />
        <input type="hidden" name="cf_colo" value={currentLocation.cf?.colo || ''} />
        <input type="hidden" name="client_ip" value={currentLocation.clientIP || ''} />
        
        <div className="form-group">
          <label htmlFor="emoji">絵文字:</label>
          <input type="text" id="emoji" name="emoji" defaultValue="📍" maxLength={2} />
        </div>
        
        <div className="form-group">
          <label htmlFor="message">メッセージ:</label>
          <textarea id="message" name="message" rows={3} placeholder="この場所の思い出や備考..."></textarea>
        </div>
        
        <button type="submit" className="save-button">保存する</button>
      </form>

      <style jsx>{`
        .form-container {
          width: 100%;
          max-width: 800px;
          margin-top: 2rem;
          padding: 1.5rem;
          background-color: #f8f9fa;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        h2 {
          margin-bottom: 1rem;
          color: #333;
          text-align: center;
        }
        .form-group {
          margin-bottom: 1rem;
        }
        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: bold;
        }
        input[type="text"],
        textarea {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
        }
        .save-button {
          display: block;
          width: 100%;
          padding: 0.75rem;
          background-color: #4a89dc;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .save-button:hover {
          background-color: #3a79cc;
        }
      `}</style>
    </div>
  );
}; 