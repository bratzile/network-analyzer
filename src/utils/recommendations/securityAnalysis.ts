export const getSecurityLevel = (encryption: string): 'Safe' | 'Caution' | 'Unsafe' => {
  const SECURITY_LEVELS = {
    'WPA3': 'Safe',
    'WPA2': 'Caution'
  } as const;

  return SECURITY_LEVELS[encryption] || 'Unsafe';
};

export const SECURITY_RECOMMENDATIONS = {
  WPA3: [
    'Keep your router firmware updated',
    'Use a strong, unique password',
    'Enable firewall protection'
  ],
  WPA2: [
    'Upgrade to WPA3 if your router supports it',
    'Use a strong password with at least 12 characters',
    'Enable additional security features'
  ],
  DEFAULT: [
    'Upgrade to WPA3 immediately',
    'Change encryption settings',
    'Contact your ISP for security guidance'
  ]
} as const;