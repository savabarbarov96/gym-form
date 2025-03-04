
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Check, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface CustomConcernProps {
  customOption: string | null;
  showCustomInput: boolean;
  setShowCustomInput: (show: boolean) => void;
  onCustomOptionChange: (customOption: string | null) => void;
}

const CustomConcern: React.FC<CustomConcernProps> = ({
  customOption,
  showCustomInput,
  setShowCustomInput,
  onCustomOptionChange
}) => {
  const [inputValue, setInputValue] = useState(customOption || '');
  
  const handleAddCustom = () => {
    if (inputValue.trim()) {
      onCustomOptionChange(inputValue.trim());
    }
  };
  
  const removeCustom = () => {
    onCustomOptionChange(null);
    setInputValue('');
  };
  
  if (customOption) {
    return (
      <motion.div
        className="option-card selected p-4 max-w-md mx-auto mb-8 flex justify-between items-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="flex items-center gap-3">
          <div className="bg-orange/20 rounded-full p-2">
            <Check className="w-5 h-5 text-orange" />
          </div>
          <span>{customOption}</span>
        </div>
        <Button variant="ghost" size="icon" onClick={removeCustom} className="text-muted-foreground">
          <X className="w-4 h-4" />
        </Button>
      </motion.div>
    );
  }
  
  if (showCustomInput) {
    return (
      <motion.div 
        className="bg-card p-4 rounded-lg max-w-md mx-auto mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <label className="text-sm text-muted-foreground mb-2 block text-left">
          Add your specific concern:
        </label>
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="e.g., Elbow pain, neck stiffness"
            className="flex-1"
            autoFocus
          />
          <Button onClick={handleAddCustom} variant="default">
            Add
          </Button>
        </div>
      </motion.div>
    );
  }
  
  return (
    <motion.div
      className="option-card p-4 flex flex-col items-center justify-center min-h-[112px]"
      onClick={() => setShowCustomInput(true)}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="bg-muted rounded-full p-2 w-10 h-10 flex items-center justify-center mb-2">
        <Plus className="w-5 h-5 text-orange" />
      </div>
      <p className="text-sm text-muted-foreground">Add another concern</p>
    </motion.div>
  );
};

export default CustomConcern;
