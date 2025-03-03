
import React, { useState, useEffect } from 'react';
import { Slider } from "@/components/ui/slider";
import { Moon, Info } from 'lucide-react';

interface SleepAmountStepProps {
  value: number | null;
  onChange: (value: number) => void;
}

const SleepAmountStep: React.FC<SleepAmountStepProps> = ({ value, onChange }) => {
  const [hours, setHours] = useState<number>(value || 7);
  
  useEffect(() => {
    // Update parent form state when hours change
    onChange(hours);
  }, [hours, onChange]);

  const getSleepMessage = () => {
    if (hours < 6) {
      return {
        message: "Most adults need 7-9 hours of sleep per night. Getting less than 7 hours is associated with weight gain, reduced recovery, and decreased cognitive function.",
        type: "warning"
      };
    } else if (hours >= 6 && hours < 7) {
      return {
        message: "You're getting close to the recommended amount of sleep. Try to get at least 7 hours for better recovery and performance.",
        type: "warning"
      };
    } else if (hours >= 7 && hours <= 9) {
      return {
        message: "Great! You're getting the recommended 7-9 hours of sleep. Quality sleep improves muscle recovery, hormone balance, and cognitive function.",
        type: "success"
      };
    } else {
      return {
        message: "You're getting more than the typical recommendation. While some people need more sleep, consistently sleeping more than 9 hours might be worth discussing with a healthcare provider.",
        type: "info"
      };
    }
  };

  const sleepInfo = getSleepMessage();
  
  return (
    <div className="max-w-2xl mx-auto w-full">
      <h2 className="text-2xl font-bold text-center mb-6">How much sleep do you usually get?</h2>

      <div className="flex flex-col items-center mb-12">
        <div className="flex items-center gap-3 mb-8 bg-card p-6 rounded-lg w-full justify-center">
          <Moon className="h-12 w-12 text-purple-400" />
          <div className="text-4xl font-bold">{hours} hours</div>
        </div>
        
        <div className="w-full px-4">
          <Slider
            value={[hours]}
            min={4}
            max={12}
            step={0.5}
            onValueChange={(value) => setHours(value[0])}
            className="mb-8"
          />
          
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>4 hrs</span>
            <span>6 hrs</span>
            <span>8 hrs</span>
            <span>10 hrs</span>
            <span>12 hrs</span>
          </div>
        </div>
      </div>
      
      <div className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${sleepInfo.type === 'warning' ? 'bg-amber-950/30' : sleepInfo.type === 'success' ? 'bg-green-950/30' : 'bg-secondary'}`}>
        <Info className="min-w-5 h-5 mt-0.5 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          {sleepInfo.message}
        </p>
      </div>
    </div>
  );
};

export default SleepAmountStep;
