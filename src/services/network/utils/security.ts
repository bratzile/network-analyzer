import { SecurityInfo } from '../../../types/network';

export const getSecurityInfo = (): SecurityInfo => {
  return {
    protocol: 'WPA3',
    encryption: 'AES-GCMP-256',
    authenticationMethod: 'SAE',
    keyManagement: 'PSK',
    vulnerabilities: [],
    recommendations: [
      'Enable WPA3 if your router supports it',
      'Use a strong, unique password',
      'Keep your router firmware updated',
      'Enable firewall protection'
    ]
  };
};