import { SPEED_TEST_CONFIG } from './config';
import { calculateSpeed } from './utils/calculations';
import { generateTestData } from './utils/testData';
import { SpeedTestError } from './errors/SpeedTestError';
import { handleUploadStream } from './utils/streamHandlers';

export const uploadTest = async (): Promise<number> => {
  const startTime = performance.now();
  let totalBytes = 0;

  try {
    const testData = generateTestData(SPEED_TEST_CONFIG.uploadChunkSize);

    while (performance.now() - startTime < SPEED_TEST_CONFIG.testDuration) {
      const bytes = await handleUploadStream(testData, SPEED_TEST_CONFIG.uploadEndpoint);
      totalBytes += bytes;
    }

    return calculateSpeed(totalBytes, performance.now() - startTime);
  } catch (error) {
    if (error instanceof SpeedTestError) {
      throw error;
    }
    throw new SpeedTestError('Upload test failed: ' + error.message);
  }
};