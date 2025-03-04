import React, { useState, useEffect } from "react";

interface FeetInchesInputProps {
  value: string | null;
  onChange: (value: string) => void;
}

export const FeetInchesInput: React.FC<FeetInchesInputProps> = ({ value, onChange }) => {
  const [ftValue, setFtValue] = useState<string>(value && value.includes("ft") ? value.replace(/ ft.*/, "") : "");
  const [inValue, setInValue] = useState<string>(value && value.includes("in") ? value.match(/(\d+) in/)?.[1] || "" : "");
  
  useEffect(() => {
    if (value && value.includes("ft")) {
      setFtValue(value.replace(/ ft.*/, ""));
      setInValue(value.match(/(\d+) in/)?.[1] || "");
    }
  }, [value]);

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

  return (
    <div className="flex gap-4">
      <div className="flex items-center flex-1">
        <input
          type="number"
          min="1"
          max="9"
          value={ftValue}
          onChange={handleFtChange}
          className="w-full p-3 bg-input border border-border rounded-lg text-foreground text-center text-xl"
          placeholder="Футове"
        />
        <span className="ml-2 text-xl">фт</span>
      </div>
      <div className="flex items-center flex-1">
        <input
          type="number"
          min="0"
          max="11"
          value={inValue}
          onChange={handleInChange}
          className="w-full p-3 bg-input border border-border rounded-lg text-foreground text-center text-xl"
          placeholder="Инчове"
        />
        <span className="ml-2 text-xl">ин</span>
      </div>
    </div>
  );
};
