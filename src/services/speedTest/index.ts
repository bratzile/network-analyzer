import { SpeedTestResult } from '../../types/network';
import { downloadTest } from './downloadTest';
import { uploadTest } from './uploadTest';
import { measureLatency } from './latencyTest';

export const measureNetworkSpeed = async (): Promise<SpeedTestResult> => {
  console.log('Starting network speed test...');
  
  try {
    const [ping, download, upload] = await Promise.all([
      measureLatency(),
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