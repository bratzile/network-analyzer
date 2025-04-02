import { UsageRecommendation } from '../../types/network';

export const ACTIVITY_REQUIREMENTS = {
  VOICE_CALLS: {
    minSpeed: 1,
    minPing: 150,
    description: 'Minimum 1 Mbps required'
  },
  VIDEO_CALLS: {
    minSpeed: 5,
    minPing: 100,
    description: 'Minimum 5 Mbps required for HD quality'
  },
  HD_STREAMING: {
    minSpeed: 10,
    description: 'Minimum 10 Mbps required for 1080p'
  },
  GAMING: {
    minSpeed: 20,
    minPing: 50,
    description: 'Minimum 20 Mbps required for online gaming'
  }
};

export const getActivityRecommendations = (speed: number): UsageRecommendation[] => {
  return [
    {
      activity: 'Voice Calls',
      suitable: speed >= ACTIVITY_REQUIREMENTS.VOICE_CALLS.minSpeed,
      minSpeed: ACTIVITY_REQUIREMENTS.VOICE_CALLS.minSpeed,
      minPing: ACTIVITY_REQUIREMENTS.VOICE_CALLS.minPing,
      recommendation: ACTIVITY_REQUIREMENTS.VOICE_CALLS.description,
      icon: 'phone'
    },
    {
      activity: 'Video Calls',
      suitable: speed >= ACTIVITY_REQUIREMENTS.VIDEO_CALLS.minSpeed,
      minSpeed: ACTIVITY_REQUIREMENTS.VIDEO_CALLS.minSpeed,
      minPing: ACTIVITY_REQUIREMENTS.VIDEO_CALLS.minPing,
      recommendation: ACTIVITY_REQUIREMENTS.VIDEO_CALLS.description,
      icon: 'video'
    },
    {
      activity: 'HD Streaming',
      suitable: speed >= ACTIVITY_REQUIREMENTS.HD_STREAMING.minSpeed,
      minSpeed: ACTIVITY_REQUIREMENTS.HD_STREAMING.minSpeed,
      recommendation: ACTIVITY_REQUIREMENTS.HD_STREAMING.description,
      icon: 'tv'
    },
    {
      activity: 'Gaming',
      suitable: speed >= ACTIVITY_REQUIREMENTS.GAMING.minSpeed,
      minSpeed: ACTIVITY_REQUIREMENTS.GAMING.minSpeed,
      minPing: ACTIVITY_REQUIREMENTS.GAMING.minPing,
      recommendation: ACTIVITY_REQUIREMENTS.GAMING.description,
      icon: 'gamepad'
    }
  ];
};