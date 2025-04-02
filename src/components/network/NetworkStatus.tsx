import React from 'react';
import { NetworkInfo } from '../../types/network';
import { FaBroadcastTower } from 'react-icons/fa';
import ISPDetails from './ISPDetails';
import WifiDetails from './WifiDetails';
import SecurityDetails from './SecurityDetails';
import { GradientText } from '../ui/GradientText';

interface NetworkStatusProps {
  networkInfo?: NetworkInfo;
}

const NetworkStatus: React.FC<NetworkStatusProps> = ({ networkInfo }) => {
  if (!networkInfo) {
    return (
      <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">
          <GradientText>Network Status</GradientText>
        </h2>
        <div className="text-gray-400">Loading network information...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">
          <GradientText>Network Status</GradientText>
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FaBroadcastTower className="text-cyan-400" />
              <span className="text-gray-300">Connection Type:</span>
            </div>
            <span className="text-white font-semibold">
              {networkInfo.networkInfo?.effectiveType?.toUpperCase() || 'Unknown'}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Estimated Speed:</span>
            <span className="text-white">
              {networkInfo.networkInfo?.downlink || 0} Mbps
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-300">Round Trip Time:</span>
            <span className="text-white">
              {networkInfo.networkInfo?.rtt || 0} ms
            </span>
          </div>
        </div>
      </div>

      <WifiDetails wifiInfo={networkInfo.wifi} />
      <SecurityDetails securityInfo={networkInfo.security} />
      <ISPDetails ispInfo={networkInfo.ispInfo} />
    </div>
  );
};

export default NetworkStatus;