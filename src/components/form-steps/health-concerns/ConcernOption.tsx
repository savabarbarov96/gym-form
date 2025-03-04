import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface ConcernOptionProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

const ConcernOption: React.FC<ConcernOptionProps> = ({
  id,
  label,
  icon,
  description,
  isSelected,
  onToggle
}) => {
  return (
    <motion.div
      className={`relative border rounded-xl cursor-pointer transition-all duration-300 ${
        isSelected 
          ? 'border-orange bg-orange/5 shadow-md' 
          : 'border-border bg-card hover:border-orange/40 hover:bg-orange/5'
      }`}
      onClick={() => onToggle(id)}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute -top-2 -right-2 bg-orange rounded-full p-1 shadow-md">
          <Check className="w-3 h-3 text-white" />
        </div>
      )}
      
      <div className="p-4">
        <div className="flex items-start gap-3 mb-3">
          <div className="rounded-full p-2 bg-orange/10 w-11 h-11 flex items-center justify-center flex-shrink-0">
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-md leading-tight mb-1">{label}</h3>
            <p className="text-sm text-muted-foreground leading-snug">{description}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ConcernOption;
