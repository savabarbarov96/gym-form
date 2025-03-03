
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
  ExercisePreferencesStepRenderer
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
  switch (step) {
    case 12:
      return <FitnessGoalStepRenderer formData={formData} setFormData={setFormData} />;
    case 13:
      return <ProblemAreasStepRenderer formData={formData} setFormData={setFormData} />;
    case 14:
      return <ActivitiesStepRenderer formData={formData} setFormData={setFormData} />;
    case 15:
      return <WorkoutLocationStepRenderer formData={formData} setFormData={setFormData} />;
    case 16:
      return <WorkoutIntensityStepRenderer formData={formData} setFormData={setFormData} />;
    case 17:
      return <WorkoutFrequencyStepRenderer formData={formData} setFormData={setFormData} />;
    case 18:
      return <WorkoutDurationStepRenderer formData={formData} setFormData={setFormData} />;
    case 19:
      return <ExercisePreferencesStepRenderer formData={formData} setFormData={setFormData} handleNext={handleNext} />;
    default:
      return null;
  }
};

export default WorkoutPreferencesStepRenderer;
