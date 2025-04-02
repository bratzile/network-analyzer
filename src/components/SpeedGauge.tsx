import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  label: string;
  value: number;
  unit: string;
  maxValue: number;
  color: string;
}

const SpeedGauge: React.FC<Props> = ({ label, value, unit, maxValue, color }) => {
  const percentage = (value / maxValue) * 100;

  return (
    <div className="text-center">
      <div className="relative w-32 h-32 mx-auto">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            className="text-gray-700"
            strokeWidth="10"
            stroke="currentColor"
            fill="transparent"
            r="40"
            cx="50"
            cy="50"
          />
          <motion.circle
            className={`text-${color}-500`}
            strokeWidth="10"
            stroke="currentColor"
            fill="transparent"
            r="40"
            cx="50"
            cy="50"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: percentage / 100 }}
            transition={{ duration: 1, ease: "easeOut" }}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span 
            className="text-2xl font-bold text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {value}
          </motion.span>
          <span className="text-sm text-gray-400">{unit}</span>
        </div>
      </div>
      <p className="mt-2 text-gray-300">{label}</p>
    </div>
  );
};

export default SpeedGauge;