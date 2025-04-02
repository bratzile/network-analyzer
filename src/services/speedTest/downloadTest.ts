import { SPEED_TEST_CONFIG } from './constants';

export async function downloadTest(): Promise<number> {
  const startTime = performance.now();
  let totalBytes = 0;
  let successfulTests = 0;

  try {
    const downloads = SPEED_TEST_CONFIG.downloadUrls.map(async (url) => {
      for (let retry = 0; retry < SPEED_TEST_CONFIG.downloadRetries; retry++) {
        try {
          const timestamp = Date.now();
          const response = await fetch(`${url}?t=${timestamp}`, {
            cache: 'no-store',
            headers: {
              'Cache-Control': 'no-cache',
              'Pragma': 'no-cache'
            }
          });

          if (!response.ok) continue;

          const reader = response.body?.getReader();
          if (!reader) continue;

          let bytes = 0;
          while (true) {
            const { done, value } = await reader.read();
            if (done || performance.now() - startTime >= SPEED_TEST_CONFIG.testDuration) break;
            bytes += value?.length || 0;
          }

          successfulTests++;
          return bytes;
        } catch (error) {
          console.warn(`Download attempt ${retry + 1} failed for ${url}:`, error);
          continue;
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

    const duration = (performance.now() - startTime) / 1000;
    const bitsPerSecond = (totalBytes * 8) / duration;
    const mbps = Math.round(bitsPerSecond / (1024 * 1024));

    return mbps;
  } catch (error) {
    console.error('Download test error:', error);
    return 0;
  }
}