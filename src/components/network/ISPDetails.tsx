import React from 'react';
import { ISPInfo } from '../../types/network';
import { FaGlobe, FaNetworkWired } from 'react-icons/fa';
import { GradientText } from '../ui/GradientText';

interface Props {
  ispInfo?: ISPInfo;
}

const ISPDetails: React.FC<Props> = ({ ispInfo }) => {
  if (!ispInfo) {
    return null;
  }

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-bold mb-4">
        <GradientText>ISP Information</GradientText>
      </h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FaGlobe className="text-cyan-400" />
            <span className="text-gray-300">Provider:</span>
          </div>
          <span className="text-white">{ispInfo.name}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FaNetworkWired className="text-cyan-400" />
            <span className="text-gray-300">Public IP:</span>
          </div>
          <span className="text-white">{ispInfo.publicIP}</span>
        </div>

        {ispInfo.city && (
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Location:</span>
            <span className="text-white">
              {ispInfo.city}{ispInfo.country ? `, ${ispInfo.country}` : ''}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default ISPDetails;