import { type FC } from 'hono/jsx';
import { Layout } from './Layout';

type HomeProps = {
  // clientIP: string;
  // geoData: IPGeoData;
  latitude: number;
  longitude: number;
};

export const Home: FC<HomeProps> = ({ latitude, longitude }) => {
  return (
    <Layout title="現在地表示 - IP Geolocation">
      <p>Hello</p>
      <p>latitude: {latitude}</p>
      <p>longitude: {longitude}</p>
    </Layout>
  );
}; 