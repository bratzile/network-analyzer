import React from 'react';
import { UsageRecommendation } from '../../types/network';
import { FaVideo, FaPhone, FaGamepad, FaTv } from 'react-icons/fa';
import { GradientText } from '../ui/GradientText';

interface Props {
  recommendations: UsageRecommendation[];
}

const getIcon = (activity: string) => {
  switch (activity.toLowerCase()) {
    case 'video calls':
      return <FaVideo size={24} />;
    case 'voice calls':
      return <FaPhone size={24} />;
    case 'gaming':
      return <FaGamepad size={24} />;
    case 'hd streaming':
      return <FaTv size={24} />;
    default:
      return null;
  }
};

const RecommendedUses: React.FC<Props> = ({ recommendations }) => {
  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-bold mb-4">
        <GradientText>Recommended Uses</GradientText>
      </h3>
      <div className="space-y-4">
        {recommendations.map((rec) => (
          <div
            key={rec.activity}
            className={`p-4 rounded-lg ${
              rec.suitable ? 'bg-pink-500/20' : 'bg-gray-800'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-medium">{rec.activity}</span>
              <span className={rec.suitable ? 'text-pink-400' : 'text-gray-500'}>
                {getIcon(rec.activity)}
              </span>
            </div>
            <p className="text-sm text-gray-400">{rec.recommendation}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedUses;