
import React from 'react';

interface ProgressIndicatorProps {
  totalSteps: number;
  currentStep: number;
  isLastStep: boolean;
}

const ProgressIndicator = ({ totalSteps, currentStep, isLastStep }: ProgressIndicatorProps) => {
  return (
    <>
      <div className="flex justify-center mt-6">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div 
            key={index}
            className={`w-2 h-2 rounded-full mx-1 ${
              index === currentStep ? "bg-orange" : "bg-muted"
            }`}
          />
        ))}
      </div>
      
      <p className="mt-6 text-muted-foreground">
        {isLastStep ? 
          "Press Continue to proceed" : 
          `${currentStep + 1} of ${totalSteps}`
        }
      </p>
    </>
  );
};

export default ProgressIndicator;
