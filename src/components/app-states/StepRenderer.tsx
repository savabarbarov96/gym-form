import React from 'react';
import { motion } from 'framer-motion';
import { FormData } from '@/types/survey';
import { getStepCategory } from '@/utils/stepMapping';
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
  // Use our step mapping utility to determine the category
  const category = getStepCategory(step);
  console.log(`Step ${step} belongs to category: ${category}`);
  
  switch (category) {
    case 'basicInfo':
      return <BasicInfoStepRenderer 
        step={step} 
        formData={formData} 
        setFormData={setFormData} 
      />;
    
    case 'bodyAssessment':
      return <BodyAssessmentStepRenderer 
        step={step} 
        formData={formData} 
        setFormData={setFormData} 
        handleNext={handleNext}
      />;
    
    case 'workoutPreferences':
      return <WorkoutPreferencesStepRenderer 
        step={step} 
        formData={formData} 
        setFormData={setFormData} 
        handleNext={handleNext}
      />;
    
    case 'lifestyle':
      return <LifestyleStepRenderer 
        step={step} 
        formData={formData} 
        setFormData={setFormData}
      />;
    
    case 'finalSteps':
      return <FinalStepsRenderer 
        step={step} 
        formData={formData} 
        setFormData={setFormData}
      />;
    
    default:
      console.error("No matching step category for step:", step);
      return null;
  }
};

const StepRenderer: React.FC<StepRendererProps> = ({
  step,
  formData,
  setFormData,
  handleNext,
  animationDirection
}) => {
  // Remove excessive logging
  // console.log("StepRenderer rendering step:", step);

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
