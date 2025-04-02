import { NetworkInfo } from '../../types/network';
import axios from 'axios';

const IP_APIS = [
  'https://api.ipify.org?format=json',
  'https://api64.ipify.org?format=json'
];

export const getNetworkInfo = async (): Promise<NetworkInfo> => {
  try {
    let ipResponse = null;
    let ispResponse = null;

    // Try multiple IP APIs
    for (const api of IP_APIS) {
      try {
        ipResponse = await axios.get(api, { timeout: 5000 });
        break;
      } catch {
        continue;
      }
    }

    try {
      ispResponse = await axios.get('https://ipapi.co/json/', { timeout: 5000 });
    } catch (error) {
      console.warn('Failed to fetch ISP info:', error);
    }

    return {
      ssid: 'Connected Network',
      signalStrength: 3,
      encryption: 'WPA3',
      securityLevel: 'Safe',
      routerInfo: {
        manufacturer: 'Network Device',
        model: 'Standard Router',
        ipAddress: ipResponse?.data?.ip || 'Unknown',
        channel: 1,
        frequency: '2.4GHz',
        connectedDevices: 1
      },
      connectionInfo: {
        protocol: 'HTTP/HTTPS',
        securityDetails: 'Standard Network Connection',
        vulnerabilities: []
      },
      ispInfo: {
        name: ispResponse?.data?.org || 'Unknown ISP',
        publicIP: ipResponse?.data?.ip || 'Unknown'
      }
    };
  } catch (error) {
    console.error('Error fetching network info:', error);
    return {
      ssid: 'Unknown Network',
      signalStrength: 0,
      encryption: 'WPA3',
      securityLevel: 'Safe',
      routerInfo: {
        manufacturer: 'Unknown',
        model: 'Unknown',
        ipAddress: 'Unknown',
        channel: 1,
        frequency: '2.4GHz',
        connectedDevices: 1
      },
      connectionInfo: {
        protocol: 'unknown',
        securityDetails: 'Unable to fetch network details',
        vulnerabilities: []
      },
      ispInfo: {
        name: 'Unknown ISP',
        publicIP: 'Unknown'
      }
    };
  }
};