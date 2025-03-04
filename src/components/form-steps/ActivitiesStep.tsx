import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Plus, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ActivitiesStepProps {
  selectedActivities: string[];
  customActivity: string | null;
  onSelectionsChange: (selected: string[]) => void;
  onCustomActivityChange: (customActivity: string | null) => void;
}

const ActivitiesStep = ({
  selectedActivities,
  customActivity,
  onSelectionsChange,
  onCustomActivityChange
}: ActivitiesStepProps) => {
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  
  const activities = [
    { 
      id: 'walking', 
      label: 'Ходене', 
      description: 'Редовни разходки или туризъм',
      icon: '🚶'
    },
    { 
      id: 'running', 
      label: 'Бягане', 
      description: 'Джогинг или бягане',
      icon: '🏃'
    },
    { 
      id: 'cycling', 
      label: 'Колоездене', 
      description: 'Колоездене на закрито или открито',
      icon: '🚴'
    },
    { 
      id: 'swimming', 
      label: 'Плуване', 
      description: 'Плуване в басейн или открити води',
      icon: '🏊'
    },
    { 
      id: 'gym', 
      label: 'Фитнес тренировки', 
      description: 'Тренировки с тежести или машини',
      icon: '🏋️'
    },
    { 
      id: 'sports', 
      label: 'Отборни спортове', 
      description: 'Баскетбол, футбол и др.',
      icon: '⚽'
    },
    { 
      id: 'yoga', 
      label: 'Йога', 
      description: 'Редовна практика на йога',
      icon: '🧘'
    },
    { 
      id: 'dancing', 
      label: 'Танци', 
      description: 'Всякакъв стил танци',
      icon: '💃'
    },
    { 
      id: 'martialarts', 
      label: 'Бойни изкуства', 
      description: 'Бокс, карате и др.',
      icon: '🥋'
    },
    { 
      id: 'none', 
      label: 'Без редовна активност', 
      description: 'В момента заседнал начин на живот',
      icon: '🛋️'
    }
  ];

  const toggleSelection = (id: string) => {
    if (id === 'none') {
      // If "None" is selected, clear all other selections
      if (selectedActivities.includes('none')) {
        onSelectionsChange(selectedActivities.filter(item => item !== 'none'));
      } else {
        onSelectionsChange(['none']);
      }
    } else {
      // If any other activity is selected, remove "None" if it's there
      let newSelections = [...selectedActivities];
      
      if (newSelections.includes('none')) {
        newSelections = newSelections.filter(item => item !== 'none');
      }
      
      if (newSelections.includes(id)) {
        newSelections = newSelections.filter(item => item !== id);
      } else {
        newSelections.push(id);
      }
      
      onSelectionsChange(newSelections);
    }
  };
  
  const handleAddCustom = () => {
    if (inputValue.trim()) {
      onCustomActivityChange(inputValue.trim());
      setShowCustomInput(false);
      setInputValue('');
      
      // If "None" is selected, remove it when adding a custom activity
      if (selectedActivities.includes('none')) {
        onSelectionsChange(selectedActivities.filter(item => item !== 'none'));
      }
    }
  };
  
  const removeCustom = () => {
    onCustomActivityChange(null);
  };

  return (
    <div className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold mb-4">Някоя от тези дейности част ли е от живота Ви?</h1>
      <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
        Изберете всички дейности, в които редовно участвате
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {activities.map(activity => (
          <motion.div
            key={activity.id}
            className={`option-card p-4 ${selectedActivities.includes(activity.id) ? 'selected' : ''}`}
            onClick={() => toggleSelection(activity.id)}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="text-2xl" aria-hidden="true">{activity.icon}</div>
              <h3 className="font-semibold">{activity.label}</h3>
              {selectedActivities.includes(activity.id) && (
                <div className="ml-auto bg-orange rounded-full p-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{activity.description}</p>
          </motion.div>
        ))}
        
        {/* Add custom activity button */}
        {!showCustomInput && !customActivity && (
          <motion.div
            className="option-card p-4 flex flex-col items-center justify-center min-h-[112px]"
            onClick={() => setShowCustomInput(true)}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="bg-muted rounded-full p-2 w-10 h-10 flex items-center justify-center mb-2">
              <Plus className="w-5 h-5 text-orange" />
            </div>
            <p className="text-sm text-muted-foreground">Добавете друга дейност</p>
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
            Каква друга дейност извършвате редовно?
          </label>
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="напр. Пилатес, Катерене"
              className="flex-1"
              autoFocus
            />
            <Button onClick={handleAddCustom} variant="default">
              Добави
            </Button>
          </div>
        </motion.div>
      )}
      
      {/* Display custom activity if set */}
      {customActivity && (
        <motion.div
          className="option-card selected p-4 max-w-md mx-auto mb-8 flex justify-between items-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="flex items-center gap-3">
            <div className="text-2xl" aria-hidden="true">🏆</div>
            <span>{customActivity}</span>
          </div>
          <Button variant="ghost" size="icon" onClick={removeCustom} className="text-muted-foreground">
            <X className="w-4 h-4" />
          </Button>
        </motion.div>
      )}
      
      <div className="mt-4 text-muted-foreground">
        {selectedActivities.length === 0 && !customActivity ? 
          "Моля, изберете дейностите, в които редовно участвате." : 
          `Избрали сте ${selectedActivities.length + (customActivity ? 1 : 0)} дейности.`
        }
      </div>
    </div>
  );
};

export default ActivitiesStep;
