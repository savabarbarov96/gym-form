
import React from 'react';
import { FormData } from '@/types/survey';
import {
  FitnessGoalStepRenderer,
  ProblemAreasStepRenderer,
  ActivitiesStepRenderer,
  WorkoutLocationStepRenderer,
  WorkoutIntensityStepRenderer,
  WorkoutFrequencyStepRenderer,
  WorkoutDurationStepRenderer,
  ExercisePreferencesStepRenderer,
  DesiredBodyStepRenderer,
  AllergiesStepRenderer
} from './workout-preferences';

interface WorkoutPreferencesStepRendererProps {
  step: number;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  handleNext: () => void;
}

const WorkoutPreferencesStepRenderer = ({
  step,
  formData,
  setFormData,
  handleNext
}: WorkoutPreferencesStepRendererProps) => {
  // Calculate local step (step - 13 for global to local mapping)
  // Step 13 would be local step 0, etc.
  const localStep = step - 13;
  
  console.log("Workout Preferences Step Renderer", { step, localStep, formData });

  // Map local steps to components
  switch (localStep) {
    case 0: // Global step 13
      return <FitnessGoalStepRenderer formData={formData} setFormData={setFormData} />;
    case 1: // Global step 14
      console.log("Rendering Problem Areas Step in workflow");
      return <ProblemAreasStepRenderer formData={formData} setFormData={setFormData} handleNext={handleNext} />;
    case 2: // Global step 15
      return <ActivitiesStepRenderer formData={formData} setFormData={setFormData} />;
    case 3: // Global step 16
      return <WorkoutLocationStepRenderer formData={formData} setFormData={setFormData} />;
    case 4: // Global step 17
      return <WorkoutIntensityStepRenderer formData={formData} setFormData={setFormData} />;
    case 5: // Global step 18
      return <WorkoutFrequencyStepRenderer formData={formData} setFormData={setFormData} />;
    case 6: // Global step 19
      return <WorkoutDurationStepRenderer formData={formData} setFormData={setFormData} />;
    case 7: // Global step 20
      return <ExercisePreferencesStepRenderer formData={formData} setFormData={setFormData} />;
    case 8: // Global step 21
      return <DesiredBodyStepRenderer formData={formData} setFormData={setFormData} />;
    default:
      console.error("No matching workout preference step:", localStep);
      return null;
  }
};

export default WorkoutPreferencesStepRenderer;
