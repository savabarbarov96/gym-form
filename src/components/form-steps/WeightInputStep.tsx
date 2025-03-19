import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Scale, TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface WeightInputStepProps {
  currentWeight: string | null;
  targetWeight: string | null;
  weightUnit: "kg" | "lbs";
  onCurrentWeightChange: (weight: string | null) => void;
  onTargetWeightChange: (weight: string | null) => void;
  onWeightUnitChange: (unit: "kg" | "lbs") => void;
}

const WeightInputStep = ({ 
  currentWeight, 
  targetWeight, 
  weightUnit, 
  onCurrentWeightChange, 
  onTargetWeightChange, 
  onWeightUnitChange
}: WeightInputStepProps) => {
  const [localCurrentWeight, setLocalCurrentWeight] = useState(currentWeight || "");
  const [localTargetWeight, setLocalTargetWeight] = useState(targetWeight || "");
  const [localWeightUnit, setLocalWeightUnit] = useState<"kg" | "lbs">(weightUnit);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [weightGoal, setWeightGoal] = useState<"lose" | "gain" | "maintain" | null>(null);

  // Determine weight goal based on current and target weights
  useEffect(() => {
    if (localCurrentWeight && localTargetWeight) {
      const current = parseFloat(localCurrentWeight);
      const target = parseFloat(localTargetWeight);
      
      if (!isNaN(current) && !isNaN(target)) {
        if (target < current) {
          setWeightGoal("lose");
        } else if (target > current) {
          setWeightGoal("gain");
        } else {
          setWeightGoal("maintain");
        }
      }
    }
  }, [localCurrentWeight, localTargetWeight]);

  const handleCurrentWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalCurrentWeight(e.target.value);
    onCurrentWeightChange(e.target.value);
    setHasInteracted(true);
    
    // Play a sound when input changes
    try {
      const audio = new Audio('/assets/sounds/click.mp3');
      audio.volume = 0.2;
      audio.play().catch(error => {
        console.log('Error playing sound:', error);
      });
    } catch (error) {
      console.log('Error creating audio instance:', error);
    }
  };

  const handleTargetWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalTargetWeight(e.target.value);
    onTargetWeightChange(e.target.value);
    setHasInteracted(true);
    
    // Play a sound when input changes
    try {
      const audio = new Audio('/assets/sounds/click.mp3');
      audio.volume = 0.2;
      audio.play().catch(error => {
        console.log('Error playing sound:', error);
      });
    } catch (error) {
      console.log('Error creating audio instance:', error);
    }
  };

  const handleUnitChange = (value: "kg" | "lbs") => {
    setLocalWeightUnit(value);
    onWeightUnitChange(value);
    
    // Convert weights when changing units
    if (localCurrentWeight) {
      const currentNum = parseFloat(localCurrentWeight);
      if (!isNaN(currentNum)) {
        const converted = value === "kg" 
          ? (currentNum * 0.453592).toFixed(1) 
          : (currentNum * 2.20462).toFixed(1);
        setLocalCurrentWeight(converted);
        onCurrentWeightChange(converted);
      }
    }
    
    if (localTargetWeight) {
      const targetNum = parseFloat(localTargetWeight);
      if (!isNaN(targetNum)) {
        const converted = value === "kg" 
          ? (targetNum * 0.453592).toFixed(1) 
          : (targetNum * 2.20462).toFixed(1);
        setLocalTargetWeight(converted);
        onTargetWeightChange(converted);
      }
    }
  };

  const getWeightGoalIcon = () => {
    switch (weightGoal) {
      case "lose":
        return <TrendingDown className="text-green-500" size={24} />;
      case "gain":
        return <TrendingUp className="text-blue-500" size={24} />;
      case "maintain":
        return <Scale className="text-orange" size={24} />;
      default:
        return null;
    }
  };

  const getWeightGoalText = () => {
    switch (weightGoal) {
      case "lose":
        return "Отслабване";
      case "gain":
        return "Качване на тегло";
      case "maintain":
        return "Поддържане на тегло";
      default:
        return null;
    }
  };

  return (
    <div className="text-center max-w-3xl mx-auto">
      <motion.h1 
        className="text-4xl sm:text-5xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Какво е Вашето текущо и целево тегло?
      </motion.h1>
      
      <motion.p
        className="text-muted-foreground mb-10 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        Тази информация ни помага да създадем персонализиран план, съобразен с Вашите цели.
      </motion.p>
      
      <motion.div 
        className={cn(
          "max-w-md mx-auto space-y-8 p-8 rounded-xl border shadow-lg relative",
          hasInteracted ? "bg-orange/10 border-orange/30" : "bg-card border-border"
        )}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        whileHover={{ scale: 1.01 }}
      >
        {hasInteracted && localCurrentWeight && localTargetWeight && (
          <motion.div 
            className="absolute top-4 right-4 text-orange"
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ type: "spring" }}
          >
            <CheckCircle size={24} />
          </motion.div>
        )}
        
        <motion.div 
          className="flex justify-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <RadioGroup 
            value={localWeightUnit} 
            onValueChange={(value) => handleUnitChange(value as "kg" | "lbs")}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="kg" id="kg" className="text-orange" />
              <label htmlFor="kg" className="text-lg cursor-pointer">кг</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="lbs" id="lbs" className="text-orange" />
              <label htmlFor="lbs" className="text-lg cursor-pointer">паунда</label>
            </div>
          </RadioGroup>
        </motion.div>
        
        <motion.div 
          className="space-y-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <label htmlFor="current-weight" className="block text-lg font-medium text-left">
            Текущо тегло ({localWeightUnit === "kg" ? "кг" : "паунда"})
          </label>
          <Input
            id="current-weight"
            type="number"
            value={localCurrentWeight}
            onChange={handleCurrentWeightChange}
            className={cn(
              "w-full text-lg py-6",
              localCurrentWeight ? "border-orange/50 bg-orange/5" : ""
            )}
            placeholder={`Въведете текущото си тегло в ${localWeightUnit === "kg" ? "кг" : "паунда"}`}
          />
        </motion.div>
        
        <motion.div 
          className="space-y-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <label htmlFor="target-weight" className="block text-lg font-medium text-left">
            Целево тегло ({localWeightUnit === "kg" ? "кг" : "паунда"})
          </label>
          <Input
            id="target-weight"
            type="number"
            value={localTargetWeight}
            onChange={handleTargetWeightChange}
            className={cn(
              "w-full text-lg py-6",
              localTargetWeight ? "border-orange/50 bg-orange/5" : ""
            )}
            placeholder={`Въведете целевото си тегло в ${localWeightUnit === "kg" ? "кг" : "паунда"}`}
          />
        </motion.div>
        
        <AnimatePresence>
          {weightGoal && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-6 p-4 bg-orange/5 rounded-lg border border-orange/20 flex items-center justify-center gap-3"
            >
              {getWeightGoalIcon()}
              <p className="text-lg font-medium">
                {getWeightGoalText()}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default WeightInputStep;
