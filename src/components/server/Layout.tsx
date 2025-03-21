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
            padding-top: 60px; /* ヘッダーの高さ分のパディングを追加 */
          }
          header {
            background-color: #4a89dc;
            color: white;
            padding: 1rem;
            text-align: center;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 300; /* 他の要素より前面に */
            width: 100%;
            height: 60px; /* 高さを固定 */
            display: flex;
            align-items: center;
            justify-content: center;
          }
          header h1 {
            margin: 0;
            font-size: 1.5rem;
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
          footer {
            background-color: #f5f7fa;
            padding: 1rem;
            text-align: center;
            margin-top: auto;
            position: relative;
            z-index: 200;
            width: 100%;
          }
          
          /* モバイル用の調整 */
          @media (max-width: 480px) {
            .padded-content {
              padding: 1rem 0.3rem;
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
        <header>
          <h1>{title}</h1>
        </header>
        <main>
          {children}
        </main>
        <footer>
          <p>(c) 2025 IP Geolocation</p>
        </footer>
      </body>
    </html>
  );
}; 