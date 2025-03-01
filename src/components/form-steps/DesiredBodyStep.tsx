
import React from "react";

interface DesiredBodyStepProps {
  selectedBody: string | null;
  onSelect: (body: string) => void;
}

const DesiredBodyStep = ({ selectedBody, onSelect }: DesiredBodyStepProps) => {
  const bodyTypes = [
    { label: "A few sizes smaller", id: "smaller", image: "/lovable-uploads/40fb59b5-9510-4b7b-bb48-eec384b61f02.png" },
    { label: "Fit", id: "fit", image: "/lovable-uploads/949229f9-bb7a-407e-b06a-54cc9a26b481.png" },
    { label: "Athletic", id: "athletic", image: "/lovable-uploads/6a426793-a78f-42c3-9449-6deaf13b0f41.png" },
  ];

  return (
    <div className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold mb-12">Choose the body you want</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
        {bodyTypes.map((type) => (
          <div
            key={type.id}
            className={`option-card aspect-[3/4] ${selectedBody === type.id ? 'selected' : ''}`}
            onClick={() => onSelect(type.id)}
          >
            <div className="p-4 flex-1 flex flex-col">
              <div className="flex-1 flex items-center justify-center">
                <img 
                  src={type.image} 
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

export default DesiredBodyStep;
