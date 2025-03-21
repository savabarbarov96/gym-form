import React, { useState, useEffect } from 'react';
import { Slider } from "@/components/ui/slider";
import { Droplets, Info, Dumbbell } from 'lucide-react';

interface WaterIntakeStepProps {
  value: number | null;
  onChange: (value: number) => void;
}

const WaterIntakeStep: React.FC<WaterIntakeStepProps> = ({ value, onChange }) => {
  const [intake, setIntake] = useState<number>(value || 1500);
  
  // Recommended water intake (in ml)
  const recommendedIntake = 2500;
  
  useEffect(() => {
    onChange(intake);
  }, [intake, onChange]);

  const getIntakeMessage = () => {
    if (intake < recommendedIntake * 0.7) {
      return {
        message: "Пиете по-малко вода от препоръчителното. Увеличаването на приема на вода може да подобри нивата на енергия и цялостното здраве.",
        type: "warning"
      };
    } else if (intake > recommendedIntake * 1.3) {
      return {
        message: "Пиете повече вода от средната препоръка, което е чудесно за хидратацията!",
        type: "success"
      };
    } else {
      return {
        message: "Пиете здравословно количество вода, близко до препоръчителния дневен прием.",
        type: "info"
      };
    }
  };

  const intakeInfo = getIntakeMessage();
  
  return (
    <div className="max-w-2xl mx-auto w-full">
      <h2 className="text-2xl font-bold text-center mb-6">Приблизително колко вода пиете дневно?</h2>

      <div className="flex flex-col items-center mb-12">
        <div className="flex items-center gap-3 mb-8 bg-card p-6 rounded-lg w-full justify-center">
          <Droplets className="h-12 w-12 text-blue-500" />
          <div className="text-4xl font-bold">{intake} mL</div>
        </div>
        
        <div className="w-full px-4">
          <Slider
            value={[intake]}
            min={250}
            max={5000}
            step={250}
            onValueChange={(value) => setIntake(value[0])}
            className="mb-8"
          />
          
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>250 mL</span>
            <span>1000 mL</span>
            <span>2000 mL</span>
            <span>3000 mL</span>
            <span>4000 mL</span>
            <span>5000 mL</span>
          </div>
        </div>
      </div>
      
      <div className={`mb-6 p-4 rounded-lg flex items-start gap-3 bg-${intakeInfo.type === 'warning' ? 'amber-950/30' : intakeInfo.type === 'success' ? 'green-950/30' : 'secondary'}`}>
        <Info className="min-w-5 h-5 mt-0.5 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          {intakeInfo.message}
        </p>
      </div>

      {/* Water Benefits Section */}
      <div className="mt-8 bg-gray-800/90 p-6 rounded-lg text-gray-100">
        <h3 className="text-xl font-semibold mb-4 text-center">Ползи от правилната хидратация при тренировка</h3>
        
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="relative w-full md:w-1/3 h-48 rounded-lg overflow-hidden bg-gray-700 flex items-center justify-center">
            <div className="flex flex-col items-center justify-center">
              <Droplets className="h-24 w-24 text-blue-400" />
              <Dumbbell className="h-16 w-16 text-blue-300 mt-2" />
            </div>
          </div>
          
          <div className="md:w-2/3">
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <Droplets className="h-5 w-5 text-blue-400 min-w-5 mt-0.5" />
                <span>Подобрява физическата издръжливост и предотвратява мускулни крампи</span>
              </li>
              <li className="flex items-start gap-2">
                <Droplets className="h-5 w-5 text-blue-400 min-w-5 mt-0.5" />
                <span>Ускорява метаболизма и подпомага изгарянето на мазнини</span>
              </li>
              <li className="flex items-start gap-2">
                <Droplets className="h-5 w-5 text-blue-400 min-w-5 mt-0.5" />
                <span>Спомага за по-бързото възстановяване на мускулите след тренировка</span>
              </li>
              <li className="flex items-start gap-2">
                <Droplets className="h-5 w-5 text-blue-400 min-w-5 mt-0.5" />
                <span>Препоръчва се пиене на 500 мл вода 2 часа преди тренировка и по 250 мл на всеки 15-20 минути по време на тренировка</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaterIntakeStep;
