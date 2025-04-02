import { SPEED_TEST_CONFIG } from './config';
import { SpeedTestError } from './errors/SpeedTestError';
import { calculateAverageLatency } from './utils/calculations';

export const latencyTest = async (): Promise<number> => {
  const results: number[] = [];

  for (const endpoint of SPEED_TEST_CONFIG.pingEndpoints) {
    for (let retry = 0; retry < SPEED_TEST_CONFIG.maxRetries; retry++) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), SPEED_TEST_CONFIG.pingTimeout);

        const start = performance.now();
        const response = await fetch(endpoint, {
          method: 'HEAD',
          cache: 'no-store',
          signal: controller.signal
        });
        
        clearTimeout(timeout);

        if (response.ok) {
          const latency = performance.now() - start;
          results.push(latency);
          break;
        }
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.warn(`Ping attempt ${retry + 1} failed for ${endpoint}:`, error);
        }
      }
    }
  }

  if (results.length === 0) {
    throw new SpeedTestError('All latency tests failed');
  }

  return calculateAverageLatency(results);
};