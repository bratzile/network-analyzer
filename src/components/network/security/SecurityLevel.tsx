import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

interface Props {
  vulnerabilities: string[];
}

export const SecurityLevel: React.FC<Props> = ({ vulnerabilities }) => {
  if (vulnerabilities.length === 0) return null;

  return (
    <div className="mt-4 p-4 bg-red-900/20 rounded-lg border border-red-500/50">
      <div className="flex items-center space-x-2 mb-2">
        <FaExclamationTriangle className="text-red-500" />
        <span className="text-red-500 font-semibold">Security Warnings</span>
      </div>
      <ul className="list-disc list-inside text-red-400 text-sm space-y-1">
        {vulnerabilities.map((vulnerability, index) => (
          <li key={index}>{vulnerability}</li>
        ))}
      </ul>
    </div>
  );
};