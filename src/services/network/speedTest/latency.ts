import { SPEED_TEST_CONFIG } from './config';

export async function measureLatency(): Promise<number> {
  const results: number[] = [];

  for (const endpoint of SPEED_TEST_CONFIG.pingEndpoints) {
    for (let retry = 0; retry < SPEED_TEST_CONFIG.pingRetries; retry++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), SPEED_TEST_CONFIG.pingTimeout);

        const start = performance.now();
        const response = await fetch(endpoint, {
          method: 'GET',
          cache: 'no-store',
          signal: controller.signal,
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache'
          }
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const latency = performance.now() - start;
        
        if (latency > 0) {
          results.push(latency);
          console.log(`Successful ping to ${endpoint}: ${Math.round(latency)}ms`);
          break;
        }
      } catch (error) {
        if (error.name === 'AbortError') {
          console.warn(`Ping timeout for ${endpoint}`);
        } else {
          console.warn(`Ping attempt ${retry + 1} failed for ${endpoint}:`, error);
        }
      }
    }
  }

  if (results.length === 0) {
    console.error('All ping attempts failed');
    return 0;
  }

  // Calculate average
  const average = results.reduce((sum, val) => sum + val, 0) / results.length;
  return Math.round(average);
}