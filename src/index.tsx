import { Hono } from 'hono'
import { HomePage } from './components/server/HomePage';
import { GeolocationService } from './services/geolocation-service';
import type { Location } from './types';
const app = new Hono()

app.get('/', async (c) => {
  const locations: Location[] = []

  // Cloudflareのエッジ情報
  const cf = c.req.raw.cf
  locations.push({
    latitude: cf?.latitude,
    longitude: cf?.longitude,
    name: 'Cloudflare',
    label: 'Cloudflare',
    color: 'orange'
  })

  // クライアントのIPアドレスを取得
  const clientIP = c.req.raw.headers.get('cf-connecting-ip') || 
                   c.req.header('x-forwarded-for') || 
                   '8.8.8.8';
  const ip = (clientIP === "::1" || clientIP === "127.0.0.1")
    ? "8.8.8.8"
    : clientIP;  // サーバーサイドでIPジオロケーションデータを取得
  const geoData = await GeolocationService.getLocationByIp(ip);
  locations.push({
    latitude: geoData?.latitude,
    longitude: geoData?.longitude,
    name: 'IP',
    label: 'IP',
    color: 'gold'
  })

  // JSXコンポーネントを使ってレンダリング
  return c.html(<HomePage locations={locations}/>);
})

export default app
