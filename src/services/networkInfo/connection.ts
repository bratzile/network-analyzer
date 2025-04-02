interface NetworkConnection {
  effectiveType: string;
  downlink: number;
  rtt: number;
  saveData: boolean;
}

export const getConnectionInfo = (): NetworkConnection => {
  const connection = (navigator as any).connection || {
    effectiveType: 'unknown',
    downlink: 0,
    rtt: 0,
    saveData: false
  };

  return {
    effectiveType: connection.effectiveType,
    downlink: connection.downlink,
    rtt: connection.rtt,
    saveData: connection.saveData
  };
};