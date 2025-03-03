
import React from "react";
import { motion } from "framer-motion";

interface ProgressBarProps {
  loadingProgress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ loadingProgress }) => {
  return (
    <div className="w-full max-w-md mx-auto relative h-3 bg-secondary rounded-full overflow-hidden">
      <motion.div 
        className="h-full bg-orange"
        initial={{ width: "0%" }}
        animate={{ width: `${loadingProgress}%` }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      />
    </div>
  );
};

export default ProgressBar;
