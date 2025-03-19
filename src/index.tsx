import { Hono } from 'hono'
import { HomePage } from './components/server/HomePage';
import { GeolocationService } from './services/geolocation-service';

const app = new Hono()

app.get('/', async (c) => {

  const cf = c.req.raw.cf // Cloudflareのエッジ情報
  const latitude = cf?.latitude
  const longitude = cf?.longitude

  // クライアントのIPアドレスを取得（Cloudflare Workers では cf オブジェクトから取得可能）
  const clientIP = c.req.raw.headers.get('cf-connecting-ip') || 
                   c.req.header('x-forwarded-for') || 
                   '8.8.8.8';

                   console.log('%csrc/index.tsx:13 clientIP', 'color: #007acc;', clientIP);
  const ip = (clientIP === "::1" || clientIP === "127.0.0.1")
    ? "8.8.8.8"
    : clientIP;
  console.log('%csrc/index.tsx:17 ip', 'color: #007acc;', ip);

  // サーバーサイドでIPジオロケーションデータを取得
  const geoData = await GeolocationService.getLocationByIp(ip);
  
  // JSXコンポーネントを使ってレンダリング
  return c.html(<HomePage clientIP={clientIP} geoData={geoData} latitude={latitude} longitude={longitude}/>);
})

app.get('/map.js', (c) => {
  return c.env.ASSETS.fetch(c.request);
})

export default app
