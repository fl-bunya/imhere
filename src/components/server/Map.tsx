import { type FC, Fragment } from 'hono/jsx';
import type { Location } from '../../types';

type MapProps = {
  location: Location;
};

// JSXコンポーネント（Honoのサーバーサイドレンダリングで使用）
export const Map: FC<MapProps> = ({ location }) => {
  return (
    <Fragment>
      <div id="map"></div>
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <script dangerouslySetInnerHTML={{
        __html: `
        // サーバーサイドから渡されたデータをグローバル変数として定義
        window.myLocation = ${JSON.stringify(location)};
        `
      }}></script>
      <script src="/map.js"></script>
    </Fragment>
  );
}; 