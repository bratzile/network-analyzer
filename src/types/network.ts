// Speed test related types
export type SpeedUnit = 'mbps' | 'kbps' | 'bps';

export interface SpeedTestResult {
  ping: number;
  download: number;
  upload: number;
  timestamp: Date;
}

// Network information types
export interface WifiInfo {
  ssid?: string;
  signalStrength: number;
  frequency?: string;
  channel?: number;
  encryption?: string;
  securityProtocol?: string;
  bssid?: string;
  capabilities?: string[];
}

export interface SecurityInfo {
  protocol: string;
  encryption: string;
  authenticationMethod?: string;
  keyManagement?: string;
  vulnerabilities: string[];
  recommendations: string[];
}

export interface IPInfo {
  ip: string;
}

export interface ISPInfo {
  name: string;
  publicIP: string;
  city?: string;
  country?: string;
  asn?: string;
}

export interface NetworkInfo {
  networkInfo: {
    effectiveType: string;
    downlink: number;
    rtt: number;
    saveData: boolean;
  };
  wifi: WifiInfo;
  security: SecurityInfo;
  publicIP: string;
  ispInfo: ISPInfo;
}

// Usage recommendations
export interface UsageRecommendation {
  activity: string;
  suitable: boolean;
  minSpeed: number;
  minPing?: number;
  recommendation: string;
  icon: string;
}