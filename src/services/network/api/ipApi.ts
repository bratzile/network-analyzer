import axios from 'axios';
import { IPInfo } from '../../../types/network';

const IP_APIS = [
  'https://api.ipify.org?format=json',
  'https://api64.ipify.org?format=json'
];

export const getPublicIP = async (): Promise<IPInfo> => {
  for (const api of IP_APIS) {
    try {
      const response = await axios.get(api, { timeout: 5000 });
      return { ip: response.data.ip };
    } catch (error) {
      console.warn(`Failed to fetch IP from ${api}:`, error);
      continue;
    }
  }
  return { ip: 'Unknown' };
};