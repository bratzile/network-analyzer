import { SPEED_TEST_CONFIG } from './config';
import { generateTestData } from './utils/testData';
import { calculateSpeed, formatBytes } from './utils/calculations';

async function uploadToEndpoint(
  endpoint: string,
  testData: Uint8Array,
  testDuration: number
): Promise<number> {
  let totalBytes = 0;
  const startTime = performance.now();

  try {
    while (performance.now() - startTime < testDuration) {
      const formData = new FormData();
      formData.append('file', new Blob([testData]));

      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      totalBytes += testData.length;
    }

    console.log(`Successfully uploaded ${formatBytes(totalBytes)} to ${endpoint}`);
    return totalBytes;
  } catch (error) {
    console.warn(`Upload failed for ${endpoint}:`, error);
    return 0;
  }
}

export async function uploadTest(): Promise<number> {
  const startTime = performance.now();
  let totalBytes = 0;
  let successfulTests = 0;

  try {
    // Generate smaller test data for more reliable uploads
    const testData = generateTestData(SPEED_TEST_CONFIG.uploadChunkSize);

    for (const endpoint of SPEED_TEST_CONFIG.uploadEndpoints) {
      for (let retry = 0; retry < SPEED_TEST_CONFIG.uploadRetries; retry++) {
        try {
          const bytes = await uploadToEndpoint(
            endpoint,
            testData,
            SPEED_TEST_CONFIG.testDuration
          );

          if (bytes > 0) {
            totalBytes += bytes;
            successfulTests++;
            break;
          }
        } catch (error) {
          console.warn(`Upload attempt ${retry + 1} failed:`, error);
        }
      }
    }

    if (successfulTests === 0) {
      console.error('All upload tests failed');
      return 0;
    }

    const duration = performance.now() - startTime;
    const mbps = calculateSpeed(totalBytes, duration);
    console.log(`Upload speed: ${mbps} Mbps (${formatBytes(totalBytes)} in ${(duration/1000).toFixed(1)}s)`);
    return mbps;
  } catch (error) {
    console.error('Upload test error:', error);
    return 0;
  }
}