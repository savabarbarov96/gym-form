
import { FormData } from "@/types/survey";

export const submitToWebhook = async (formData: FormData): Promise<boolean> => {
  try {
    // Create a more structured object with clear labels for the AI
    const params = new URLSearchParams();
    
    // Basic Information
    if (formData.age) params.append('age', formData.age);
    if (formData.bodyType) params.append('bodyType', formData.bodyType);
    params.append('motivationLevel', formData.goal.toString());
    if (formData.fitnessGoal) params.append('fitnessGoal', formData.fitnessGoal);
    if (formData.desiredBody) params.append('desiredBody', formData.desiredBody);
    
    // Body Assessment
    if (formData.problemAreas.length > 0) params.append('problemAreas', formData.problemAreas.join(','));
    if (formData.bestShapeTime) params.append('bestShapeTime', formData.bestShapeTime);
    if (formData.weightChange) params.append('weightChangeTrend', formData.weightChange);
    if (formData.activities.length > 0) params.append('currentActivities', formData.activities.join(','));
    if (formData.healthConcerns.length > 0) params.append('healthConcerns', formData.healthConcerns.join(','));
    
    // Workout Preferences
    if (formData.workoutLocation) params.append('workoutLocation', formData.workoutLocation);
    if (formData.workoutIntensity) params.append('workoutIntensity', formData.workoutIntensity);
    if (formData.workoutFrequency) params.append('workoutFrequency', formData.workoutFrequency);
    if (formData.workoutDuration) params.append('workoutDuration', formData.workoutDuration);
    
    // Body Measurements
    if (formData.height) params.append('height', formData.height);
    if (formData.currentWeight) params.append('currentWeight', formData.currentWeight);
    if (formData.targetWeight) params.append('targetWeight', formData.targetWeight);
    params.append('weightUnit', formData.weightUnit);
    
    // Exercise Preferences
    for (const [exercise, preference] of Object.entries(formData.exercisePreferences)) {
      if (preference) {
        params.append(`exercisePreference_${exercise.replace(/\s+/g, '_')}`, preference);
      }
    }
    
    // Lifestyle Information
    if (formData.sugaryFoods) params.append('sugaryFoodsFrequency', formData.sugaryFoods);
    if (formData.waterIntake) params.append('dailyWaterIntake_ml', formData.waterIntake.toString());
    if (formData.typicalDay) params.append('activityLevel', formData.typicalDay);
    if (formData.energyLevels) params.append('energyLevels', formData.energyLevels.toString());
    if (formData.sleepAmount) params.append('sleepHours', formData.sleepAmount.toString());
    
    // Self Assessments
    if (formData.selfAssessments.outOfBreath !== null) 
      params.append('assessment_outOfBreath', formData.selfAssessments.outOfBreath.toString());
    if (formData.selfAssessments.fallingBack !== null) 
      params.append('assessment_stayingConsistent', formData.selfAssessments.fallingBack.toString());
    if (formData.selfAssessments.suitableWorkouts !== null) 
      params.append('assessment_findingSuitableWorkouts', formData.selfAssessments.suitableWorkouts.toString());
    if (formData.selfAssessments.motivationLevel !== null) 
      params.append('assessment_motivationStruggle', formData.selfAssessments.motivationLevel.toString());
    if (formData.selfAssessments.dietConsistency !== null) 
      params.append('assessment_dietConsistency', formData.selfAssessments.dietConsistency.toString());
    
    // Personal Information
    if (formData.personalInfo.name) params.append('name', formData.personalInfo.name);
    if (formData.personalInfo.dob) params.append('dateOfBirth', formData.personalInfo.dob);
    if (formData.personalInfo.email) params.append('email', formData.personalInfo.email);
    params.append('marketingConsent', formData.personalInfo.emailConsent.toString());
    
    // Commitment Information
    if (formData.startCommitment) params.append('startCommitment', formData.startCommitment);
    
    // Add contextual information
    const contextParams = generateContextualParameters(formData);
    for (const [key, value] of Object.entries(contextParams)) {
      params.append(key, value);
    }
    
    const webhookUrl = `https://sava.automationaid.eu/webhook/8ffb7f1e-6c6f-412c-8022-eef6957d78d4?${params.toString()}`;
    
    console.log("Submitting data to webhook:", Object.fromEntries(params.entries()));
    
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

// Function to generate additional contextual parameters that might help the AI
const generateContextualParameters = (formData: FormData): Record<string, string> => {
  const contextParams: Record<string, string> = {};
  
  // Calculate BMI if height and weight are available
  if (formData.height && formData.currentWeight) {
    try {
      const heightInM = parseFloat(formData.height) / 100; // assuming height is in cm
      const weightInKg = formData.weightUnit === 'kg' 
        ? parseFloat(formData.currentWeight)
        : parseFloat(formData.currentWeight) * 0.453592; // convert lbs to kg
      
      if (!isNaN(heightInM) && !isNaN(weightInKg) && heightInM > 0) {
        const bmi = weightInKg / (heightInM * heightInM);
        contextParams['calculatedBMI'] = bmi.toFixed(1);
      }
    } catch (e) {
      // Silently fail if calculation isn't possible
    }
  }
  
  // Weight loss/gain goal if current and target weights are available
  if (formData.currentWeight && formData.targetWeight) {
    try {
      const current = parseFloat(formData.currentWeight);
      const target = parseFloat(formData.targetWeight);
      if (!isNaN(current) && !isNaN(target)) {
        const difference = target - current;
        contextParams['weightChangeGoal'] = difference.toString();
        contextParams['weightChangeDirection'] = difference > 0 ? 'gain' : difference < 0 ? 'loss' : 'maintain';
      }
    } catch (e) {
      // Silently fail if calculation isn't possible
    }
  }
  
  // Assess overall fitness level based on multiple factors
  let fitnessScore = 0;
  let factorsCount = 0;
  
  // Consider workout frequency
  if (formData.workoutFrequency) {
    factorsCount++;
    if (formData.workoutFrequency === 'none') fitnessScore += 1;
    else if (formData.workoutFrequency === '1-2-times') fitnessScore += 2;
    else if (formData.workoutFrequency === '3-times') fitnessScore += 3;
    else if (formData.workoutFrequency === 'more-than-3') fitnessScore += 4;
  }
  
  // Consider energy levels
  if (formData.energyLevels !== null) {
    factorsCount++;
    fitnessScore += formData.energyLevels;
  }
  
  // Consider out of breath assessment
  if (formData.selfAssessments.outOfBreath !== null) {
    factorsCount++;
    fitnessScore += (6 - formData.selfAssessments.outOfBreath); // Invert scale (5 becomes 1, 1 becomes 5)
  }
  
  // Calculate average fitness level if we have data
  if (factorsCount > 0) {
    const avgFitness = fitnessScore / factorsCount;
    
    // Determine fitness level category
    let fitnessLevel = 'average';
    if (avgFitness >= 3.5) fitnessLevel = 'advanced';
    else if (avgFitness >= 2.5) fitnessLevel = 'intermediate';
    else fitnessLevel = 'beginner';
    
    contextParams['estimatedFitnessLevel'] = fitnessLevel;
  }
  
  // Determine if plan should focus on consistency/habit building
  if (formData.selfAssessments.fallingBack !== null && formData.selfAssessments.fallingBack >= 3) {
    contextParams['focusOnConsistency'] = 'true';
  }
  
  return contextParams;
};
