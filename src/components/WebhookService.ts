export interface FormData {
  age: string | null;
  bodyType: string | null;
  goal: number;
  fitnessGoal: string | null;
  desiredBody: string | null;
  problemAreas: string[];
  bestShapeTime: string | null;
  weightChange: string | null;
  activities: string[];
  healthConcerns: string[];
  workoutLocation: string | null;
  workoutIntensity: string | null;
}

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
