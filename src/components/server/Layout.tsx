/** @jsxImportSource hono/jsx */
import { type FC } from 'hono/jsx';

type LayoutProps = {
  children: any;
  title: string;
};

export const Layout: FC<LayoutProps> = ({ children, title }) => {
  return (
    <html lang="ja">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <style>{`
          * {
            box-sizing: border-box;
          }
          html, body { 
            margin: 0;
            padding: 0;
            width: 100%;
            overflow-x: hidden;
          }
          body { 
            font-family: Arial, sans-serif;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
          main {
            flex-grow: 1;
            padding: 0;
            display: flex;
            flex-direction: column;
            align-items: stretch;
            width: 100%;
          }
          .padded-content {
            padding: 1rem 0.5rem;
            width: 100%;
            box-sizing: border-box;
          }
          #map {
            width: 100%;
            height: 100%;
          }
          .info-container {
            background-color: #f5f7fa;
            border-radius: 8px;
            padding: 1rem;
            margin-bottom: 1rem;
            width: 100%;
            box-shadow: 0 2px 5px rgba(0,0,0,0.05);
          }
          
          /* スクロールトップボタン */
          .scroll-top-button {
            position: fixed;
            right: 20px;
            bottom: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: #4a89dc;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            border: none;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
          }
          
          .scroll-top-button.visible {
            opacity: 0.9;
            visibility: visible;
          }
          
          .scroll-top-button:hover {
            opacity: 1;
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
          }
          
          /* モバイル用の調整 */
          @media (max-width: 480px) {
            .padded-content {
              padding: 1rem 0.3rem;
            }
            
            .scroll-top-button {
              width: 40px;
              height: 40px;
              font-size: 20px;
              right: 15px;
              bottom: 15px;
            }
          }
          
          /* タブレット・PCの場合は少し余白を持たせる */
          @media (min-width: 1200px) {
            .padded-content {
              padding: 1rem calc((100% - 1100px) / 2);
              max-width: 100%;
            }
          }
        `}</style>
      </head>
      <body>
        <main>
          {children}
        </main>
        
        <button id="scrollTopButton" className="scroll-top-button" title="最上部に戻る">
          ↑
        </button>
        
        <script dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('DOMContentLoaded', function() {
              const scrollButton = document.getElementById('scrollTopButton');
              const scrollThreshold = 300; // スクロール量がこの値を超えたらボタンを表示
              
              // スクロールイベントでボタンの表示・非表示を切り替え
              window.addEventListener('scroll', function() {
                if (window.scrollY > scrollThreshold) {
                  scrollButton.classList.add('visible');
                } else {
                  scrollButton.classList.remove('visible');
                }
              });
              
              // ボタンクリック時に最上部にスクロール
              scrollButton.addEventListener('click', function() {
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                });
              });
            });
          `
        }}></script>
      </body>
    </html>
  );
}; 