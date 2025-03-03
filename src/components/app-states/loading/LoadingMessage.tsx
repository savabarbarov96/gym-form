
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const messages = [
  "Tailoring your personalized workout plan...",
  "Analyzing your fitness profile...",
  "Optimizing exercise selection...",
  "Creating your nutrition recommendations...",
  "Finalizing your custom fitness journey..."
];

const LoadingMessage: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex(prevIndex => (prevIndex + 1) % messages.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="text-muted-foreground mt-8 text-lg">
      <motion.div
        key={messageIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5 }}
      >
        {messages[messageIndex]}
      </motion.div>
    </div>
  );
};

export default LoadingMessage;
