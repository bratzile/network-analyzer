import React from 'react';
import { motion } from 'framer-motion';
import { RouterInfo } from '../../types/network';
import { FaServer, FaNetworkWired, FaSignal } from 'react-icons/fa';
import { GradientText } from '../ui/GradientText';

interface Props {
  routerInfo?: RouterInfo;
}

const RouterDetails: React.FC<Props> = ({ routerInfo }) => {
  if (!routerInfo) {
    return null;
  }

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-bold mb-4">
        <GradientText>Router Information</GradientText>
      </h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FaServer className="text-cyan-400" />
            <span className="text-gray-300">Model:</span>
          </div>
          <span className="text-white">{routerInfo.manufacturer} {routerInfo.model}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FaNetworkWired className="text-cyan-400" />
            <span className="text-gray-300">IP Address:</span>
          </div>
          <span className="text-white">{routerInfo.ipAddress}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FaSignal className="text-cyan-400" />
            <span className="text-gray-300">Channel:</span>
          </div>
          <span className="text-white">
            {routerInfo.channel} ({routerInfo.frequency})
          </span>
        </div>

        <motion.div 
          className="bg-gray-800 p-4 rounded-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Connected Devices:</span>
            <span className="text-cyan-400 font-bold">{routerInfo.connectedDevices}</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default RouterDetails;