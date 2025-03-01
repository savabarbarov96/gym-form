
import React from "react";

interface BodyTypeStepProps {
  selectedType: string | null;
  onSelect: (type: string) => void;
}

const BodyTypeStep = ({ selectedType, onSelect }: BodyTypeStepProps) => {
  const bodyTypes = [
    { label: "Slim", id: "slim" },
    { label: "Average", id: "average" },
    { label: "Heavy", id: "heavy" },
  ];

  return (
    <div className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold mb-12">Choose your body type</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
        {bodyTypes.map((type) => (
          <div
            key={type.id}
            className={`option-card aspect-[3/4] ${selectedType === type.id ? 'selected' : ''}`}
            onClick={() => onSelect(type.id)}
          >
            <div className="p-4 flex-1 flex flex-col">
              <div className="flex-1 flex items-center justify-center">
                <img 
                  src={`/lovable-uploads/${type.id === "slim" ? "82f8a303-b796-47ca-a21f-603d7e9c07ba.png" : 
                       type.id === "average" ? "949229f9-bb7a-407e-b06a-54cc9a26b481.png" : 
                       "4da1e807-08a9-43e9-a569-7c2f5d6e9591.png"}`} 
                  alt={`${type.label} body type`}
                  className="h-full object-contain"
                />
              </div>
              <div className="mt-auto">
                <h3 className="text-xl font-medium">{type.label}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BodyTypeStep;
