import { motion } from 'framer-motion';
import type { NetworkInfo as NetworkInfoType } from '../types/network';
import { FaShieldAlt, FaWifi } from 'react-icons/fa';

interface Props {
  networkInfo: NetworkInfoType;
}

const NetworkInfo: React.FC<Props> = ({ networkInfo }) => {
  const securityColors = {
    Safe: 'text-green-500',
    Caution: 'text-yellow-500',
    Unsafe: 'text-red-500'
  };

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-cyan-400 mb-4">Network Information</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FaWifi className="text-cyan-400" />
            <span className="text-gray-300">Network Name:</span>
          </div>
          <span className="text-white font-semibold">{networkInfo.wifi?.ssid || 'Unknown'}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-gray-300">Signal Strength:</span>
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className={`w-2 ${i < (networkInfo.wifi?.signalStrength || 0) / 20 ? 'bg-cyan-400' : 'bg-gray-600'}`}
                initial={{ height: 0 }}
                animate={{ height: (i + 1) * 4 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FaShieldAlt className={securityColors[networkInfo.security?.protocol === 'WPA3' ? 'Safe' : 'Caution']} />
            <span className="text-gray-300">Security:</span>
          </div>
          <span className={`font-semibold ${securityColors[networkInfo.security?.protocol === 'WPA3' ? 'Safe' : 'Caution']}`}>
            {networkInfo.security?.encryption || 'Unknown'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NetworkInfo;