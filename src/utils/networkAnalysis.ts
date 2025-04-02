import { UsageRecommendation } from '../types/network';

export const analyzeSpeed = (speed: number): string => {
  if (speed >= 100) return 'Excellent';
  if (speed >= 50) return 'Good';
  if (speed >= 25) return 'Fair';
  return 'Poor';
};

export const getSecurityLevel = (encryption: string): 'Safe' | 'Caution' | 'Unsafe' => {
  switch (encryption) {
    case 'WPA3':
      return 'Safe';
    case 'WPA2':
      return 'Caution';
    default:
      return 'Unsafe';
  }
};

export const getUsageRecommendations = (speed: number): UsageRecommendation[] => {
  return [
    {
      activity: 'Voice Calls',
      suitable: speed >= 1,
      minSpeed: 1,
      minPing: 150,
      recommendation: 'Minimum 1 Mbps required',
      icon: 'phone'
    },
    {
      activity: 'Video Calls',
      suitable: speed >= 5,
      minSpeed: 5,
      minPing: 100,
      recommendation: 'Minimum 5 Mbps required for HD quality',
      icon: 'video'
    },
    {
      activity: 'HD Streaming',
      suitable: speed >= 10,
      minSpeed: 10,
      recommendation: 'Minimum 10 Mbps required for 1080p',
      icon: 'tv'
    },
    {
      activity: 'Gaming',
      suitable: speed >= 20,
      minSpeed: 20,
      minPing: 50,
      recommendation: 'Minimum 20 Mbps required for online gaming',
      icon: 'gamepad'
    }
  ];
};