/** @jsxImportSource hono/jsx */
import { type FC } from 'hono/jsx';
import { Layout } from './Layout';
import { IpInfo } from './IpInfo';
import { Map } from './Map';
import type { Location } from '../../types';

type HomePageProps = {
  locations: Location[];
};

export const HomePage: FC<HomePageProps> = ({ locations }) => {
  return (
    <Layout title="現在地表示 - IP Geolocation">
      {/* <IpInfo clientIP={clientIP} locationInfo={`${geoData.city || '不明'}, ${geoData.region || '不明'}, ${geoData.country_name || '不明'}`} /> */}
      <Map locations={locations} />
    </Layout>
  );
}; 