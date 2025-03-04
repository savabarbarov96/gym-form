import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Check, X, MessageSquarePlus } from 'lucide-react';
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
        className="relative border border-orange rounded-xl bg-orange/5 p-4 max-w-md mx-auto mb-8 shadow-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-orange/20 rounded-full p-2 flex-shrink-0">
              <Check className="w-4 h-4 text-orange" />
            </div>
            <span className="text-orange font-medium">{customOption}</span>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={removeCustom} 
            className="text-muted-foreground hover:text-orange hover:bg-orange/10"
            aria-label="Remove custom concern"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>
    );
  }
  
  if (showCustomInput) {
    return (
      <motion.div 
        className="border border-border bg-card p-5 rounded-xl max-w-md mx-auto mb-8 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <label className="text-sm font-medium mb-3 block text-left">
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
          <Button 
            onClick={handleAddCustom} 
            variant="default"
            disabled={!inputValue.trim()}
            className="bg-orange hover:bg-orange/90 text-white"
          >
            Add
          </Button>
        </div>
      </motion.div>
    );
  }
  
  return (
    <motion.div
      className="relative border border-dashed border-muted-foreground/40 rounded-xl cursor-pointer hover:border-orange/60 hover:bg-orange/5 transition-colors duration-300"
      onClick={() => setShowCustomInput(true)}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-4 flex flex-col items-center justify-center min-h-[112px]">
        <div className="bg-muted rounded-full p-2 w-12 h-12 flex items-center justify-center mb-3">
          <MessageSquarePlus className="w-5 h-5 text-orange" />
        </div>
        <p className="text-sm text-muted-foreground font-medium">Add another concern</p>
      </div>
    </motion.div>
  );
};

export default CustomConcern;
