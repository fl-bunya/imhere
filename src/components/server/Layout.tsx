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
          body { 
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
          header {
            background-color: #4a89dc;
            color: white;
            padding: 1rem;
            text-align: center;
          }
          main {
            flex-grow: 1;
            padding: 1rem;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          #map {
            width: 100%;
            height: 400px;
            max-width: 800px;
            margin: 1rem 0;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          .info-container {
            background-color: #f5f7fa;
            border-radius: 8px;
            padding: 1rem;
            margin-bottom: 1rem;
            width: 100%;
            max-width: 800px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.05);
          }
          footer {
            background-color: #f5f7fa;
            padding: 1rem;
            text-align: center;
            margin-top: auto;
          }
        `}</style>
      </head>
      <body>
        <header>
          <h1>現在地表示 - IP Geolocation</h1>
        </header>
        <main>
          {children}
        </main>
        <footer>
          <p>Created with Hono and Bun</p>
        </footer>
      </body>
    </html>
  );
}; 