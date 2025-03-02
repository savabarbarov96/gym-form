
import React from 'react';
import { cn } from '@/lib/utils';
import { Info } from 'lucide-react';

interface SugaryFoodsStepProps {
  selected: string | null;
  onSelect: (value: string) => void;
}

const SugaryFoodsStep: React.FC<SugaryFoodsStepProps> = ({ selected, onSelect }) => {
  const options = [
    { value: 'not_often', label: 'Not often' },
    { value: '3_5_times', label: '3-5 times a week' },
    { value: 'almost_daily', label: 'Almost every day' }
  ];

  return (
    <div className="max-w-2xl mx-auto w-full">
      <h2 className="text-2xl font-bold text-center mb-6">How often do you eat or drink sugary foods or beverages?</h2>
      
      <div className="mb-6 p-4 bg-secondary rounded-lg flex items-start gap-3">
        <Info className="min-w-5 h-5 mt-0.5 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          Based on your intake, we'll try to include low calorie sweet replacements in your plan to help with cravings.
        </p>
      </div>

      <div className="grid gap-4">
        {options.map((option) => (
          <div
            key={option.value}
            className={cn(
              "option-card p-6 hover:scale-[1.01]",
              selected === option.value && "selected"
            )}
            onClick={() => onSelect(option.value)}
          >
            <div className="flex justify-between items-center">
              <span className="text-lg">{option.label}</span>
              <div className={cn(
                "w-5 h-5 rounded-full border-2",
                selected === option.value ? "border-orange bg-orange" : "border-muted-foreground"
              )} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SugaryFoodsStep;
