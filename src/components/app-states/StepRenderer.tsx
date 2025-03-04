
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

// Animation variants for slide transitions
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

// Function to determine which step renderer to use based on step number
const getStepContent = (
  step: number, 
  formData: FormData, 
  setFormData: React.Dispatch<React.SetStateAction<FormData>>,
  handleNext: () => void
) => {
  // Basic Info Steps (1-5)
  if (step >= 1 && step <= 5) {
    return <BasicInfoStepRenderer 
      step={step} 
      formData={formData} 
      setFormData={setFormData} 
    />;
  }
  
  // Body Assessment Steps (6-12)
  if (step >= 6 && step <= 12) {
    return <BodyAssessmentStepRenderer 
      step={step} 
      formData={formData} 
      setFormData={setFormData} 
      handleNext={handleNext}
    />;
  }
  
  // Workout Preferences Steps (13-21)
  if (step >= 13 && step <= 21) {
    return <WorkoutPreferencesStepRenderer 
      step={step} 
      formData={formData} 
      setFormData={setFormData} 
      handleNext={handleNext}
    />;
  }
  
  // Lifestyle Steps (22-26)
  if (step >= 22 && step <= 26) {
    return <LifestyleStepRenderer 
      step={step} 
      formData={formData} 
      setFormData={setFormData}
    />;
  }
  
  // Final Steps (27-31)
  if (step >= 27 && step <= 31) {
    return <FinalStepsRenderer 
      step={step} 
      formData={formData} 
      setFormData={setFormData}
    />;
  }
  
  console.log("No matching step range for step:", step);
  return null;
};

const StepRenderer: React.FC<StepRendererProps> = ({
  step,
  formData,
  setFormData,
  handleNext,
  animationDirection
}) => {
  console.log("StepRenderer rendering step:", step);

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
      {getStepContent(step, formData, setFormData, handleNext)}
    </motion.div>
  );
};

export default StepRenderer;
