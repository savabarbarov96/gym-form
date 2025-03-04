
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Info } from "lucide-react";

interface HeightInputStepProps {
  value: string | null;
  onChange: (value: string) => void;
}

const HeightInputStep: React.FC<HeightInputStepProps> = ({ value, onChange }) => {
  console.log("Rendering HeightInputStep with value:", value);
  
  const [unit, setUnit] = useState<"cm" | "ft">(!value || value.includes("cm") ? "cm" : "ft");
  const [cmValue, setCmValue] = useState<string>(value && value.includes("cm") ? value.replace(" cm", "") : "");
  const [ftValue, setFtValue] = useState<string>(value && value.includes("ft") ? value.replace(/ ft.*/, "") : "");
  const [inValue, setInValue] = useState<string>(value && value.includes("in") ? value.match(/(\d+) in/)?.[1] || "" : "");
  const [showInfo, setShowInfo] = useState(false);

  const handleCmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setCmValue(newValue);
    if (newValue) {
      onChange(`${newValue} cm`);
    } else {
      onChange("");
    }
  };

  const handleFtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setFtValue(newValue);
    updateFtInHeight(newValue, inValue);
  };

  const handleInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInValue(newValue);
    updateFtInHeight(ftValue, newValue);
  };

  const updateFtInHeight = (ft: string, inches: string) => {
    if (ft || inches) {
      onChange(`${ft || "0"} ft ${inches || "0"} in`);
    } else {
      onChange("");
    }
  };

  const toggleUnit = () => {
    if (unit === "cm") {
      setUnit("ft");
      setCmValue("");
      onChange("");
    } else {
      setUnit("cm");
      setFtValue("");
      setInValue("");
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
        
        {showInfo && (
          <motion.div 
            className="absolute z-10 mt-2 p-4 bg-card border border-border rounded-lg shadow-lg w-72 text-left"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <p className="text-sm">
              Body Mass Index (BMI) is a value derived from your height and weight. 
              It helps us tailor workout plans that are appropriate for your body composition.
            </p>
          </motion.div>
        )}
      </div>
      
      <motion.div
        className="mt-10 bg-card p-8 rounded-xl border border-border shadow-lg max-w-md mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="flex justify-center mb-6">
          <button
            type="button"
            onClick={toggleUnit}
            className={`px-4 py-2 rounded-l-lg transition-colors ${unit === "cm" ? "bg-orange text-white" : "bg-secondary text-foreground"}`}
          >
            Centimeters
          </button>
          <button
            type="button"
            onClick={toggleUnit}
            className={`px-4 py-2 rounded-r-lg transition-colors ${unit === "ft" ? "bg-orange text-white" : "bg-secondary text-foreground"}`}
          >
            Feet & Inches
          </button>
        </div>
        
        {unit === "cm" ? (
          <div className="flex items-center">
            <input
              type="number"
              min="50"
              max="250"
              value={cmValue}
              onChange={handleCmChange}
              className="w-full p-3 bg-input border border-border rounded-lg text-foreground text-center text-xl"
              placeholder="Enter height"
            />
            <span className="ml-3 text-xl">cm</span>
          </div>
        ) : (
          <div className="flex gap-4">
            <div className="flex items-center flex-1">
              <input
                type="number"
                min="1"
                max="9"
                value={ftValue}
                onChange={handleFtChange}
                className="w-full p-3 bg-input border border-border rounded-lg text-foreground text-center text-xl"
                placeholder="Feet"
              />
              <span className="ml-2 text-xl">ft</span>
            </div>
            <div className="flex items-center flex-1">
              <input
                type="number"
                min="0"
                max="11"
                value={inValue}
                onChange={handleInChange}
                className="w-full p-3 bg-input border border-border rounded-lg text-foreground text-center text-xl"
                placeholder="Inches"
              />
              <span className="ml-2 text-xl">in</span>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default HeightInputStep;
