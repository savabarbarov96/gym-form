
import { FormData } from "@/types/survey";

// Define the webhook URL as a constant
const WEBHOOK_URL = "https://sava.automationaid.eu/webhook/8ffb7f1e-6c6f-412c-8022-eef6957d78d4";

// Function to map form data to API parameters with enhanced context
const mapFormDataToParams = (formData: FormData): Record<string, string> => {
  const params: Record<string, string> = {};
  
  // Basic Information with clear context
  if (formData.gender) params['gender'] = formData.gender;
  if (formData.age) params['age'] = formData.age;
  if (formData.bodyType) params['bodyType'] = formData.bodyType;
  params['targetBodyFatPercentage'] = formData.goal.toString();
  params['currentBodyFatPercentage'] = formData.currentBodyFat.toString();
  if (formData.fitnessGoal) params['primaryFitnessGoal'] = formData.fitnessGoal;
  if (formData.desiredBody) params['desiredBodyType'] = formData.desiredBody;
  
  // Body Assessment with measurement units
  if (formData.problemAreas.length > 0) params['focusAreas'] = formData.problemAreas.join(',');
  if (formData.bestShapeTime) params['lastBestShape'] = formData.bestShapeTime;
  if (formData.weightChange) params['weightFluctuationPattern'] = formData.weightChange;
  if (formData.activities.length > 0) params['currentPhysicalActivities'] = formData.activities.join(',');
  if (formData.customActivity) params['customActivity'] = formData.customActivity;
  if (formData.healthConcerns.length > 0) params['healthLimitations'] = formData.healthConcerns.join(',');
  if (formData.customHealthConcern) params['customHealthConcern'] = formData.customHealthConcern;
  
  // Workout Preferences with detailed descriptions
  if (formData.workoutLocation) params['preferredWorkoutLocation'] = formData.workoutLocation;
  if (formData.workoutIntensity) params['preferredIntensityLevel'] = formData.workoutIntensity;
  if (formData.workoutFrequency) params['weeklyWorkoutFrequency'] = formData.workoutFrequency;
  if (formData.workoutDuration) params['workoutSessionDuration'] = formData.workoutDuration;
  
  // Body Measurements with units
  if (formData.height) params['heightWithUnit'] = formData.height;
  if (formData.currentWeight) params['currentWeightValue'] = formData.currentWeight;
  if (formData.targetWeight) params['targetWeightValue'] = formData.targetWeight;
  params['weightMeasurementUnit'] = formData.weightUnit;
  
  // Exercise Preferences with clear preference scale
  for (const [exercise, preference] of Object.entries(formData.exercisePreferences)) {
    if (preference) {
      params[`exercise_${exercise.replace(/\s+/g, '_')}`] = preference;
      // Add context for preference scale
      if (Object.keys(formData.exercisePreferences).length > 0 && !params['exercisePreferenceScale']) {
        params['exercisePreferenceScale'] = 'like/neutral/dislike scale';
      }
    }
  }
  
  // Lifestyle Information with measurement units and scales
  if (formData.sugaryFoods) params['sugaryFoodsConsumptionFrequency'] = formData.sugaryFoods;
  if (formData.waterIntake) {
    params['dailyWaterIntake_ml'] = formData.waterIntake.toString();
    params['waterIntakeUnit'] = 'milliliters';
  }
  if (formData.typicalDay) params['dailyActivityLevel'] = formData.typicalDay;
  if (formData.energyLevels !== null) {
    params['energyLevelRating'] = formData.energyLevels.toString();
    params['energyLevelScale'] = '1-5 scale (1=lowest, 5=highest)';
  }
  if (formData.sleepAmount !== null) {
    params['averageSleepHours'] = formData.sleepAmount.toString();
    params['sleepMeasurementUnit'] = 'hours per night';
  }
  
  // Self Assessments with scale context
  if (formData.selfAssessments.outOfBreath !== null) {
    params['assessment_outOfBreath'] = formData.selfAssessments.outOfBreath.toString();
    params['outOfBreathScale'] = '1-5 agreement scale (1=strongly disagree, 5=strongly agree)';
  }
  if (formData.selfAssessments.fallingBack !== null) {
    params['assessment_stayingConsistent'] = formData.selfAssessments.fallingBack.toString();
    params['consistencyScale'] = '1-5 agreement scale (1=strongly disagree, 5=strongly agree)';
  }
  if (formData.selfAssessments.motivationLevel !== null) {
    params['assessment_motivationStruggle'] = formData.selfAssessments.motivationLevel.toString();
    params['motivationScale'] = '1-5 agreement scale (1=strongly disagree, 5=strongly agree)';
  }
  if (formData.selfAssessments.dietConsistency !== null) {
    params['assessment_dietConsistency'] = formData.selfAssessments.dietConsistency.toString();
    params['dietConsistencyScale'] = '1-5 agreement scale (1=strongly disagree, 5=strongly agree)';
  }
  
  // Personal Information
  if (formData.personalInfo.name) params['fullName'] = formData.personalInfo.name;
  if (formData.personalInfo.dob) params['dateOfBirth'] = formData.personalInfo.dob;
  if (formData.personalInfo.email) params['emailAddress'] = formData.personalInfo.email;
  params['marketingConsent'] = formData.personalInfo.emailConsent.toString();
  
  // Commitment Information
  if (formData.startCommitment) params['programStartCommitment'] = formData.startCommitment;
  
  return params;
};

// Function to generate contextual parameters with detailed explanations
const generateContextualParameters = (formData: FormData): Record<string, string> => {
  const contextParams: Record<string, string> = {};
  
  // Calculate BMI with classification
  if (formData.height && formData.currentWeight) {
    try {
      const heightInM = parseFloat(formData.height) / 100; // assuming height is in cm
      const weightInKg = formData.weightUnit === 'kg' 
        ? parseFloat(formData.currentWeight)
        : parseFloat(formData.currentWeight) * 0.453592; // convert lbs to kg
      
      if (!isNaN(heightInM) && !isNaN(weightInKg) && heightInM > 0) {
        const bmi = weightInKg / (heightInM * heightInM);
        contextParams['calculatedBMI'] = bmi.toFixed(1);
        
        // Add BMI classification for context
        if (bmi < 18.5) contextParams['bmiClassification'] = 'underweight';
        else if (bmi < 25) contextParams['bmiClassification'] = 'normal weight';
        else if (bmi < 30) contextParams['bmiClassification'] = 'overweight';
        else contextParams['bmiClassification'] = 'obese';
      }
    } catch (e) {
      // Silently fail if calculation isn't possible
    }
  }
  
  // Weight loss/gain goal with detailed metrics
  if (formData.currentWeight && formData.targetWeight) {
    try {
      const current = parseFloat(formData.currentWeight);
      const target = parseFloat(formData.targetWeight);
      if (!isNaN(current) && !isNaN(target)) {
        const difference = target - current;
        contextParams['weightChangeGoal'] = difference.toString();
        contextParams['weightChangeDirection'] = difference > 0 ? 'gain' : difference < 0 ? 'loss' : 'maintain';
        contextParams['weightChangeAmount'] = Math.abs(difference).toFixed(1);
        contextParams['weightChangeUnit'] = formData.weightUnit;
        
        // Calculate percentage change for context
        const percentChange = (Math.abs(difference) / current) * 100;
        contextParams['percentBodyWeightChange'] = percentChange.toFixed(1) + '%';
        
        // Categorize the magnitude of change
        if (percentChange < 5) contextParams['changeCategory'] = 'modest';
        else if (percentChange < 10) contextParams['changeCategory'] = 'moderate';
        else if (percentChange < 20) contextParams['changeCategory'] = 'significant';
        else contextParams['changeCategory'] = 'substantial';
      }
    } catch (e) {
      // Silently fail if calculation isn't possible
    }
  }
  
  // Assess overall fitness level with detailed scoring
  let fitnessScore = 0;
  let factorsCount = 0;
  
  // Consider workout frequency with numerical mapping
  if (formData.workoutFrequency) {
    factorsCount++;
    if (formData.workoutFrequency === 'none') {
      fitnessScore += 1;
      contextParams['workoutFrequencyScore'] = '1/4';
    }
    else if (formData.workoutFrequency === '1-2-times') {
      fitnessScore += 2;
      contextParams['workoutFrequencyScore'] = '2/4';
    }
    else if (formData.workoutFrequency === '3-times') {
      fitnessScore += 3;
      contextParams['workoutFrequencyScore'] = '3/4';
    }
    else if (formData.workoutFrequency === 'more-than-3') {
      fitnessScore += 4;
      contextParams['workoutFrequencyScore'] = '4/4';
    }
  }
  
  // Consider energy levels with scale information
  if (formData.energyLevels !== null) {
    factorsCount++;
    fitnessScore += formData.energyLevels;
    contextParams['energyLevelScore'] = `${formData.energyLevels}/5`;
  }
  
  // Consider out of breath assessment with scale inversion explanation
  if (formData.selfAssessments.outOfBreath !== null) {
    factorsCount++;
    const invertedScore = 6 - formData.selfAssessments.outOfBreath; // Invert scale (5 becomes 1, 1 becomes 5)
    fitnessScore += invertedScore;
    contextParams['breathingCapacityScore'] = `${invertedScore}/5`;
    contextParams['breathingCapacityNote'] = 'Inverted from original scale where 1=good capacity, 5=poor capacity';
  }
  
  // Calculate average fitness level if we have data
  if (factorsCount > 0) {
    const avgFitness = fitnessScore / factorsCount;
    contextParams['fitnessScoreAverage'] = avgFitness.toFixed(1);
    
    // Determine fitness level category with score ranges
    let fitnessLevel = 'average';
    if (avgFitness >= 3.5) {
      fitnessLevel = 'advanced';
      contextParams['fitnessScoreRange'] = '3.5-5.0';
    }
    else if (avgFitness >= 2.5) {
      fitnessLevel = 'intermediate';
      contextParams['fitnessScoreRange'] = '2.5-3.4';
    }
    else {
      fitnessLevel = 'beginner';
      contextParams['fitnessScoreRange'] = '1.0-2.4';
    }
    
    contextParams['estimatedFitnessLevel'] = fitnessLevel;
  }
  
  // Determine if plan should focus on consistency/habit building with threshold explanation
  if (formData.selfAssessments.fallingBack !== null) {
    contextParams['consistencyRating'] = formData.selfAssessments.fallingBack.toString();
    if (formData.selfAssessments.fallingBack >= 3) {
      contextParams['focusOnConsistency'] = 'true';
      contextParams['consistencyThreshold'] = 'Rating ≥3 indicates consistency challenges';
    } else {
      contextParams['focusOnConsistency'] = 'false';
      contextParams['consistencyThreshold'] = 'Rating <3 indicates adequate consistency';
    }
  }
  
  // Add context for age implications
  if (formData.age) {
    if (formData.age === 'under-30') {
      contextParams['ageImplication'] = 'Typically capable of higher intensity and faster recovery';
    } else if (formData.age === '30-39') {
      contextParams['ageImplication'] = 'Balanced capacity for intensity with moderately quick recovery';
    } else if (formData.age === '40-49') {
      contextParams['ageImplication'] = 'Moderate intensity with increased recovery needs';
    } else if (formData.age === '50-59') {
      contextParams['ageImplication'] = 'Lower intensity with focus on proper form and longer recovery';
    } else if (formData.age === '60-plus') {
      contextParams['ageImplication'] = 'Focus on mobility, balance, and gradual progression';
    }
  }
  
  // Add lifestyle factors summary
  let lifestyleFactors = [];
  if (formData.sleepAmount !== null) {
    if (formData.sleepAmount < 6) lifestyleFactors.push('sleep deficit');
    else if (formData.sleepAmount >= 8) lifestyleFactors.push('adequate sleep');
  }
  
  if (formData.waterIntake !== null) {
    if (formData.waterIntake < 1500) lifestyleFactors.push('suboptimal hydration');
    else if (formData.waterIntake >= 2500) lifestyleFactors.push('good hydration');
  }
  
  if (formData.typicalDay) {
    if (formData.typicalDay === 'sitting') lifestyleFactors.push('sedentary daily activity');
    else if (formData.typicalDay === 'active') lifestyleFactors.push('active lifestyle');
  }
  
  if (formData.sugaryFoods) {
    if (formData.sugaryFoods === 'daily' || formData.sugaryFoods === 'multiple_daily') {
      lifestyleFactors.push('high sugar consumption');
    } else if (formData.sugaryFoods === 'rarely' || formData.sugaryFoods === 'never') {
      lifestyleFactors.push('low sugar consumption');
    }
  }
  
  if (lifestyleFactors.length > 0) {
    contextParams['lifestyleFactorsSummary'] = lifestyleFactors.join(', ');
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
