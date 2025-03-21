/** @jsxImportSource hono/jsx */
import { type FC } from 'hono/jsx';
import { Layout } from './Layout';
import { Map } from './Map';
import { Locations } from './Locations';
import { LocationForm } from './LocationForm';
import type { Location, LocationRecord } from '../../types';

type HomePageProps = {
  currentLocation: Location;
  savedLocations: LocationRecord[];
};

export const HomePage: FC<HomePageProps> = ({ currentLocation, savedLocations }) => {
  return (
    <Layout title="現在地表示 - IP Geolocation">
      <Map location={currentLocation} />
      
      <div className="padded-content" style={{ marginTop: '360px' }}>
        <LocationForm currentLocation={currentLocation} />
        
        <Locations savedLocations={savedLocations} />
      </div>
    </Layout>
  );
}; 