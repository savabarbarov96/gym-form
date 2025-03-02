
import React from 'react';
import { motion } from 'framer-motion';
import { FormData } from '@/types/survey';
import {
  BasicInfoStepRenderer,
  BodyAssessmentStepRenderer,
  WorkoutPreferencesStepRenderer,
  LifestyleStepRenderer,
  FinalStepsRenderer
} from './step-renderers';

interface StepRendererProps {
  step: number;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  handleNext: () => void;
  animationDirection: string;
}

const StepRenderer: React.FC<StepRendererProps> = ({
  step,
  formData,
  setFormData,
  handleNext,
  animationDirection
}) => {
  const slideVariants = {
    enter: (direction: string) => ({
      x: direction === "next" ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: string) => ({
      x: direction === "next" ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  // Determine which step range we're in to choose the appropriate renderer
  const getStepContent = () => {
    if (step >= 1 && step <= 5) {
      return <BasicInfoStepRenderer 
        step={step} 
        formData={formData} 
        setFormData={setFormData} 
      />;
    }
    
    if (step >= 6 && step <= 11) {
      return <BodyAssessmentStepRenderer 
        step={step} 
        formData={formData} 
        setFormData={setFormData} 
        handleNext={handleNext}
      />;
    }
    
    if (step >= 12 && step <= 19) {
      return <WorkoutPreferencesStepRenderer 
        step={step} 
        formData={formData} 
        setFormData={setFormData} 
        handleNext={handleNext}
      />;
    }
    
    if (step >= 20 && step <= 24) {
      return <LifestyleStepRenderer 
        step={step} 
        formData={formData} 
        setFormData={setFormData}
      />;
    }
    
    if (step >= 25 && step <= 29) {
      return <FinalStepsRenderer 
        step={step} 
        formData={formData} 
        setFormData={setFormData}
      />;
    }
    
    return null;
  };

  return (
    <motion.div
      key={step}
      custom={animationDirection}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
      className="w-full max-w-4xl mx-auto"
    >
      {getStepContent()}
    </motion.div>
  );
};

export default StepRenderer;
