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
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}; 