import React from "react";
import { AnimatePresence } from "framer-motion";
import { FormData } from "@/types/survey";
import ProgressBar from './ProgressBar';
import StepRenderer from './StepRenderer';
import FormNavigation from './FormNavigation';

interface FormStateProps {
  step: number;
  totalSteps: number;
  animationDirection: string;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  handleNext: (isAutoNext?: boolean) => void;
  handleBack: () => void;
}

const FormState: React.FC<FormStateProps> = ({ 
  step, 
  totalSteps, 
  animationDirection, 
  formData, 
  setFormData, 
  handleNext, 
  handleBack 
}) => {
  const progress = (step / totalSteps) * 100;
  
  return (
    <div className="flex flex-col min-h-screen">
      <ProgressBar 
        progress={progress} 
        step={step} 
        totalSteps={totalSteps} 
      />
      
      <div className="flex-1 pb-36 sm:pb-28">
        <AnimatePresence custom={animationDirection} mode="wait">
          <StepRenderer 
            step={step}
            formData={formData}
            setFormData={setFormData}
            handleNext={handleNext}
            animationDirection={animationDirection}
          />
        </AnimatePresence>
      </div>
      
      <FormNavigation 
        step={step}
        totalSteps={totalSteps}
        handleNext={handleNext}
        handleBack={handleBack}
      />
    </div>
  );
};

export default FormState;
