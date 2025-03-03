
import { FormData } from "@/types/survey";

// Define the webhook URL as a constant
const WEBHOOK_URL = "https://sava.automationaid.eu/webhook/8ffb7f1e-6c6f-412c-8022-eef6957d78d4";

// Function to map form data to API parameters
const mapFormDataToParams = (formData: FormData): Record<string, string> => {
  const params: Record<string, string> = {};
  
  // Basic Information
  if (formData.age) params['age'] = formData.age;
  if (formData.bodyType) params['bodyType'] = formData.bodyType;
  params['motivationLevel'] = formData.goal.toString();
  if (formData.fitnessGoal) params['fitnessGoal'] = formData.fitnessGoal;
  if (formData.desiredBody) params['desiredBody'] = formData.desiredBody;
  
  // Body Assessment
  if (formData.problemAreas.length > 0) params['problemAreas'] = formData.problemAreas.join(',');
  if (formData.bestShapeTime) params['bestShapeTime'] = formData.bestShapeTime;
  if (formData.weightChange) params['weightChangeTrend'] = formData.weightChange;
  if (formData.activities.length > 0) params['currentActivities'] = formData.activities.join(',');
  if (formData.healthConcerns.length > 0) params['healthConcerns'] = formData.healthConcerns.join(',');
  
  // Workout Preferences
  if (formData.workoutLocation) params['workoutLocation'] = formData.workoutLocation;
  if (formData.workoutIntensity) params['workoutIntensity'] = formData.workoutIntensity;
  if (formData.workoutFrequency) params['workoutFrequency'] = formData.workoutFrequency;
  if (formData.workoutDuration) params['workoutDuration'] = formData.workoutDuration;
  
  // Body Measurements
  if (formData.height) params['height'] = formData.height;
  if (formData.currentWeight) params['currentWeight'] = formData.currentWeight;
  if (formData.targetWeight) params['targetWeight'] = formData.targetWeight;
  params['weightUnit'] = formData.weightUnit;
  
  // Exercise Preferences
  for (const [exercise, preference] of Object.entries(formData.exercisePreferences)) {
    if (preference) {
      params[`exercisePreference_${exercise.replace(/\s+/g, '_')}`] = preference;
    }
  }
  
  // Lifestyle Information
  if (formData.sugaryFoods) params['sugaryFoodsFrequency'] = formData.sugaryFoods;
  if (formData.waterIntake) params['dailyWaterIntake_ml'] = formData.waterIntake.toString();
  if (formData.typicalDay) params['activityLevel'] = formData.typicalDay;
  if (formData.energyLevels) params['energyLevels'] = formData.energyLevels.toString();
  if (formData.sleepAmount) params['sleepHours'] = formData.sleepAmount.toString();
  
  // Self Assessments
  if (formData.selfAssessments.outOfBreath !== null) 
    params['assessment_outOfBreath'] = formData.selfAssessments.outOfBreath.toString();
  if (formData.selfAssessments.fallingBack !== null) 
    params['assessment_stayingConsistent'] = formData.selfAssessments.fallingBack.toString();
  if (formData.selfAssessments.suitableWorkouts !== null) 
    params['assessment_findingSuitableWorkouts'] = formData.selfAssessments.suitableWorkouts.toString();
  if (formData.selfAssessments.motivationLevel !== null) 
    params['assessment_motivationStruggle'] = formData.selfAssessments.motivationLevel.toString();
  if (formData.selfAssessments.dietConsistency !== null) 
    params['assessment_dietConsistency'] = formData.selfAssessments.dietConsistency.toString();
  
  // Personal Information
  if (formData.personalInfo.name) params['name'] = formData.personalInfo.name;
  if (formData.personalInfo.dob) params['dateOfBirth'] = formData.personalInfo.dob;
  if (formData.personalInfo.email) params['email'] = formData.personalInfo.email;
  params['marketingConsent'] = formData.personalInfo.emailConsent.toString();
  
  // Commitment Information
  if (formData.startCommitment) params['startCommitment'] = formData.startCommitment;
  
  return params;
};

// Function to generate contextual parameters
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
  
  // Weight loss/gain goal
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
  
  // Assess overall fitness level
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

// Main function to submit data to the webhook
export const submitToWebhook = async (formData: FormData): Promise<boolean> => {
  try {
    // Get base parameters from form data
    const baseParams = mapFormDataToParams(formData);
    
    // Add contextual parameters
    const contextParams = generateContextualParameters(formData);
    
    // Combine all parameters
    const allParams = { ...baseParams, ...contextParams };
    
    // Convert to URLSearchParams
    const urlParams = new URLSearchParams();
    for (const [key, value] of Object.entries(allParams)) {
      urlParams.append(key, value);
    }
    
    // Build complete URL
    const webhookUrl = `${WEBHOOK_URL}?${urlParams.toString()}`;
    
    console.log("Submitting data to webhook:", allParams);
    
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
