
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
      className={`option-card p-4 ${isSelected ? 'selected' : ''}`}
      onClick={() => onToggle(id)}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-muted rounded-full p-2 w-10 h-10 flex items-center justify-center">
          {icon}
        </div>
        <h3 className="font-semibold">{label}</h3>
        {isSelected && (
          <div className="ml-auto bg-orange rounded-full p-1">
            <Check className="w-4 h-4 text-white" />
          </div>
        )}
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </motion.div>
  );
};

export default ConcernOption;
