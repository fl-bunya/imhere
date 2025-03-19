/**
 * IPジオロケーションデータの型定義
 */
export interface IPGeoData {
  ip: string;
  city?: string;
  region?: string;
  country_name?: string;
  latitude?: number;
  longitude?: number;
  error?: boolean;
  reason?: string;
} 