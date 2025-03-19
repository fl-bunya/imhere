import { type FC, Fragment } from 'hono/jsx';
import type { Locations } from '../../types';

type MapProps = {
  locations: Locations;
};

// JSXコンポーネント（Honoのサーバーサイドレンダリングで使用）
export const Map: FC<MapProps> = ({ locations }) => {
  return (
    <Fragment>
      <div id="map"></div>
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <script dangerouslySetInnerHTML={{
        __html: `
        // サーバーサイドから渡されたデータをグローバル変数として定義
        window.locations = ${JSON.stringify(locations)};
        `
      }}></script>
      <script src="/map.js"></script>
    </Fragment>
  );
}; 