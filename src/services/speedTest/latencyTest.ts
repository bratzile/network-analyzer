import { SPEED_TEST_CONFIG } from './constants';

export async function measureLatency(): Promise<number> {
  const results: number[] = [];

  for (const endpoint of SPEED_TEST_CONFIG.pingEndpoints) {
    for (let retry = 0; retry < SPEED_TEST_CONFIG.pingRetries; retry++) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), SPEED_TEST_CONFIG.pingTimeout);

        const start = performance.now();
        await fetch(endpoint, {
          method: 'HEAD',
          cache: 'no-store',
          signal: controller.signal,
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          }
        });
        clearTimeout(timeout);

        const latency = performance.now() - start;
        results.push(latency);
        break;
      } catch (error) {
        console.warn(`Ping attempt ${retry + 1} failed for ${endpoint}:`, error);
        continue;
      }
    }
  }

  if (results.length === 0) {
    console.error('All latency tests failed');
    return 0;
  }

  // Remove outliers
  results.sort((a, b) => a - b);
  const validResults = results.slice(1, -1);
  
  // Calculate average of remaining values
  return Math.round(
    validResults.reduce((sum, val) => sum + val, 0) / validResults.length
  );
}