import { Hono } from 'hono'
import { HomePage } from './components/server/HomePage';
import { GeolocationService } from './services/geolocation-service';
import { Locations } from './components/server/Locations';
import type { Location, LocationRecord } from './types';

type Bindings = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

app.get('/', async (c) => {
  const currentLocation: Location = {}

  // クライアントIPを取得
  const clientIP = c.req.raw.headers.get('cf-connecting-ip') || 
                   c.req.header('x-forwarded-for') || 
                   '8.8.8.8';
  // IPアドレスをLocationオブジェクトに設定
  currentLocation.clientIP = clientIP;

  // Cloudflareから位置情報を取得
  currentLocation.cf = {
    lat: c.req.raw.cf?.latitude as number,
    lng: c.req.raw.cf?.longitude as number,
    city: c.req.raw.cf?.city as string,
    colo: c.req.raw.cf?.colo as string,
  }

  // IPアドレスから位置情報を取得
  const ip = (clientIP === "::1" || clientIP === "127.0.0.1")
    ? "116.82.245.239"
    : clientIP;
  const geoData = await GeolocationService.getLocationByIp(ip);
  currentLocation.ip = {
    lat: geoData?.latitude as number,
    lng: geoData?.longitude as number,
    city: geoData?.city,
  }

  // D1からlocationレコードを取得
  const { results } = await c.env.DB.prepare(
    "SELECT * FROM locations ORDER BY created_at DESC LIMIT 10"
  ).all();
  const savedLocations = results as LocationRecord[] || [];

  // JSXコンポーネントを使ってレンダリング
  return c.html(<HomePage currentLocation={currentLocation} savedLocations={savedLocations}/>);
})

app.post('/api/locations', async (c) => {
  try {
    const formData = await c.req.formData();
    const browser_lat = Number(formData.get('browser_lat') || 0);
    const browser_lng = Number(formData.get('browser_lng') || 0);
    const browser_pref = String(formData.get('browser_pref') || '');
    const browser_city = String(formData.get('browser_city') || '');
    const browser_town = String(formData.get('browser_town') || '');
    const ip_lat = Number(formData.get('ip_lat') || 0);
    const ip_lng = Number(formData.get('ip_lng') || 0);
    const ip_city = String(formData.get('ip_city') || '');
    const cf_lat = Number(formData.get('cf_lat') || 0);
    const cf_lng = Number(formData.get('cf_lng') || 0);
    const cf_city = String(formData.get('cf_city') || '');
    const cf_colo = String(formData.get('cf_colo') || '');
    const client_ip = String(formData.get('client_ip') || '');
    const emoji = String(formData.get('emoji') || '📍');
    const message = String(formData.get('message') || '');

    const stmt = c.env.DB.prepare(`
      INSERT INTO locations (
        browser_lat, browser_lng, 
        browser_pref, browser_city, browser_town,
        ip_lat, ip_lng, ip_city, 
        cf_lat, cf_lng, cf_city, cf_colo, 
        client_ip, emoji, message
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      browser_lat, browser_lng,
      browser_pref, browser_city, browser_town,
      ip_lat, ip_lng, ip_city,
      cf_lat, cf_lng, cf_city, cf_colo,
      client_ip, emoji, message
    );

    await stmt.run();
    return c.redirect('/');
  } catch (error) {
    console.error('Error saving location:', error);
    return c.text('保存中にエラーが発生しました', 500);
  }
})

app.get('/api/locations', async (c) => {
  const { results } = await c.env.DB.prepare(
    "SELECT * FROM locations ORDER BY created_at DESC"
  ).all();
  
  return c.json(results as LocationRecord[]);
})

export default app
