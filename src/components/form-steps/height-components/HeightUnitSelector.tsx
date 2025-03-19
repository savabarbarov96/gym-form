import React from "react";

interface HeightUnitSelectorProps {
  unit: "cm" | "ft";
  toggleUnit: () => void;
}

export const HeightUnitSelector: React.FC<HeightUnitSelectorProps> = ({ unit, toggleUnit }) => {
  return (
    <div className="flex justify-center mb-6">
      <button
        type="button"
        onClick={toggleUnit}
        className={`px-4 py-2 rounded-l-lg transition-colors ${unit === "cm" ? "bg-orange text-white" : "bg-secondary text-foreground"}`}
      >
        Сантиметри
      </button>
      <button
        type="button"
        onClick={toggleUnit}
        className={`px-4 py-2 rounded-r-lg transition-colors ${unit === "ft" ? "bg-orange text-white" : "bg-secondary text-foreground"}`}
      >
        Футове и Инчове
      </button>
    </div>
  );
};
