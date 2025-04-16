// This file provides a clear mapping of all survey steps to help maintain the survey flow

export type StepCategory = 
  'basicInfo' | 
  'bodyAssessment' | 
  'workoutPreferences' | 
  'lifestyle' | 
  'finalSteps';

export interface StepDefinition {
  id: number;
  category: StepCategory;
  name: string;
  description: string;
  requiresValidation: boolean;
}

export const SURVEY_STEPS: StepDefinition[] = [
  // Basic Info Steps (1-5)
  { id: 1, category: 'basicInfo', name: 'Gender Selection', description: 'Select your gender', requiresValidation: true },
  { id: 2, category: 'basicInfo', name: 'Age Selection', description: 'Select your age range', requiresValidation: true },
  { id: 3, category: 'basicInfo', name: 'Body Type', description: 'Select your body type', requiresValidation: true },
  { id: 4, category: 'basicInfo', name: 'Goal', description: 'Set your fitness goal', requiresValidation: true },
  { id: 5, category: 'basicInfo', name: 'Fitness Goal', description: 'Set specific fitness goals', requiresValidation: true },
  
  // Body Assessment Steps (6-14)
  { id: 6, category: 'bodyAssessment', name: 'Height Input', description: 'Enter your height', requiresValidation: true },
  { id: 7, category: 'bodyAssessment', name: 'Weight Input', description: 'Enter your weight', requiresValidation: true },
  { id: 8, category: 'bodyAssessment', name: 'Best Shape', description: 'When were you in your best shape', requiresValidation: true },
  { id: 9, category: 'bodyAssessment', name: 'Weight Change', description: 'How your weight typically changes', requiresValidation: true },
  { id: 10, category: 'bodyAssessment', name: 'Progress Graph', description: 'Projected progress visualization', requiresValidation: false },
  { id: 11, category: 'bodyAssessment', name: 'Hormone Graph', description: 'Hormone changes visualization', requiresValidation: false },
  { id: 12, category: 'bodyAssessment', name: 'Health Concerns', description: 'Select any health concerns', requiresValidation: true },
  { id: 13, category: 'bodyAssessment', name: 'Allergies', description: 'Select any allergies you have', requiresValidation: false },
  { id: 14, category: 'bodyAssessment', name: 'Traditional Foods', description: 'Select your favorite Bulgarian foods', requiresValidation: false },
  
  // Workout Preferences Steps (15-22)
  { id: 15, category: 'workoutPreferences', name: 'Problem Areas', description: 'Select your problem areas', requiresValidation: false },
  { id: 16, category: 'workoutPreferences', name: 'Activities', description: 'Select activities you enjoy', requiresValidation: false },
  { id: 17, category: 'workoutPreferences', name: 'Workout Location', description: 'Where you\'ll be working out', requiresValidation: true },
  { id: 18, category: 'workoutPreferences', name: 'Workout Intensity', description: 'Your preferred workout intensity', requiresValidation: true },
  { id: 19, category: 'workoutPreferences', name: 'Equipment Access', description: 'What fitness equipment you have access to', requiresValidation: true },
  { id: 20, category: 'workoutPreferences', name: 'Workout Frequency', description: 'How many days per week you can workout', requiresValidation: true },
  { id: 21, category: 'workoutPreferences', name: 'Exercise Preferences', description: 'Your exercise preferences', requiresValidation: false },
  { id: 22, category: 'workoutPreferences', name: 'Desired Body', description: 'Your desired body type', requiresValidation: true },
  
  // Lifestyle Steps (23-27)
  { id: 23, category: 'lifestyle', name: 'Sugary Foods', description: 'Your consumption of sugary foods', requiresValidation: true },
  { id: 24, category: 'lifestyle', name: 'Water Intake', description: 'Your daily water intake', requiresValidation: true },
  { id: 25, category: 'lifestyle', name: 'Typical Day', description: 'How your typical day looks', requiresValidation: true },
  { id: 26, category: 'lifestyle', name: 'Energy Levels', description: 'Your typical energy levels', requiresValidation: true },
  { id: 27, category: 'lifestyle', name: 'Sleep Amount', description: 'How much you sleep', requiresValidation: true },
  
  // Final Steps (28-33)
  { id: 28, category: 'finalSteps', name: 'Self Assessment - Out of Breath', description: 'How quickly you get out of breath', requiresValidation: true },
  { id: 29, category: 'finalSteps', name: 'Self Assessment - Falling Back', description: 'How often you fall back into old habits', requiresValidation: true },
  { id: 30, category: 'finalSteps', name: 'Self Assessment - Motivation', description: 'Your motivation level', requiresValidation: true },
  { id: 31, category: 'finalSteps', name: 'Self Assessment - Diet Consistency', description: 'Your diet consistency', requiresValidation: true },
  { id: 32, category: 'finalSteps', name: 'Personal Info', description: 'Your personal information', requiresValidation: true },
  { id: 33, category: 'finalSteps', name: 'Start Commitment', description: 'When you want to start', requiresValidation: true },
];

export const getStepInfo = (stepNumber: number): StepDefinition | undefined => {
  return SURVEY_STEPS.find(step => step.id === stepNumber);
};

export const getCategorySteps = (category: StepCategory): StepDefinition[] => {
  return SURVEY_STEPS.filter(step => step.category === category);
};

export const getStepCategory = (stepNumber: number): StepCategory | undefined => {
  const step = SURVEY_STEPS.find(step => step.id === stepNumber);
  return step?.category;
};

export const getLocalStepNumber = (globalStepNumber: number): number => {
  const category = getStepCategory(globalStepNumber);
  if (!category) return -1;
  
  const categorySteps = getCategorySteps(category);
  const stepIndex = categorySteps.findIndex(step => step.id === globalStepNumber);
  return stepIndex;
};
