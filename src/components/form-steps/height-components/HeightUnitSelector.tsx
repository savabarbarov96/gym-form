import React from "react";

interface HeightUnitSelectorProps {
  unit: "cm" | "ft";
  toggleUnit: () => void;
}

export const HeightUnitSelector: React.FC<HeightUnitSelectorProps> = ({ unit, toggleUnit }) => {
  return (
    <div className="flex w-full rounded-lg overflow-hidden shadow-sm">
      <button
        type="button"
        onClick={toggleUnit}
        className={`flex-1 py-3 text-sm sm:text-base font-medium transition-all ${
          unit === "cm" 
            ? "bg-orange-500 text-white" 
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
        aria-pressed={unit === "cm"}
      >
        Сантиметри
      </button>
      <button
        type="button"
        onClick={toggleUnit}
        className={`flex-1 py-3 text-sm sm:text-base font-medium transition-all ${
          unit === "ft" 
            ? "bg-orange-500 text-white" 
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
        aria-pressed={unit === "ft"}
      >
        Футове и Инчове
      </button>
    </div>
  );
};
