
import React from 'react';
import { motion } from 'framer-motion';

interface NoneOptionProps {
  isSelected: boolean;
  onClick: () => void;
}

const NoneOption: React.FC<NoneOptionProps> = ({ isSelected, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`block mx-auto px-6 py-3 rounded-lg border-2 ${
        isSelected 
          ? 'bg-orange/10 border-orange text-orange font-medium'
          : 'border-muted-foreground/30 text-muted-foreground hover:border-orange hover:text-orange'
      } transition-colors mb-8`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      None of the above
    </motion.button>
  );
};

export default NoneOption;
