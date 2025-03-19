/** @jsxImportSource hono/jsx */
import { type FC } from 'hono/jsx';
import { Layout } from './Layout';
import { IpInfo } from './IpInfo';
import { Map } from './Map';
import type { IPGeoData } from '../../services/geolocation';

type HomePageProps = {
  clientIP: string;
  geoData: IPGeoData;
  latitude: number;
  longitude: number;
};

export const HomePage: FC<HomePageProps> = ({ clientIP, geoData, latitude, longitude }) => {
  return (
    <Layout title="現在地表示 - IP Geolocation">
      <IpInfo clientIP={clientIP} locationInfo={`${geoData.city || '不明'}, ${geoData.region || '不明'}, ${geoData.country_name || '不明'}`} />
      <Map clientIP={clientIP} geoData={geoData} latitude={latitude} longitude={longitude} />
    </Layout>
  );
}; 