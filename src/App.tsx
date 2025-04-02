import { motion } from 'framer-motion';
import SpeedTest from './components/SpeedTest';
import NetworkStatus from './components/network/NetworkStatus';
import RecommendedUses from './components/network/RecommendedUses';
import { GradientText } from './components/ui/GradientText';
import { useSpeedTest } from './hooks/useSpeedTest';
import { useNetworkInfo } from './hooks/useNetworkInfo';
import { getActivityRecommendations } from './utils/recommendations/activityRecommendations';

function App() {
  const { speedTestResults, isLoading, runSpeedTest } = useSpeedTest();
  const networkInfo = useNetworkInfo();
  const recommendations = getActivityRecommendations(speedTestResults.download);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center mb-8">
          <GradientText>Network Analyzer</GradientText>
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <SpeedTest
              results={speedTestResults}
              isLoading={isLoading}
              onTest={runSpeedTest}
            />
            <RecommendedUses recommendations={recommendations} />
          </div>
          <NetworkStatus networkInfo={networkInfo} />
        </div>
      </motion.div>
    </div>
  );
}

export default App;