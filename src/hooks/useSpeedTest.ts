import { useState, useCallback } from 'react';
import { SpeedTestResult } from '../types/network';
import { measureNetworkSpeed } from '../services/network';

export const useSpeedTest = () => {
  const [speedTestResults, setSpeedTestResults] = useState<SpeedTestResult>({
    ping: 0,
    download: 0,
    upload: 0,
    timestamp: new Date()
  });

  const [isLoading, setIsLoading] = useState(false);

  const runSpeedTest = useCallback(async () => {
    setIsLoading(true);
    try {
      const results = await measureNetworkSpeed();
      setSpeedTestResults(results);
    } catch (error) {
      console.error('Speed test failed:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    speedTestResults,
    isLoading,
    runSpeedTest
  };
};