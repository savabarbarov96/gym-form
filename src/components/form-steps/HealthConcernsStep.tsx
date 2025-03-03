
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Ear, Brain, Heart, Lungs, Plus, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface HealthConcernsStepProps {
  selectedOptions: string[];
  customOption: string | null;
  onSelectionChange: (selected: string[]) => void;
  onCustomOptionChange: (customOption: string | null) => void;
}

const HealthConcernsStep = ({
  selectedOptions,
  customOption,
  onSelectionChange,
  onCustomOptionChange
}: HealthConcernsStepProps) => {
  const [showCustomInput, setShowCustomInput] = useState(!!customOption);
  const [inputValue, setInputValue] = useState(customOption || '');
  
  const options = [
    { 
      id: 'knees', 
      label: 'Knee Pain', 
      icon: <motion.div className="relative"><motion.div className="w-6 h-1 absolute top-3.5 left-0 bg-orange"></motion.div><motion.div className="w-1 h-8 absolute top-0 left-2.5 bg-orange"></motion.div></motion.div>,
      description: 'Issues when bending, climbing stairs'
    },
    { 
      id: 'back', 
      label: 'Back Pain', 
      icon: <motion.div className="relative"><motion.div className="w-6 h-1 absolute top-3.5 left-0 bg-orange transform rotate-90"></motion.div><motion.div className="w-1 h-8 absolute top-0 left-2.5 bg-orange"></motion.div></motion.div>,
      description: 'Discomfort when sitting or standing'
    },
    { 
      id: 'shoulders', 
      label: 'Shoulder Issues', 
      icon: <motion.div className="relative"><motion.div className="w-6 h-1 absolute top-1 left-0 bg-orange transform rotate-45"></motion.div><motion.div className="w-6 h-1 absolute top-1 left-0 bg-orange transform -rotate-45"></motion.div></motion.div>,
      description: 'Limited range of motion, pain'
    },
    { 
      id: 'wrists', 
      label: 'Wrist or Hand Problems', 
      icon: <motion.div className="relative"><motion.div className="w-4 h-4 absolute top-1 left-1 border-2 border-orange rounded"></motion.div></motion.div>,
      description: 'Weakness, pain during movement'
    },
    { 
      id: 'ankle', 
      label: 'Ankle/Foot Pain', 
      icon: <motion.div className="relative"><motion.div className="w-6 h-1 absolute top-3.5 left-0 bg-orange"></motion.div><motion.div className="w-1 h-6 absolute top-1 left-1 bg-orange transform rotate-45"></motion.div></motion.div>,
      description: 'Issues with stability, discomfort'
    },
    { 
      id: 'hips', 
      label: 'Hip Problems', 
      icon: <motion.div className="relative"><motion.div className="w-6 h-1 absolute top-3.5 left-0 bg-orange"></motion.div><motion.div className="w-1 h-8 absolute top-0 left-5 bg-orange transform rotate-45"></motion.div></motion.div>,
      description: 'Pain during movement or sitting'
    },
    { 
      id: 'heart', 
      label: 'Heart Conditions', 
      icon: <Heart className="w-6 h-6 text-orange" />,
      description: 'Any diagnosed cardiac issues'
    },
    { 
      id: 'breathing', 
      label: 'Breathing Issues', 
      icon: <Lungs className="w-6 h-6 text-orange" />,
      description: 'Asthma, shortness of breath'
    },
    { 
      id: 'headaches', 
      label: 'Frequent Headaches', 
      icon: <Brain className="w-6 h-6 text-orange" />,
      description: 'Migraines, tension headaches'
    },
    { 
      id: 'hearing', 
      label: 'Hearing Problems', 
      icon: <Ear className="w-6 h-6 text-orange" />,
      description: 'Tinnitus, hearing loss'
    }
  ];

  const toggleOption = (id: string) => {
    if (selectedOptions.includes(id)) {
      onSelectionChange(selectedOptions.filter(item => item !== id));
    } else {
      onSelectionChange([...selectedOptions, id]);
    }
  };
  
  const handleAddCustom = () => {
    if (inputValue.trim()) {
      onCustomOptionChange(inputValue.trim());
      setShowCustomInput(false);
    }
  };
  
  const removeCustom = () => {
    onCustomOptionChange(null);
    setInputValue('');
  };

  return (
    <div className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold mb-4">Do you have any physical limitations or areas of pain?</h1>
      <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
        Select any areas where you experience pain or have limitations to help us customize your workout plan
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {options.map(option => (
          <motion.div
            key={option.id}
            className={`option-card p-4 ${selectedOptions.includes(option.id) ? 'selected' : ''}`}
            onClick={() => toggleOption(option.id)}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-muted rounded-full p-2 w-10 h-10 flex items-center justify-center">
                {option.icon}
              </div>
              <h3 className="font-semibold">{option.label}</h3>
              {selectedOptions.includes(option.id) && (
                <div className="ml-auto bg-orange rounded-full p-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{option.description}</p>
          </motion.div>
        ))}
        
        {/* Custom option card */}
        {!showCustomInput && !customOption && (
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
        )}
      </div>
      
      {/* Custom input */}
      {showCustomInput && (
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
      )}
      
      {/* Display custom option if set */}
      {customOption && (
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
      )}
      
      {selectedOptions.length === 0 && !customOption ? (
        <div className="text-lg text-muted-foreground mb-4">
          No issues? Great! Select any that apply or continue.
        </div>
      ) : (
        <div className="mt-4 text-orange font-medium">
          Your plan will account for the selected limitations.
        </div>
      )}
    </div>
  );
};

export default HealthConcernsStep;
