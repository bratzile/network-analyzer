import { SpeedUnit } from '../../../../types/network';

export const BITS_PER_BYTE = 8;
export const BYTES_PER_MB = 1024 * 1024;

export interface SpeedCalculationOptions {
  unit?: SpeedUnit;
  precision?: number;
}

export const calculateSpeed = (
  bytes: number, 
  durationMs: number,
  options: SpeedCalculationOptions = {}
): number => {
  const { 
    unit = 'mbps',
    precision = 0
  } = options;

  const seconds = durationMs / 1000;
  const bits = bytes * BITS_PER_BYTE;
  const megabits = bits / BYTES_PER_MB;
  const speed = megabits / seconds;

  return Number(speed.toFixed(precision));
};

export const calculateAverageLatency = (results: number[]): number => {
  if (results.length === 0) return 0;
  
  // Remove outliers
  results.sort((a, b) => a - b);
  const validResults = results.length > 2 
    ? results.slice(1, -1) 
    : results;
  
  return Math.round(
    validResults.reduce((sum, val) => sum + val, 0) / validResults.length
  );
};

export const formatSpeed = (speed: number, unit: SpeedUnit = 'mbps'): string => {
  return `${speed} ${unit.toUpperCase()}`;
};

export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
};