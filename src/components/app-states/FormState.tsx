
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
  handleNext: () => void;
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
    <>
      <ProgressBar progress={progress} />
      
      <AnimatePresence custom={animationDirection} mode="wait">
        <StepRenderer 
          step={step}
          formData={formData}
          setFormData={setFormData}
          handleNext={handleNext}
          animationDirection={animationDirection}
        />
      </AnimatePresence>
      
      <FormNavigation 
        step={step}
        totalSteps={totalSteps}
        handleNext={handleNext}
        handleBack={handleBack}
      />
    </>
  );
};

export default FormState;
