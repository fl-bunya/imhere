/** @jsxImportSource hono/jsx */
import { type FC } from 'hono/jsx';

type ResetMapButtonProps = {
  title?: string;
  label?: string;
};

export const ResetMapButton: FC<ResetMapButtonProps> = ({ 
  title = "現在地に戻る", 
  label = "📍 現在地に戻る" 
}) => {
  return (
    <>
      <button 
        id="reset-map-btn" 
        className="reset-map-button" 
        type="button"
        title={title}
      >
        {label}
      </button>
      
      <style jsx>{`
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
    </>
  );
}; 