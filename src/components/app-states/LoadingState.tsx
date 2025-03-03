
import React from "react";
import { motion } from "framer-motion";
import { ProgressIndicator, ProgressBar, LoadingMessage } from "./loading";

interface LoadingStateProps {
  loadingProgress: number;
}

const LoadingState: React.FC<LoadingStateProps> = ({ loadingProgress }) => {
  return (
    <div className="w-full max-w-md mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-8"
      >
        <div className="text-3xl font-bold mb-12">Creating Your Workout Program</div>
        
        <ProgressIndicator loadingProgress={loadingProgress} />
        
        <ProgressBar loadingProgress={loadingProgress} />
        
        <LoadingMessage />
      </motion.div>
    </div>
  );
};

export default LoadingState;
