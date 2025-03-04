
import React, { useState, useEffect } from "react";

interface CentimeterInputProps {
  value: string | null;
  onChange: (value: string) => void;
}

export const CentimeterInput: React.FC<CentimeterInputProps> = ({ value, onChange }) => {
  const [cmValue, setCmValue] = useState<string>(value && value.includes("cm") ? value.replace(" cm", "") : "");
  
  useEffect(() => {
    if (value && value.includes("cm")) {
      setCmValue(value.replace(" cm", ""));
    }
  }, [value]);

  const handleCmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setCmValue(newValue);
    if (newValue) {
      onChange(`${newValue} cm`);
    } else {
      onChange("");
    }
  };

  return (
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
  );
};
