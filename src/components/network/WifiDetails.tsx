import React from 'react';
import { WifiInfo } from '../../types/network';
import { FaWifi, FaBroadcastTower, FaSignal } from 'react-icons/fa';
import { GradientText } from '../ui/GradientText';

interface Props {
  wifiInfo?: WifiInfo;
}

const WifiDetails: React.FC<Props> = ({ wifiInfo }) => {
  if (!wifiInfo) {
    return null;
  }

  const getSignalStrengthColor = (strength: number) => {
    if (strength >= 80) return 'text-green-500';
    if (strength >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-bold mb-4">
        <GradientText>WiFi Details</GradientText>
      </h3>
      <div className="space-y-4">
        {wifiInfo.ssid && (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FaWifi className="text-cyan-400" />
              <span className="text-gray-300">Network Name:</span>
            </div>
            <span className="text-white">{wifiInfo.ssid}</span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FaSignal className={getSignalStrengthColor(wifiInfo.signalStrength)} />
            <span className="text-gray-300">Signal Strength:</span>
          </div>
          <span className="text-white">{wifiInfo.signalStrength}%</span>
        </div>

        {wifiInfo.frequency && (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FaBroadcastTower className="text-cyan-400" />
              <span className="text-gray-300">Frequency:</span>
            </div>
            <span className="text-white">
              {wifiInfo.frequency}
              {wifiInfo.channel ? ` (Channel ${wifiInfo.channel})` : ''}
            </span>
          </div>
        )}

        {wifiInfo.capabilities && wifiInfo.capabilities.length > 0 && (
          <div className="mt-4">
            <span className="text-gray-300 block mb-2">Supported Features:</span>
            <div className="flex flex-wrap gap-2">
              {wifiInfo.capabilities.map((capability, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-800 rounded-md text-sm text-cyan-400"
                >
                  {capability}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WifiDetails;