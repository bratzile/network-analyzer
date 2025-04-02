import React from 'react';
import { FaLock } from 'react-icons/fa';
import { getSecurityLevel } from '../../../utils/recommendations/securityAnalysis';

interface Props {
  protocol: string;
}

export const SecurityProtocol: React.FC<Props> = ({ protocol }) => {
  const securityLevel = getSecurityLevel(protocol);
  const colorClass = {
    Safe: 'text-green-500',
    Caution: 'text-yellow-500',
    Unsafe: 'text-red-500'
  }[securityLevel];

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <FaLock className={colorClass} />
        <span className="text-gray-300">Security Protocol:</span>
      </div>
      <span className="text-white">{protocol}</span>
    </div>
  );
};