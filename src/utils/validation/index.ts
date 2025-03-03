export * from './basicInfoValidation';
export * from './bodyAssessmentValidation';
export * from './finalStepsValidation';
export * from './lifestyleValidation';
export * from './workoutPreferencesValidation';

import { FormData } from "@/types/survey";
import { Toast } from "@/components/ui/use-toast";
import { validateAgeStep } from './basicInfoValidation';
import { validateBodyTypeStep, validateGoalStep, validateFitnessGoalStep, validateDesiredBodyStep } from './basicInfoValidation';
import { validateProblemAreasStep, validateBestShapeStep, validateWeightChangeStep, validateActivitiesStep, validateHealthConcernsStep, validateProgressGraphStep, validateHeightInputStep, validateWeightInputStep } from './bodyAssessmentValidation';
import { validateWorkoutLocationStep, validateWorkoutIntensityStep, validateWorkoutFrequencyStep, validateWorkoutDurationStep, validateExercisePreferencesStep } from './workoutPreferencesValidation';
import { validateSugaryFoodsStep, validateWaterIntakeStep, validateTypicalDayStep, validateEnergyLevelsStep, validateSleepAmountStep } from './lifestyleValidation';
import { validateOutOfBreathStep, validateFallingBackStep, validateSuitableWorkoutsStep, validateMotivationLevelStep, validateDietConsistencyStep, validatePersonalInfoStep, validateStartCommitmentStep } from './finalStepsValidation';

export const validateStep = (step: number, formData: FormData, toast: (props: Toast) => void): boolean => {
  // Basic Info steps (1-5)
  if (step === 1) return validateAgeStep(formData, toast);
  if (step === 2) return validateBodyTypeStep(formData, toast);
  if (step === 3) return validateGoalStep(formData, toast);
  if (step === 4) return validateFitnessGoalStep(formData, toast);
  if (step === 5) return validateDesiredBodyStep(formData, toast);
  
  // Body Assessment steps (6-12)
  if (step === 6) return validateProblemAreasStep(formData, toast);
  if (step === 7) return validateBestShapeStep(formData, toast);
  if (step === 8) return validateWeightChangeStep(formData, toast);
  if (step === 9) return validateActivitiesStep(formData, toast);
  if (step === 10) return validateProgressGraphStep(formData, toast);
  if (step === 11) return validateHealthConcernsStep(formData, toast);
  if (step === 12) return validateHeightInputStep(formData, toast) && validateWeightInputStep(formData, toast);
  
  // Workout Preference steps (13-20)
  if (step === 13) return validateWorkoutLocationStep(formData, toast);
  if (step === 14) return validateWorkoutIntensityStep(formData, toast);
  if (step === 15) return validateWorkoutFrequencyStep(formData, toast);
  if (step === 16) return validateWorkoutDurationStep(formData, toast);
  if (step === 17) return validateExercisePreferencesStep(formData, toast);
  if (step === 18) return validateSugaryFoodsStep(formData, toast);
  if (step === 19) return validateWaterIntakeStep(formData, toast);
  if (step === 20) return validateTypicalDayStep(formData, toast);

  // Lifestyle steps (21-24)
  if (step === 21) return validateEnergyLevelsStep(formData, toast);
  if (step === 22) return validateSleepAmountStep(formData, toast);
  if (step === 23) return validateOutOfBreathStep(formData, toast);
  if (step === 24) return validateFallingBackStep(formData, toast);
  
  // Special case for self-assessment steps: always validate as true since the component handles validation
  if (step >= 25 && step <= 29) return true;
  
  // If no validation is defined for the step, return true
  return true;
};
