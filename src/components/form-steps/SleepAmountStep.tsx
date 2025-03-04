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
        message: "Повечето възрастни се нуждаят от 7-9 часа сън на нощ. Спането по-малко от 7 часа е свързано с наддаване на тегло, намалено възстановяване и понижена когнитивна функция.",
        type: "warning"
      };
    } else if (hours >= 6 && hours < 7) {
      return {
        message: "Наближавате препоръчителното количество сън. Опитайте се да спите поне 7 часа за по-добро възстановяване и производителност.",
        type: "warning"
      };
    } else if (hours >= 7 && hours <= 9) {
      return {
        message: "Чудесно! Получавате препоръчителните 7-9 часа сън. Качественият сън подобрява мускулното възстановяване, хормоналния баланс и когнитивната функция.",
        type: "success"
      };
    } else {
      return {
        message: "Спите повече от типичната препоръка. Въпреки че някои хора се нуждаят от повече сън, постоянното спане повече от 9 часа може да си струва да обсъдите с медицински специалист.",
        type: "info"
      };
    }
  };

  const sleepInfo = getSleepMessage();
  
  return (
    <div className="max-w-2xl mx-auto w-full">
      <h2 className="text-2xl font-bold text-center mb-6">Колко сън обикновено получавате?</h2>

      <div className="flex flex-col items-center mb-12">
        <div className="flex items-center gap-3 mb-8 bg-card p-6 rounded-lg w-full justify-center">
          <Moon className="h-12 w-12 text-purple-400" />
          <div className="text-4xl font-bold">{hours} часа</div>
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
            <span>4 ч</span>
            <span>6 ч</span>
            <span>8 ч</span>
            <span>10 ч</span>
            <span>12 ч</span>
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
