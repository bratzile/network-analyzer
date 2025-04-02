import axios from 'axios';
import { ISPInfo } from '../../../types/network';

export const getISPInfo = async (): Promise<ISPInfo> => {
  try {
    const response = await axios.get('https://ipapi.co/json/', { timeout: 5000 });
    return {
      name: response.data.org || 'Unknown ISP',
      publicIP: response.data.ip,
      city: response.data.city,
      country: response.data.country_name,
      asn: response.data.asn
    };
  } catch (error) {
    console.warn('Failed to fetch ISP info:', error);
    return {
      name: 'Unknown ISP',
      publicIP: 'Unknown',
      city: undefined,
      country: undefined,
      asn: undefined
    };
  }
};