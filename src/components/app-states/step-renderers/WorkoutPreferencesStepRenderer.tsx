
import React from 'react';
import { FormData } from '@/types/survey';
import {
  FitnessGoalStepRenderer,
  DesiredBodyStepRenderer,
  ProblemAreasStepRenderer,
  ActivitiesStepRenderer,
  WorkoutLocationStepRenderer,
  WorkoutIntensityStepRenderer,
  WorkoutFrequencyStepRenderer,
  WorkoutDurationStepRenderer,
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
  // Adjust for the new step arrangement
  const localStep = step - 13;
  
  switch (localStep) {
    case 1:
      return <DesiredBodyStepRenderer formData={formData} setFormData={setFormData} />;
    case 2:
      return <AllergiesStepRenderer formData={formData} setFormData={setFormData} />;
    case 3:
      return <WorkoutLocationStepRenderer formData={formData} setFormData={setFormData} />;
    case 4:
      return <WorkoutIntensityStepRenderer formData={formData} setFormData={setFormData} />;
    case 5:
      return <WorkoutFrequencyStepRenderer formData={formData} setFormData={setFormData} />;
    case 6:
      return <WorkoutDurationStepRenderer formData={formData} setFormData={setFormData} />;
    case 7:
      return <ProblemAreasStepRenderer formData={formData} setFormData={setFormData} />;
    case 8:
      return <ActivitiesStepRenderer formData={formData} setFormData={setFormData} />;
    default:
      return null;
  }
};

export default WorkoutPreferencesStepRenderer;
