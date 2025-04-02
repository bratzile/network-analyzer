import { SpeedTestResult } from '../../../types/network';
import { downloadTest } from './downloadTest';
import { uploadTest } from './uploadTest';
import { latencyTest } from './latencyTest';
import { SpeedTestError } from './errors/SpeedTestError';

export const measureNetworkSpeed = async (): Promise<SpeedTestResult> => {
  try {
    const [ping, download, upload] = await Promise.all([
      latencyTest(),
      downloadTest(),
      uploadTest()
    ]);

    if (ping === 0 && download === 0 && upload === 0) {
      throw new SpeedTestError('All speed tests failed');
    }

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