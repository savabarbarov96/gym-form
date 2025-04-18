import { useState } from "react";
import { FormData } from "@/types/survey";

export const useSurveyForm = () => {
  const [formData, setFormData] = useState<FormData>({
    gender: null,
    age: null,
    bodyType: null,
    goal: 20,
    currentBodyFat: 25,
    fitnessGoal: null,
    desiredBody: null,
    problemAreas: [],
    bestShapeTime: null,
    weightChange: null,
    activities: [],
    customActivity: null,
    healthConcerns: [],
    customHealthConcern: null,
    allergies: [],
    customAllergy: null,
    traditionalFoods: [],
    customTraditionalFood: null,
    workoutLocation: null,
    workoutIntensity: null,
    workoutFrequency: null,
    workoutDuration: null,
    height: null,
    currentWeight: null,
    targetWeight: null,
    weightUnit: "kg",
    exercisePreferences: {},
    sugaryFoods: null,
    waterIntake: 1500,
    typicalDay: null,
    energyLevels: null,
    sleepAmount: null,
    selfAssessments: {
      outOfBreath: null,
      fallingBack: null,
      suitableWorkouts: null,
      motivationLevel: null,
      dietConsistency: null
    },
    personalInfo: {
      name: null,
      dob: null,
      email: null,
      emailConsent: false
    },
    startCommitment: null
  });
  
  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  return {
    formData,
    setFormData,
    updateFormData
  };
};
