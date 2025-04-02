import { SPEED_TEST_CONFIG } from './config';
import { generateTestData } from './utils/testData';
import { calculateSpeed, formatBytes } from './utils/calculations';

export async function downloadTest(): Promise<number> {
  const startTime = performance.now();
  let totalBytes = 0;
  let successfulTests = 0;

  try {
    const downloads = SPEED_TEST_CONFIG.downloadUrls.map(async (url) => {
      for (let retry = 0; retry < SPEED_TEST_CONFIG.maxRetries; retry++) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), SPEED_TEST_CONFIG.testDuration);

          const response = await fetch(url, {
            cache: 'no-store',
            signal: controller.signal,
            headers: {
              'Cache-Control': 'no-cache',
              'Pragma': 'no-cache'
            }
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const reader = response.body?.getReader();
          if (!reader) {
            throw new Error('No reader available');
          }

          let bytes = 0;
          const startBytes = performance.now();

          while (true) {
            const { done, value } = await reader.read();
            
            if (done || performance.now() - startBytes >= SPEED_TEST_CONFIG.testDuration) {
              clearTimeout(timeoutId);
              break;
            }
            
            if (value) {
              bytes += value.length;
            }
          }

          if (bytes > 0) {
            console.log(`Successfully downloaded ${formatBytes(bytes)} from ${url}`);
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
      console.error('All download tests failed');
      return 0;
    }

    const duration = performance.now() - startTime;
    const mbps = calculateSpeed(totalBytes, duration);
    console.log(`Download speed: ${mbps} Mbps (${formatBytes(totalBytes)} in ${(duration/1000).toFixed(1)}s)`);
    return mbps;
  } catch (error) {
    console.error('Download test error:', error);
    return 0;
  }
}