import { type FC, Fragment } from 'hono/jsx';
import type { Location } from '../../types';
import { ResetMapButton } from './ResetMapButton';

type MapProps = {
  location: Location;
};

// JSXコンポーネント（Honoのサーバーサイドレンダリングで使用）
export const Map: FC<MapProps> = ({ location }) => {
  return (
    <Fragment>
      <div className="map-container">
        <div id="map"></div>
        <ResetMapButton />
      </div>
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <script dangerouslySetInnerHTML={{
        __html: `
        // サーバーサイドから渡されたデータをグローバル変数として定義
        window.myLocation = ${JSON.stringify(location)};
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
      `}</style>
    </Fragment>
  );
}; 