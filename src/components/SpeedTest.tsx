import React from 'react';
import { motion } from 'framer-motion';
import { SpeedTestResult } from '../types/network';
import SpeedGauge from './SpeedGauge';
import { GradientText } from './ui/GradientText';

interface Props {
  results: SpeedTestResult;
  isLoading: boolean;
  onTest: () => void;
}

const SpeedTest: React.FC<Props> = ({ results, isLoading, onTest }) => {
  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">
        <GradientText>Speed Test</GradientText>
      </h2>
      <div className="grid grid-cols-3 gap-4">
        <SpeedGauge
          label="Ping"
          value={results.ping}
          unit="ms"
          maxValue={100}
          color="pink"
        />
        <SpeedGauge
          label="Download"
          value={results.download}
          unit="Mbps"
          maxValue={200}
          color="pink"
        />
        <SpeedGauge
          label="Upload"
          value={results.upload}
          unit="Mbps"
          maxValue={100}
          color="pink"
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`mt-6 w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-2 px-4 rounded-lg font-semibold ${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={onTest}
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center justify-center space-x-2">
            <motion.div
              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <span>Testing...</span>
          </div>
        ) : (
          'Start Test'
        )}
      </motion.button>
    </div>
  );
}

export default SpeedTest;