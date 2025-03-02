
import { FormData } from "@/types/survey";

export const submitToWebhook = async (formData: FormData): Promise<boolean> => {
  try {
    const params = new URLSearchParams();
    if (formData.age) params.append('age', formData.age);
    if (formData.bodyType) params.append('bodyType', formData.bodyType);
    params.append('goal', formData.goal.toString());
    if (formData.fitnessGoal) params.append('fitnessGoal', formData.fitnessGoal);
    if (formData.desiredBody) params.append('desiredBody', formData.desiredBody);
    if (formData.problemAreas.length > 0) params.append('problemAreas', formData.problemAreas.join(','));
    if (formData.bestShapeTime) params.append('bestShapeTime', formData.bestShapeTime);
    if (formData.weightChange) params.append('weightChange', formData.weightChange);
    if (formData.activities.length > 0) params.append('activities', formData.activities.join(','));
    if (formData.healthConcerns.length > 0) params.append('healthConcerns', formData.healthConcerns.join(','));
    if (formData.workoutLocation) params.append('workoutLocation', formData.workoutLocation);
    if (formData.workoutIntensity) params.append('workoutIntensity', formData.workoutIntensity);
    if (formData.workoutFrequency) params.append('workoutFrequency', formData.workoutFrequency);
    if (formData.workoutDuration) params.append('workoutDuration', formData.workoutDuration);
    if (formData.height) params.append('height', formData.height);
    if (formData.currentWeight) params.append('currentWeight', formData.currentWeight);
    if (formData.targetWeight) params.append('targetWeight', formData.targetWeight);
    params.append('weightUnit', formData.weightUnit);
    
    // Add exercise preferences
    for (const [exercise, preference] of Object.entries(formData.exercisePreferences)) {
      if (preference) {
        params.append(`preference_${exercise.replace(/\s+/g, '_')}`, preference);
      }
    }
    
    // Add new fields
    if (formData.sugaryFoods) params.append('sugaryFoods', formData.sugaryFoods);
    if (formData.waterIntake) params.append('waterIntake', formData.waterIntake.toString());
    if (formData.typicalDay) params.append('typicalDay', formData.typicalDay);
    if (formData.energyLevels) params.append('energyLevels', formData.energyLevels.toString());
    
    const webhookUrl = `https://sava.automationaid.eu/webhook/8ffb7f1e-6c6f-412c-8022-eef6957d78d4?${params.toString()}`;
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to submit data');
    }
    
    return true;
  } catch (error) {
    console.error('Error submitting data:', error);
    return false;
  }
};
