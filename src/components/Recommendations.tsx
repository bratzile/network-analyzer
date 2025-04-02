import React from 'react';
import { motion } from 'framer-motion';
import { UsageRecommendation } from '../types/network';
import { FaCheck, FaTimes, FaVideo, FaPhone, FaGamepad, FaTv } from 'react-icons/fa';
import { GradientText } from './ui/GradientText';

interface Props {
  recommendations: UsageRecommendation[];
}

const getIcon = (activity: string) => {
  switch (activity.toLowerCase()) {
    case 'video calls':
      return <FaVideo />;
    case 'voice calls':
      return <FaPhone />;
    case 'gaming':
      return <FaGamepad />;
    case 'hd streaming':
      return <FaTv />;
    default:
      return null;
  }
};

const Recommendations: React.FC<Props> = ({ recommendations }) => {
  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">
        <GradientText>Usage Recommendations</GradientText>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendations.map((rec, index) => (
          <motion.div
            key={rec.activity}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start space-x-4 p-4 bg-gray-800 rounded-lg"
          >
            <div className="text-cyan-400 text-xl mt-1">
              {getIcon(rec.activity)}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-semibold">{rec.activity}</h3>
                {rec.suitable ? (
                  <FaCheck className="text-green-500 text-xl" />
                ) : (
                  <FaTimes className="text-red-500 text-xl" />
                )}
              </div>
              <p className="text-sm text-gray-400 mt-1">{rec.recommendation}</p>
              {rec.minPing && (
                <p className="text-xs text-gray-500 mt-1">
                  Required Ping: &lt;{rec.minPing}ms
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;