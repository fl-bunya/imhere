/** @jsxImportSource hono/jsx */
import { type FC, Fragment } from 'hono/jsx';
import type { IPGeoData } from '../../types/geolocation';

type MapProps = {
  clientIP: string;
  geoData: IPGeoData;
  latitude: number;
  longitude: number;
};

// JSXコンポーネント（Honoのサーバーサイドレンダリングで使用）
export const Map: FC<MapProps> = ({ clientIP, geoData, latitude, longitude }) => {
  return (
    <Fragment>
      <div id="map"></div>
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <script dangerouslySetInnerHTML={{
        __html: `
        // サーバーサイドから渡されたデータをグローバル変数として定義
        window.serverGeoData = ${JSON.stringify(geoData)};
        window.clientIP = "${clientIP}";
        window.latitude = ${latitude};
        window.longitude = ${longitude};
        `
      }}></script>
      <script src="/map.js"></script>
    </Fragment>
  );
}; 