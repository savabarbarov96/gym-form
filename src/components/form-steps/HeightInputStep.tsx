import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeightUnitSelector } from "./height-components/HeightUnitSelector";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { InfoIcon, Minus, Plus, X } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface HeightInputStepProps {
  value: string | null;
  onChange: (value: string) => void;
}

const HeightInputStep: React.FC<HeightInputStepProps> = ({ value, onChange }) => {
  const [unit, setUnit] = useState<"cm" | "ft">(!value || value.includes("cm") ? "cm" : "ft");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [heightValue, setHeightValue] = useState<number>(unit === "cm" ? 170 : 5.6);

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

  const incrementHeight = () => {
    const newValue = unit === "cm" 
      ? Math.min(getSliderConfig().max, heightValue + 1) 
      : Math.min(getSliderConfig().max, heightValue + 0.1);
    
    setHeightValue(unit === "cm" ? newValue : parseFloat(newValue.toFixed(1)));
    
    if (unit === "cm") {
      onChange(`${newValue}cm`);
    } else {
      const feet = Math.floor(newValue);
      const inches = Math.round((newValue - feet) * 12);
      onChange(`${feet}ft ${inches}in`);
    }
  };

  const decrementHeight = () => {
    const newValue = unit === "cm" 
      ? Math.max(getSliderConfig().min, heightValue - 1) 
      : Math.max(getSliderConfig().min, heightValue - 0.1);
    
    setHeightValue(unit === "cm" ? newValue : parseFloat(newValue.toFixed(1)));
    
    if (unit === "cm") {
      onChange(`${newValue}cm`);
    } else {
      const feet = Math.floor(newValue);
      const inches = Math.round((newValue - feet) * 12);
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
    <div className="text-center px-4 max-w-md mx-auto">
      {/* Step indicator and header */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="text-sm font-medium text-orange-500 mb-2">Стъпка 6</div>
        <h1 className="text-2xl sm:text-3xl font-bold">Каква е Вашата височина?</h1>
      </motion.div>
      
      {/* Main content card */}
      <motion.div
        className="bg-white rounded-2xl shadow-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {/* Unit selector at the top */}
        <div className="p-4 border-b border-gray-100">
          <HeightUnitSelector unit={unit} toggleUnit={toggleUnit} />
        </div>
        
        {/* Height display and controls */}
        <div className="p-6">
          {/* Display value with increment/decrement buttons */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <Button 
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full border-2 border-orange-200 bg-orange-50 text-orange-500 hover:bg-orange-100 hover:text-orange-600 focus:ring-2 focus:ring-orange-200"
              onClick={decrementHeight}
              aria-label="Decrease height"
            >
              <Minus size={18} />
            </Button>
            
            <div className="text-4xl font-bold text-orange-600 min-w-[120px]">
              {getHeightDisplay()}
            </div>
            
            <Button 
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full border-2 border-orange-200 bg-orange-50 text-orange-500 hover:bg-orange-100 hover:text-orange-600 focus:ring-2 focus:ring-orange-200"
              onClick={incrementHeight}
              aria-label="Increase height"
            >
              <Plus size={18} />
            </Button>
          </div>
          
          {/* Slider with better touch target */}
          <div className="mt-4 px-2">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>{unit === "cm" ? "140 см" : "4'6\""}</span>
              <span>{unit === "cm" ? "220 см" : "7'0\""}</span>
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
          
          {/* Info button */}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="ghost"
                className="mt-6 text-orange-500 hover:text-orange-600 hover:bg-orange-50 flex items-center mx-auto"
              >
                <InfoIcon className="h-4 w-4 mr-2" />
                <span>Защо е важно?</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] sm:max-w-md bg-white border-orange-200">
              <DialogHeader className="flex justify-between items-start">
                <DialogTitle className="text-xl font-bold mb-2 text-orange-700">Защо е важна височината?</DialogTitle>
                <DialogClose className="rounded-full p-1.5 bg-orange-100 hover:bg-orange-200 text-orange-700">
                  <X className="h-5 w-5" />
                </DialogClose>
              </DialogHeader>
              <div className="space-y-3 text-left max-h-[60vh] overflow-y-auto">
                <p className="text-base text-orange-700">
                  Височината е ключов фактор при определянето на вашия фитнес план:
                </p>
                <div className="space-y-3">
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <h3 className="font-semibold text-orange-800">1. Изчисляване на идеално тегло</h3>
                    <p className="text-sm text-orange-700">Помага да определим здравословния диапазон на теглото за вашето тяло.</p>
                  </div>
                  
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <h3 className="font-semibold text-orange-800">2. Калориен прием</h3>
                    <p className="text-sm text-orange-700">Важен компонент при изчисляването на вашите дневни калорийни нужди.</p>
                  </div>
                  
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <h3 className="font-semibold text-orange-800">3. Адаптирани упражнения</h3>
                    <p className="text-sm text-orange-700">Различните упражнения могат да бъдат адаптирани според вашата височина.</p>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>
    </div>
  );
};

export default HeightInputStep;
