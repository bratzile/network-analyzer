export type SecurityLevel = 'Safe' | 'Caution' | 'Unsafe';

export interface SecurityProtocol {
  name: string;
  level: SecurityLevel;
  description: string;
}

export interface SecurityVulnerability {
  severity: 'high' | 'medium' | 'low';
  description: string;
  impact: string;
}