
import React from "react";
import { motion } from "framer-motion";

const LoadingMessage: React.FC = () => {
  return (
    <div className="text-muted-foreground mt-8 text-lg">
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Tailoring your personalized workout plan...
      </motion.div>
    </div>
  );
};

export default LoadingMessage;
