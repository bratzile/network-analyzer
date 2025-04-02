export const analyzeSpeed = (speed: number): string => {
  if (speed >= 100) return 'Excellent';
  if (speed >= 50) return 'Good';
  if (speed >= 25) return 'Fair';
  return 'Poor';
};

export const SPEED_THRESHOLDS = {
  EXCELLENT: 100,
  GOOD: 50,
  FAIR: 25
} as const;

export type SpeedRating = 'Excellent' | 'Good' | 'Fair' | 'Poor';