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
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 300px;
          z-index: 250;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
        #map {
          width: 100%;
          height: 100%;
          border-radius: 0;
        }
      `}</style>
    </Fragment>
  );
}; 