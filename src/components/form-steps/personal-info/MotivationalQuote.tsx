
import React from 'react';
import { motion } from 'framer-motion';

interface MotivationalQuoteProps {
  quote: string;
}

const MotivationalQuote: React.FC<MotivationalQuoteProps> = ({ quote }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-r from-orange/10 to-orange/20 p-6 rounded-lg border border-orange/20"
    >
      <p className="text-xl font-semibold text-orange">{quote}</p>
    </motion.div>
  );
};

export default MotivationalQuote;
