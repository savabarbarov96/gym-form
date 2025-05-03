import { useState, useEffect } from "react";
import { FormData } from "@/types/survey";

export const useSurveyForm = () => {
  // Try to load initial form data from localStorage
  const loadInitialFormData = (): FormData => {
    try {
      const savedData = localStorage.getItem('surveyFormData');
      if (savedData) {
        return JSON.parse(savedData);
      }
    } catch (error) {
      console.error('Failed to load form data from localStorage:', error);
    }
    
    // Return default form data if nothing in localStorage or if parsing fails
    return {
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
    };
  };
  
  const [formData, setFormData] = useState<FormData>(loadInitialFormData());
  
  // Save form data to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('surveyFormData', JSON.stringify(formData));
      
      // Extract and save email separately for Stripe checkout
      if (formData.personalInfo?.email) {
        localStorage.setItem('userEmail', formData.personalInfo.email);
      }
    } catch (error) {
      console.error('Failed to save form data to localStorage:', error);
    }
  }, [formData]);
  
  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  return {
    formData,
    setFormData,
    updateFormData
  };
};
