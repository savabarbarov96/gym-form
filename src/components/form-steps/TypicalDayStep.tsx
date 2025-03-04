import React from 'react';
import { cn } from '@/lib/utils';

interface TypicalDayStepProps {
  selected: string | null;
  onSelect: (value: string) => void;
}

const TypicalDayStep: React.FC<TypicalDayStepProps> = ({ selected, onSelect }) => {
  const options = [
    { value: 'sitting', label: 'Седя през по-голямата част от времето' },
    { value: 'moving', label: 'Движа се през по-голямата част от времето' },
    { value: 'standing', label: 'На крак съм през целия ден, но не се движа много' },
    { value: 'active', label: 'На крак съм и се движа много' }
  ];

  return (
    <div className="max-w-2xl mx-auto w-full">
      <h2 className="text-2xl font-bold text-center mb-6">Как бихте описали Вашия типичен ден?</h2>

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

export default TypicalDayStep;
