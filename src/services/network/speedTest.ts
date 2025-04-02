import { SpeedTestResult } from '../../types/network';
import { downloadTest } from './speedTest/download';
import { uploadTest } from './speedTest/upload';
import { measureLatency } from './speedTest/latency';

export const measureNetworkSpeed = async (): Promise<SpeedTestResult> => {
  console.log('Starting network speed test...');
  
  try {
    // Measure latency first
    const ping = await measureLatency();
    console.log('Latency test completed:', ping, 'ms');

    // Then run download and upload tests in parallel
    const [download, upload] = await Promise.all([
      downloadTest(),
      uploadTest()
    ]);

    console.log('Speed test results:', {
      ping: `${ping}ms`,
      download: `${download}Mbps`,
      upload: `${upload}Mbps`
    });

    return {
      ping,
      download,
      upload,
      timestamp: new Date()
    };
  } catch (error) {
    console.error('Speed test failed:', error);
    return {
      ping: 0,
      download: 0,
      upload: 0,
      timestamp: new Date()
    };
  }
};