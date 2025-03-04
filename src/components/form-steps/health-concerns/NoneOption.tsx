import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface NoneOptionProps {
  isSelected: boolean;
  onClick: () => void;
}

const NoneOption: React.FC<NoneOptionProps> = ({ isSelected, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`relative flex items-center justify-center mx-auto px-8 py-3 rounded-xl border-2 gap-2 font-medium ${
        isSelected 
          ? 'bg-orange/10 border-orange text-orange shadow-md'
          : 'border-muted-foreground/30 text-muted-foreground hover:border-orange/40 hover:text-orange hover:bg-orange/5'
      } transition-all duration-300 mb-8 max-w-xs w-full`}
      whileHover={{ scale: 1.05, y: -3 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {isSelected && <Check className="w-4 h-4" />}
      <span>None of the above</span>
    </motion.button>
  );
};

export default NoneOption;
