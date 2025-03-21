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

type Marker = {
  lat: number;
  lng: number;
}

export type Location = {
  browser?: Marker & {
    pref?: string;
    city?: string;
    town?: string;
  },
  ip?: Marker & {
    city?: string;
  },
  cf?: Marker & {
    city?: string;
    colo?: string;
  },
  clientIP?: string;
  emoji?: string;
  message?: string;
};

export type LocationRecord = {
  id: number;
  browser_lat: number;
  browser_lng: number;
  browser_pref?: string;
  browser_city?: string;
  browser_town?: string;
  ip_lat: number;
  ip_lng: number;
  ip_city: string;
  cf_lat: number;
  cf_lng: number;
  cf_city: string;
  cf_colo: string;
  client_ip: string;
  emoji: string;
  message: string;
  created_at: string;
}; 