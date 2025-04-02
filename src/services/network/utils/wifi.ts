import { WifiInfo } from '../../../types/network';

export const getWifiInfo = (): WifiInfo => {
  return {
    signalStrength: Math.floor(Math.random() * 100), // Simulated signal strength
    capabilities: [
      'WPA3',
      '802.11ax',
      'MIMO',
      'Beamforming'
    ],
    frequency: '5 GHz',
    channel: 36,
    encryption: 'WPA3-Personal',
    securityProtocol: 'SAE'
  };
};