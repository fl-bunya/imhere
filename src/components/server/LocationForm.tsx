/** @jsxImportSource hono/jsx */
import { type FC } from 'hono/jsx';
import type { Location } from '../../types';

type LocationFormProps = {
  currentLocation: Location;
};

// 位置情報関連の人気絵文字
const popularEmojis = [
  '📍', '📌', '🏠', '🏡', '🏢', '🏫', '🏙️', '🏝️',
  '🏕️', '⛰️', '🌋', '🗻', '🏔️', '🌉', '🌁', '🌃',
  '🚗', '✈️', '🚅', '🚢', '🚲', '🏖️', '🏞️', '🗿'
];

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
        
        <div className="form-group emoji-section">
          <label htmlFor="emoji">場所の絵文字を選択:</label>
          <input type="hidden" id="emoji" name="emoji" value="📍" />
          <div className="emoji-grid">
            {popularEmojis.map((emoji) => (
              <div className="emoji-item" data-emoji={emoji} key={emoji}>
                {emoji}
              </div>
            ))}
          </div>
          <div className="selected-emoji-display">
            <span>選択中: </span>
            <span id="selected-emoji">📍</span>
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="message">メッセージ:</label>
          <textarea 
            id="message" 
            name="message" 
            rows={3} 
            placeholder="この場所の思い出や備考..."
          ></textarea>
        </div>
        
        <button type="submit" className="save-button">
          <span className="save-icon">💾</span> 位置情報を保存する
        </button>
      </form>

      <script dangerouslySetInnerHTML={{
        __html: `
        // 絵文字選択機能のJavaScript
        document.addEventListener('DOMContentLoaded', function() {
          const emojiItems = document.querySelectorAll('.emoji-item');
          const emojiInput = document.getElementById('emoji');
          const selectedEmojiDisplay = document.getElementById('selected-emoji');
          
          // 初期状態で📍を選択状態にする
          document.querySelector('.emoji-item[data-emoji="📍"]').classList.add('selected');
          
          emojiItems.forEach(item => {
            item.addEventListener('click', function() {
              // 以前の選択を解除
              document.querySelectorAll('.emoji-item').forEach(el => {
                el.classList.remove('selected');
              });
              
              // 新しい選択を反映
              this.classList.add('selected');
              const selectedEmoji = this.getAttribute('data-emoji');
              
              // 隠し入力フィールドと表示を更新
              emojiInput.value = selectedEmoji;
              selectedEmojiDisplay.textContent = selectedEmoji;
              
              // アニメーション効果
              this.classList.add('bounce');
              setTimeout(() => {
                this.classList.remove('bounce');
              }, 300);
            });
          });
        });
        `
      }}></script>

      <style jsx>{`
        .form-container {
          width: 100%;
          margin-top: 0;
          padding: 2rem;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.08);
          border: 1px solid rgba(255,255,255,0.8);
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
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #495057;
        }
        
        .emoji-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
          gap: 10px;
          margin-bottom: 0.5rem;
        }
        
        .emoji-item {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          font-size: 1.5rem;
          background-color: white;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 1px solid #dee2e6;
          user-select: none;
        }
        
        .emoji-item:hover {
          transform: translateY(-3px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        
        .emoji-item.selected {
          background-color: #4a89dc;
          color: white;
          border-color: #4a89dc;
          transform: scale(1.1);
          box-shadow: 0 4px 10px rgba(74,137,220,0.3);
        }
        
        .emoji-item.bounce {
          animation: bounce 0.3s ease;
        }
        
        @keyframes bounce {
          0%, 100% { transform: scale(1.1); }
          50% { transform: scale(1.2); }
        }
        
        .selected-emoji-display {
          margin-top: 0.5rem;
          text-align: center;
          font-weight: 500;
          color: #495057;
        }
        
        #selected-emoji {
          font-size: 1.5rem;
          vertical-align: middle;
        }
        
        textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #dee2e6;
          border-radius: 8px;
          font-size: 1rem;
          box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);
          transition: border-color 0.3s, box-shadow 0.3s;
          resize: vertical;
          font-family: inherit;
        }
        
        textarea:focus {
          border-color: #4a89dc;
          box-shadow: 0 0 0 3px rgba(74,137,220,0.15);
          outline: none;
        }
        
        .save-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 0.875rem;
          background: linear-gradient(135deg, #4a89dc 0%, #3a79cc 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 4px 10px rgba(74,137,220,0.3);
        }
        
        .save-button:hover {
          background: linear-gradient(135deg, #3a79cc 0%, #2969bc 100%);
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(74,137,220,0.4);
        }
        
        .save-button:active {
          transform: translateY(0);
          box-shadow: 0 2px 5px rgba(74,137,220,0.2);
        }
        
        .save-icon {
          margin-right: 8px;
          font-size: 1.2rem;
        }
        
        @media (max-width: 576px) {
          .form-container {
            padding: 1.5rem;
          }
          
          .emoji-grid {
            grid-template-columns: repeat(auto-fill, minmax(36px, 1fr));
            gap: 8px;
          }
          
          .emoji-item {
            width: 36px;
            height: 36px;
            font-size: 1.3rem;
          }
        }
      `}</style>
    </div>
  );
}; 