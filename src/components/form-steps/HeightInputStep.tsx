
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Info } from "lucide-react";
import { HeightUnitSelector } from "./height-components/HeightUnitSelector";
import { CentimeterInput } from "./height-components/CentimeterInput";
import { FeetInchesInput } from "./height-components/FeetInchesInput";
import { HeightInfoTooltip } from "./height-components/HeightInfoTooltip";

interface HeightInputStepProps {
  value: string | null;
  onChange: (value: string) => void;
}

const HeightInputStep: React.FC<HeightInputStepProps> = ({ value, onChange }) => {
  console.log("Rendering HeightInputStep with value:", value);
  
  const [unit, setUnit] = useState<"cm" | "ft">(!value || value.includes("cm") ? "cm" : "ft");
  const [showInfo, setShowInfo] = useState(false);

  const toggleUnit = () => {
    if (unit === "cm") {
      setUnit("ft");
      onChange("");
    } else {
      setUnit("cm");
      onChange("");
    }
  };

  return (
    <div className="text-center max-w-3xl mx-auto">
      <motion.h1 
        className="text-4xl sm:text-5xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        What's your height?
      </motion.h1>
      
      <div className="relative inline-block">
        <motion.button
          type="button"
          onClick={() => setShowInfo(!showInfo)}
          className="text-muted-foreground mb-8 flex items-center mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
        >
          <Info size={16} className="mr-1" />
          <span>This information helps us calculate your BMI</span>
        </motion.button>
        
        {showInfo && <HeightInfoTooltip />}
      </div>
      
      <motion.div
        className="mt-10 bg-card p-8 rounded-xl border border-border shadow-lg max-w-md mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <HeightUnitSelector unit={unit} toggleUnit={toggleUnit} />
        
        {unit === "cm" ? (
          <CentimeterInput value={value} onChange={onChange} />
        ) : (
          <FeetInchesInput value={value} onChange={onChange} />
        )}
      </motion.div>
    </div>
  );
};

export default HeightInputStep;
