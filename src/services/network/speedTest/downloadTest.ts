import { SPEED_TEST_CONFIG } from './config';
import { calculateSpeed } from './utils/calculations';
import { SpeedTestError } from './errors/SpeedTestError';
import { handleDownloadStream } from './utils/streamHandlers';

export const downloadTest = async (): Promise<number> => {
  const startTime = performance.now();
  let totalBytes = 0;
  let successfulTests = 0;

  try {
    const downloads = SPEED_TEST_CONFIG.downloadUrls.map(async (url) => {
      for (let retry = 0; retry < SPEED_TEST_CONFIG.maxRetries; retry++) {
        try {
          const bytes = await handleDownloadStream(url, startTime);
          if (bytes > 0) {
            successfulTests++;
            return bytes;
          }
        } catch (error) {
          console.warn(`Download attempt ${retry + 1} failed for ${url}:`, error);
        }
      }
      return 0;
    });

    const results = await Promise.allSettled(downloads);
    totalBytes = results.reduce((sum, result) => 
      sum + (result.status === 'fulfilled' ? result.value : 0), 0);

    if (successfulTests === 0) {
      throw new SpeedTestError('All download tests failed');
    }

    return calculateSpeed(totalBytes, performance.now() - startTime);
  } catch (error) {
    if (error instanceof SpeedTestError) {
      throw error;
    }
    throw new SpeedTestError(`Download test failed: ${error.message}`);
  }
};