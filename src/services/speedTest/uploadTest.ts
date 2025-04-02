import { SPEED_TEST_CONFIG } from './constants';

export async function uploadTest(): Promise<number> {
  const startTime = performance.now();
  let totalBytes = 0;
  let successfulTests = 0;

  try {
    // Create test data
    const chunk = new Uint8Array(SPEED_TEST_CONFIG.uploadChunkSize);
    for (let i = 0; i < chunk.length; i++) {
      chunk[i] = Math.random() * 256;
    }
    const blob = new Blob([chunk]);

    // Test multiple endpoints
    const uploads = SPEED_TEST_CONFIG.uploadEndpoints.map(async (endpoint) => {
      let endpointBytes = 0;

      while (performance.now() - startTime < SPEED_TEST_CONFIG.testDuration) {
        for (let retry = 0; retry < SPEED_TEST_CONFIG.uploadRetries; retry++) {
          try {
            const response = await fetch(endpoint, {
              method: 'POST',
              body: blob,
              headers: {
                'Content-Type': 'application/octet-stream'
              }
            });

            if (response.ok) {
              endpointBytes += blob.size;
              successfulTests++;
              break;
            }
          } catch (error) {
            console.warn(`Upload attempt ${retry + 1} failed for ${endpoint}:`, error);
            if (retry === SPEED_TEST_CONFIG.uploadRetries - 1) return 0;
          }
        }
      }

      return endpointBytes;
    });

    const results = await Promise.allSettled(uploads);
    totalBytes = results.reduce((sum, result) => 
      sum + (result.status === 'fulfilled' ? result.value : 0), 0);

    if (successfulTests === 0) {
      console.error('All upload tests failed');
      return 0;
    }

    const duration = (performance.now() - startTime) / 1000;
    const bitsPerSecond = (totalBytes * 8) / duration;
    const mbps = Math.round(bitsPerSecond / (1024 * 1024));

    return mbps;
  } catch (error) {
    console.error('Upload test error:', error);
    return 0;
  }
}