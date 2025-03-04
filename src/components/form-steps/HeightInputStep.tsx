import React, { useState } from "react";
import { motion } from "framer-motion";
import { HeightUnitSelector } from "./height-components/HeightUnitSelector";
import { CentimeterInput } from "./height-components/CentimeterInput";
import { FeetInchesInput } from "./height-components/FeetInchesInput";
import { HeightInputHeader } from "./height-components/HeightInputHeader";

interface HeightInputStepProps {
  value: string | null;
  onChange: (value: string) => void;
}

const HeightInputStep: React.FC<HeightInputStepProps> = ({ value, onChange }) => {
  console.log("Rendering HeightInputStep with value:", value);
  
  const [unit, setUnit] = useState<"cm" | "ft">(!value || value.includes("cm") ? "cm" : "ft");

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
      <HeightInputHeader />
      
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
