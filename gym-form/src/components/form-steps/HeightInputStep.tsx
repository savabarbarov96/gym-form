import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeightUnitSelector } from "./height-components/HeightUnitSelector";
import { HeightInputHeader } from "./height-components/HeightInputHeader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { InfoIcon, X } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface HeightInputStepProps {
  value: string | null;
  onChange: (value: string) => void;
}

const HeightInputStep: React.FC<HeightInputStepProps> = ({ value, onChange }) => {
  const [unit, setUnit] = useState<"cm" | "ft">(!value || value.includes("cm") ? "cm" : "ft");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pulseAnimation, setPulseAnimation] = useState(true);
  const [heightValue, setHeightValue] = useState<number>(unit === "cm" ? 170 : 5.6);
  const [showTooltip, setShowTooltip] = useState(false);

  // Parse initial value if it exists
  useEffect(() => {
    if (value) {
      if (unit === "cm" && value.includes("cm")) {
        const cmValue = parseInt(value.replace("cm", "").trim());
        if (!isNaN(cmValue)) setHeightValue(cmValue);
      } else if (unit === "ft" && value.includes("ft")) {
        const ftMatch = value.match(/(\d+)ft\s*(\d+)?in?/);
        if (ftMatch) {
          const feet = parseInt(ftMatch[1]);
          const inches = ftMatch[2] ? parseInt(ftMatch[2]) : 0;
          setHeightValue(feet + inches / 12);
        }
      }
    }
  }, [value, unit]);

  // Stop pulsing animation after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setPulseAnimation(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Show tooltip periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3000);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const toggleUnit = () => {
    if (unit === "cm") {
      setUnit("ft");
      // Convert cm to feet
      const feetValue = heightValue / 30.48;
      setHeightValue(parseFloat(feetValue.toFixed(1)));
      onChange("");
    } else {
      setUnit("cm");
      // Convert feet to cm
      const cmValue = Math.round(heightValue * 30.48);
      setHeightValue(cmValue);
      onChange("");
    }
  };

  const handleSliderChange = (newValue: number[]) => {
    const value = newValue[0];
    setHeightValue(value);
    
    if (unit === "cm") {
      onChange(`${value}cm`);
    } else {
      const feet = Math.floor(value);
      const inches = Math.round((value - feet) * 12);
      onChange(`${feet}ft ${inches}in`);
    }
  };

  const getSliderConfig = () => {
    if (unit === "cm") {
      return {
        min: 140,
        max: 220,
        step: 1,
        value: heightValue
      };
    } else {
      return {
        min: 4.5,
        max: 7.0,
        step: 0.1,
        value: heightValue
      };
    }
  };

  const getHeightDisplay = () => {
    if (unit === "cm") {
      return `${heightValue} см`;
    } else {
      const feet = Math.floor(heightValue);
      const inches = Math.round((heightValue - feet) * 12);
      return `${feet}'${inches}"`;
    }
  };

  return (
    <div className="text-center max-w-3xl mx-auto">
      <div className="flex items-center justify-center gap-2 mb-4">
        <HeightInputHeader />
        <AnimatePresence>
          <motion.div
            initial={{ scale: 1 }}
            animate={{ 
              scale: pulseAnimation ? [1, 1.1, 1] : 1,
              rotate: showTooltip ? [0, -5, 5, -5, 0] : 0
            }}
            transition={{ 
              repeat: pulseAnimation ? Infinity : 0, 
              repeatDelay: 2,
              duration: 0.5 
            }}
            className="relative"
          >
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  className="rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <InfoIcon className="h-5 w-5 mr-2" />
                  <span>Защо е важно?</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl bg-orange-50 border-orange-200">
                <DialogHeader className="flex justify-between items-start">
                  <DialogTitle className="text-2xl font-bold mb-4 text-orange-700">Защо е важна височината?</DialogTitle>
                  <DialogClose className="rounded-full p-1.5 bg-orange-100 hover:bg-orange-200 text-orange-700">
                    <X className="h-5 w-5" />
                  </DialogClose>
                </DialogHeader>
                <div className="space-y-4 text-left">
                  <p className="text-lg text-orange-700">
                    Височината е ключов фактор при определянето на вашия персонализиран фитнес план поради няколко важни причини:
                  </p>
                  <div className="space-y-4">
                    <div className="p-4 bg-orange-100 rounded-lg hover:bg-orange-200 transition-colors duration-300">
                      <h3 className="font-semibold text-orange-800">1. Изчисляване на идеално тегло</h3>
                      <p className="text-orange-700">Вашата височина помага да определим здравословния диапазон на теглото за вашето тяло.</p>
                    </div>
                    
                    <div className="p-4 bg-orange-100 rounded-lg hover:bg-orange-200 transition-colors duration-300">
                      <h3 className="font-semibold text-orange-800">2. Калориен прием</h3>
                      <p className="text-orange-700">Височината е важен компонент при изчисляването на вашите дневни калорийни нужди.</p>
                    </div>
                    
                    <div className="p-4 bg-orange-100 rounded-lg hover:bg-orange-200 transition-colors duration-300">
                      <h3 className="font-semibold text-orange-800">3. Тренировъчна програма</h3>
                      <p className="text-orange-700">Различните упражнения и техники могат да бъдат адаптирани според вашата височина за оптимални резултати.</p>
                    </div>
                    
                    <div className="p-4 bg-orange-100 rounded-lg hover:bg-orange-200 transition-colors duration-300">
                      <h3 className="font-semibold text-orange-800">4. Биомеханика</h3>
                      <p className="text-orange-700">Височината влияе върху вашата биомеханика и определя най-ефективните упражнения за вашето тяло.</p>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-orange-200 rounded-lg border border-orange-300">
                    <p className="text-sm text-orange-800 font-medium">
                      Моля, въведете точната си височина за най-прецизни резултати. Можете да превключвате между сантиметри и футове/инчове според предпочитанията си.
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            {showTooltip && (
              <motion.div 
                className="absolute -top-12 right-0 bg-orange-500 text-white p-2 rounded-lg shadow-lg whitespace-nowrap"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                Кликнете за важна информация!
                <div className="absolute bottom-0 right-6 transform translate-y-1/2 rotate-45 w-3 h-3 bg-orange-500"></div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      
      <motion.div
        className="mt-6 bg-orange-100 p-8 rounded-xl border border-orange-200 shadow-lg max-w-md mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <HeightUnitSelector unit={unit} toggleUnit={toggleUnit} />
        
        <div className="mt-8 mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-orange-700 font-medium">Мин</span>
            <span className="text-3xl font-bold text-orange-600">{getHeightDisplay()}</span>
            <span className="text-orange-700 font-medium">Макс</span>
          </div>
          
          <Slider
            defaultValue={[getSliderConfig().value]}
            min={getSliderConfig().min}
            max={getSliderConfig().max}
            step={getSliderConfig().step}
            value={[heightValue]}
            onValueChange={handleSliderChange}
            className="mt-2"
          />
        </div>
        
        <div className="mt-8 p-4 bg-orange-200 rounded-lg">
          <h3 className="font-semibold text-orange-800 mb-2">Вашият Очакван Прогрес</h3>
          <div className="flex justify-between items-center">
            <div className="text-center">
              <div className="text-sm text-orange-700">BMI</div>
              <div className="font-bold text-orange-800">
                {(unit === "cm" 
                  ? (70 / ((heightValue / 100) * (heightValue / 100))).toFixed(1) 
                  : (154 / (heightValue * heightValue)).toFixed(1))}
              </div>
            </div>
            <div className="h-10 w-px bg-orange-300"></div>
            <div className="text-center">
              <div className="text-sm text-orange-700">Идеално тегло</div>
              <div className="font-bold text-orange-800">
                {unit === "cm" 
                  ? `${Math.round((heightValue - 100) * 0.9)} кг` 
                  : `${Math.round((heightValue * 30.48 - 100) * 0.9 / 2.2)} lbs`}
              </div>
            </div>
            <div className="h-10 w-px bg-orange-300"></div>
            <div className="text-center">
              <div className="text-sm text-orange-700">Калории</div>
              <div className="font-bold text-orange-800">
                {unit === "cm" 
                  ? `${Math.round(655 + (9.6 * 70) + (1.8 * heightValue) - (4.7 * 30))}` 
                  : `${Math.round(655 + (9.6 * 154) + (1.8 * heightValue * 30.48) - (4.7 * 30))}`}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeightInputStep;
