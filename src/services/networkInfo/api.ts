import axios from 'axios';

export interface IPResponse {
  ip: string;
}

export interface ISPResponse {
  org: string;
}

export const getPublicIP = async (): Promise<IPResponse> => {
  try {
    const apis = [
      'https://api.ipify.org?format=json',
      'https://api64.ipify.org?format=json'
    ];
    
    for (const api of apis) {
      try {
        const response = await axios.get(api, { timeout: 5000 });
        return { ip: response.data.ip };
      } catch {
        continue;
      }
    }
    throw new Error('Failed to fetch IP');
  } catch (error) {
    console.error('Error fetching public IP:', error);
    return { ip: 'Unknown' };
  }
};

export const getISPInfo = async (): Promise<ISPResponse> => {
  try {
    const response = await axios.get('https://ipapi.co/json/', { timeout: 5000 });
    return {
      org: response.data.org || 'Unknown ISP'
    };
  } catch (error) {
    console.error('Error fetching ISP info:', error);
    return {
      org: 'Unknown ISP'
    };
  }
};