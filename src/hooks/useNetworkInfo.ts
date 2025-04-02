import { useState, useEffect } from 'react';
import { NetworkInfo } from '../types/network';
import { getNetworkInfo } from '../services/network';

export const useNetworkInfo = () => {
  const [networkInfo, setNetworkInfo] = useState<NetworkInfo | undefined>(undefined);

  useEffect(() => {
    let mounted = true;

    const fetchNetworkInfo = async () => {
      try {
        const info = await getNetworkInfo();
        if (mounted) {
          setNetworkInfo(info);
        }
      } catch (error) {
        console.error('Error fetching network info:', error);
        if (mounted) {
          setNetworkInfo(undefined);
        }
      }
    };

    fetchNetworkInfo();
    const interval = setInterval(fetchNetworkInfo, 30000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return networkInfo;
};