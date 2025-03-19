export type Location = {
  latitude: number | unknown;
  longitude: number | unknown;
  name: string;
  label?: string;
  color?: string;
};

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