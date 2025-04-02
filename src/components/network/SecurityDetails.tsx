import React from 'react';
import { SecurityInfo } from '../../types/network';
import { FaLock, FaShieldAlt } from 'react-icons/fa';
import { GradientText } from '../ui/GradientText';
import { SecurityLevel } from './security/SecurityLevel';
import { SecurityProtocol } from './security/SecurityProtocol';

interface Props {
  securityInfo?: SecurityInfo;
}

const SecurityDetails: React.FC<Props> = ({ securityInfo }) => {
  if (!securityInfo) {
    return null;
  }

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-bold mb-4">
        <GradientText>Security Details</GradientText>
      </h3>
      <div className="space-y-4">
        <SecurityProtocol protocol={securityInfo.protocol} />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FaShieldAlt className="text-pink-400" />
            <span className="text-gray-300">Encryption:</span>
          </div>
          <span className="text-white">{securityInfo.encryption}</span>
        </div>

        {securityInfo.authenticationMethod && (
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Authentication:</span>
            <span className="text-white">{securityInfo.authenticationMethod}</span>
          </div>
        )}

        {securityInfo.vulnerabilities.length > 0 && (
          <SecurityLevel 
            vulnerabilities={securityInfo.vulnerabilities} 
          />
        )}
      </div>
    </div>
  );
};

export default SecurityDetails;