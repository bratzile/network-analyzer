import axios from 'axios';
import { NetworkInfo, ISPInfo } from '../../types/network';
import { getConnectionInfo } from './utils/connection';
import { getWifiInfo } from './utils/wifi';
import { getSecurityInfo } from './utils/security';

export const getNetworkInfo = async (): Promise<NetworkInfo> => {
  try {
    // Use Promise.allSettled to prevent errors from stopping the entire process
    const [ipResponse, ispResponse] = await Promise.allSettled([
      axios.get('https://api.ipify.org?format=json'),
      axios.get('https://ipapi.co/json/')
    ]);

    const ipData = ipResponse.status === 'fulfilled' ? ipResponse.value.data : null;
    const ispData = ispResponse.status === 'fulfilled' ? ispResponse.value.data : null;

    const ispInfo: ISPInfo = {
      name: ispData?.org || 'Unknown ISP',
      publicIP: ipData?.ip || 'Unknown',
      city: ispData?.city,
      country: ispData?.country_name,
      asn: ispData?.asn
    };

    return {
      networkInfo: getConnectionInfo(),
      wifi: getWifiInfo(),
      security: getSecurityInfo(),
      publicIP: ipData?.ip || 'Unknown',
      ispInfo
    };
  } catch (error) {
    console.error('Error fetching network info:', error);
    return {
      networkInfo: getConnectionInfo(),
      wifi: getWifiInfo(),
      security: getSecurityInfo(),
      publicIP: 'Unknown',
      ispInfo: {
        name: 'Unknown ISP',
        publicIP: 'Unknown',
        city: undefined,
        country: undefined,
        asn: undefined
      }
    };
  }
};