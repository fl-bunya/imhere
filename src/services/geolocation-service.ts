import type { IPGeoData } from '../types';

/**
 * IPジオロケーションAPIを使用して位置情報を取得するサービス
 */
export class GeolocationService {
  /**
   * IPアドレスから位置情報を取得
   * @param ipAddress IPアドレス
   * @returns 位置情報データ
   */
  static async getLocationByIp(ipAddress: string): Promise<IPGeoData> {
    try {
      console.log(`サーバーサイドでIPジオロケーション取得: ${ipAddress}`);
      
      // Cloudflare Workers 環境では、fetch にオプションを指定して信頼性を向上
      const response = await fetch(`https://ipapi.co/${ipAddress}/json/`, {
        headers: {
          'User-Agent': 'Cloudflare Worker',
        },
        cf: {
          cacheTtl: 3600, // 1時間キャッシュ
          cacheEverything: true
        }
      });
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json() as IPGeoData;
      
      if (data.error) {
        throw new Error(data.reason || '位置情報の取得に失敗しました');
      }
      
      return {
        ...data,
        ip: ipAddress
      };
    } catch (error) {
      console.error('Error fetching location data:', error);
      
      // エラー時はデフォルトの東京の位置情報を返す
      return {
        ip: ipAddress,
        city: '東京',
        region: '東京都',
        country_name: '日本',
        latitude: 35.6895,
        longitude: 139.6917,
        error: true,
        reason: error instanceof Error ? error.message : '位置情報の取得に失敗しました'
      };
    }
  }
} 