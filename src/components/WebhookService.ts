import { FormData } from "@/types/survey";

// Define the webhook URL as a constant
const WEBHOOK_URL = "https://sava.automationaid.eu/webhook/8ffb7f1e-6c6f-412c-8022-eef6957d78d4";

// Format date to ISO string with readable format for AI
const formatDate = (dateString: string | null): string | null => {
  if (!dateString) return null;
  try {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  } catch (e) {
    return dateString;
  }
};

// Convert 1-5 scales to meaningful text descriptions for AI
const getRatingDescription = (rating: number | null, type: 'agreement' | 'intensity' = 'agreement'): string | null => {
  if (rating === null) return null;
  
  if (type === 'agreement') {
    switch(rating) {
      case 1: return "Not at all";
      case 2: return "Slightly";
      case 3: return "Moderately";
      case 4: return "Very much";
      case 5: return "Extremely";
      default: return `${rating}/5`;
    }
  } else {
    switch(rating) {
      case 1: return "Very Low";
      case 2: return "Low";
      case 3: return "Medium";
      case 4: return "High";
      case 5: return "Very High";
      default: return `${rating}/5`;
    }
  }
};

// Function to create an AI-optimized JSON payload with rich context
const createAIOptimizedPayload = (formData: FormData): Record<string, any> => {
  // Calculate additional metrics for context
  const calculateBMI = (): number | null => {
    if (!formData.height || !formData.currentWeight) return null;
    
    try {
      const heightInM = parseFloat(formData.height) / 100; // assuming height is in cm
      const weightInKg = formData.weightUnit === 'kg' 
        ? parseFloat(formData.currentWeight)
        : parseFloat(formData.currentWeight) * 0.453592; // convert lbs to kg
      
      if (isNaN(heightInM) || isNaN(weightInKg) || heightInM <= 0) return null;
      
      return Number((weightInKg / (heightInM * heightInM)).toFixed(1));
    } catch (e) {
      return null;
    }
  };
  
  const getBMICategory = (bmi: number | null): string | null => {
    if (bmi === null) return null;
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal weight";
    if (bmi < 30) return "Overweight";
    return "Obese";
  };
  
  const calculateWeightChangeGoal = (): { 
    direction: string | null,
    amount: number | null,
    percentChange: number | null,
    changeCategory: string | null
  } => {
    const result = { 
      direction: null,
      amount: null,
      percentChange: null,
      changeCategory: null
    };
    
    if (!formData.currentWeight || !formData.targetWeight) return result;
    
    try {
      const current = parseFloat(formData.currentWeight);
      const target = parseFloat(formData.targetWeight);
      
      if (isNaN(current) || isNaN(target)) return result;
      
      const difference = target - current;
      result.direction = difference > 0 ? 'gain' : difference < 0 ? 'loss' : 'maintain';
      result.amount = Number(Math.abs(difference).toFixed(1));
      
      // Calculate percentage change
      const percentChange = (Math.abs(difference) / current) * 100;
      result.percentChange = Number(percentChange.toFixed(1));
      
      // Categorize the magnitude of change
      if (percentChange < 5) result.changeCategory = 'modest';
      else if (percentChange < 10) result.changeCategory = 'moderate';
      else if (percentChange < 20) result.changeCategory = 'significant';
      else result.changeCategory = 'substantial';
      
      return result;
    } catch (e) {
      return result;
    }
  };
  
  // Calculate fitness score based on multiple factors
  const calculateFitnessLevel = (): {
    fitnessScore: number | null,
    fitnessLevel: string | null,
    factorsConsidered: string[]
  } => {
    let fitnessScore = 0;
    let factorsCount = 0;
    const factorsConsidered: string[] = [];
    
    // Consider workout frequency
    if (formData.workoutFrequency) {
      factorsCount++;
      factorsConsidered.push("workout frequency");
      
      if (formData.workoutFrequency === 'none') {
        fitnessScore += 1;
      }
      else if (formData.workoutFrequency === '1-2-times') {
        fitnessScore += 2;
      }
      else if (formData.workoutFrequency === '3-times') {
        fitnessScore += 3;
      }
      else if (formData.workoutFrequency === 'more-than-3') {
        fitnessScore += 4;
      }
    }
    
    // Consider energy levels
    if (formData.energyLevels !== null) {
      factorsCount++;
      factorsConsidered.push("energy levels");
      fitnessScore += formData.energyLevels;
    }
    
    // Consider out of breath assessment (inverted)
    if (formData.selfAssessments.outOfBreath !== null) {
      factorsCount++;
      factorsConsidered.push("breathing capacity (stairs)");
      const invertedScore = 6 - formData.selfAssessments.outOfBreath;
      fitnessScore += invertedScore;
    }
    
    if (factorsCount === 0) {
      return {
        fitnessScore: null,
        fitnessLevel: null,
        factorsConsidered: []
      };
    }
    
    const avgFitness = fitnessScore / factorsCount;
    
    // Determine fitness level category
    let fitnessLevel = 'average';
    if (avgFitness >= 3.5) {
      fitnessLevel = 'advanced';
    }
    else if (avgFitness >= 2.5) {
      fitnessLevel = 'intermediate';
    }
    else {
      fitnessLevel = 'beginner';
    }
    
    return {
      fitnessScore: Number(avgFitness.toFixed(1)),
      fitnessLevel,
      factorsConsidered
    };
  };
  
  // Map age ranges to approximate numerical values for easier AI processing
  const getAgeRangeValue = (ageRange: string | null): { min: number, max: number } | null => {
    if (!ageRange) return null;
    
    switch (ageRange) {
      case 'under-30': return { min: 18, max: 29 };
      case '30-45': return { min: 30, max: 45 };
      case '46-60': return { min: 46, max: 60 };
      case 'over-60': return { min: 61, max: 85 };
      default: return null;
    }
  };
  
  // Get workout frequency in times per week
  const getWorkoutFrequencyValue = (frequency: string | null): number | null => {
    if (!frequency) return null;
    
    switch (frequency) {
      case 'none': return 0;
      case '1-2-times': return 1.5; // average of 1-2
      case '3-times': return 3;
      case 'more-than-3': return 4.5; // average estimation
      default: return null;
    }
  };
  
  // Get workout duration in minutes
  const getWorkoutDurationValue = (duration: string | null): number | null => {
    if (!duration) return null;
    
    switch (duration) {
      case 'short': return 20; // ~20 mins
      case 'medium': return 40; // ~40 mins
      case 'long': return 60; // ~60 mins
      default: return null;
    }
  };
  
  // Convert sugary foods frequency to times per week for numerical context
  const getSugaryFoodsFrequencyValue = (frequency: string | null): number | null => {
    if (!frequency) return null;
    
    switch (frequency) {
      case 'never': return 0;
      case 'rarely': return 1;
      case 'weekly': return 3;
      case 'daily': return 7;
      case 'multiple-daily': return 14;
      default: return null;
    }
  };
  
  // Calculate the BMI and other derived metrics
  const bmi = calculateBMI();
  const bmiCategory = getBMICategory(bmi);
  const weightChangeGoal = calculateWeightChangeGoal();
  const fitnessAssessment = calculateFitnessLevel();
  const ageRange = getAgeRangeValue(formData.age);
  
  // Create the AI-optimized payload with rich context and nested structure
  return {
    metadata: {
      version: "2.0",
      timestamp: new Date().toISOString(),
      formType: "Gym Assessment",
      purpose: "Generate personalized workout and nutrition plan"
    },
    
    // Demographics section with basic user information
    demographics: {
      gender: formData.gender,
      ageGroup: formData.age,
      ageRange: ageRange ? `${ageRange.min}-${ageRange.max} years` : null,
      name: formData.personalInfo.name,
      dateOfBirth: formatDate(formData.personalInfo.dob),
      email: formData.personalInfo.email,
      marketingConsent: formData.personalInfo.emailConsent
    },
    
    // Body metrics and goals section
    bodyProfile: {
      currentMetrics: {
        height: formData.height ? `${formData.height} cm` : null,
        currentWeight: formData.currentWeight ? `${formData.currentWeight} ${formData.weightUnit}` : null,
        currentBodyFatPercentage: formData.currentBodyFat,
        bmi: bmi,
        bmiCategory: bmiCategory
      },
      bodyType: formData.bodyType,
      goalMetrics: {
        targetWeight: formData.targetWeight ? `${formData.targetWeight} ${formData.weightUnit}` : null,
        targetBodyFatPercentage: formData.goal,
        weightChangeDirection: weightChangeGoal.direction,
        weightChangeAmount: weightChangeGoal.amount ? `${weightChangeGoal.amount} ${formData.weightUnit}` : null,
        weightChangePercentage: weightChangeGoal.percentChange ? `${weightChangeGoal.percentChange}%` : null,
        weightChangeMagnitude: weightChangeGoal.changeCategory
      },
      desiredPhysique: formData.desiredBody,
      primaryFitnessGoal: formData.fitnessGoal,
      problemAreas: formData.problemAreas,
      bestShapeTimeframe: formData.bestShapeTime,
      weightChangeHistory: formData.weightChange
    },
    
    // Health considerations
    healthStatus: {
      physicalLimitations: formData.healthConcerns,
      customHealthConcern: formData.customHealthConcern,
      allergies: formData.allergies,
      customAllergy: formData.customAllergy,
      estimatedFitnessLevel: fitnessAssessment.fitnessLevel,
      fitnessScore: fitnessAssessment.fitnessScore,
      fitnessAssessmentFactors: fitnessAssessment.factorsConsidered
    },
    
    // Current activities and workout preferences
    activityProfile: {
      currentActivities: {
        activities: formData.activities,
        customActivity: formData.customActivity,
        typicalDailyActivity: formData.typicalDay,
        energyLevels: formData.energyLevels,
        energyLevelDescription: getRatingDescription(formData.energyLevels, 'intensity')
      },
      workoutPreferences: {
        preferredLocation: formData.workoutLocation,
        preferredIntensity: formData.workoutIntensity,
        weeklyFrequency: formData.workoutFrequency,
        frequencyValue: getWorkoutFrequencyValue(formData.workoutFrequency),
        sessionDuration: formData.workoutDuration,
        durationInMinutes: getWorkoutDurationValue(formData.workoutDuration),
        exercisePreferences: Object.entries(formData.exercisePreferences).map(([exercise, preference]) => ({
          exerciseName: exercise,
          preference: preference
        })).filter(item => item.preference !== null)
      }
    },
    
    // Lifestyle and self-assessment
    lifestyle: {
      nutrition: {
        sugaryFoodsConsumption: formData.sugaryFoods,
        sugaryFoodsFrequencyPerWeek: getSugaryFoodsFrequencyValue(formData.sugaryFoods),
        waterIntakeMilliliters: formData.waterIntake,
        waterIntakeLiters: formData.waterIntake ? (formData.waterIntake / 1000).toFixed(1) : null,
        traditionalFoods: formData.traditionalFoods,
        customTraditionalFood: formData.customTraditionalFood
      },
      sleep: {
        averageHoursPerNight: formData.sleepAmount
      }
    },
    
    // Self-assessments with detailed descriptions of what each means
    selfAssessments: {
      breathingDifficulty: {
        statement: "I am often out of breath when I climb the stairs",
        rating: formData.selfAssessments.outOfBreath,
        description: getRatingDescription(formData.selfAssessments.outOfBreath)
      },
      exerciseConsistency: {
        statement: "I keep falling back into bad exercise habits",
        rating: formData.selfAssessments.fallingBack,
        description: getRatingDescription(formData.selfAssessments.fallingBack),
        needsConsistencyFocus: formData.selfAssessments.fallingBack !== null ? 
          formData.selfAssessments.fallingBack >= 3 : null
      },
      workoutSuitability: {
        statement: "I struggle to find workouts suitable for my fitness level",
        rating: formData.selfAssessments.suitableWorkouts,
        description: getRatingDescription(formData.selfAssessments.suitableWorkouts)
      },
      motivation: {
        statement: "I find it hard to stay motivated with exercise",
        rating: formData.selfAssessments.motivationLevel,
        description: getRatingDescription(formData.selfAssessments.motivationLevel)
      },
      dietConsistency: {
        statement: "I have trouble maintaining a consistent diet",
        rating: formData.selfAssessments.dietConsistency,
        description: getRatingDescription(formData.selfAssessments.dietConsistency)
      }
    },
    
    // Program timing information
    programTiming: {
      startCommitment: formData.startCommitment,
      isReadyToStartImmediately: formData.startCommitment === 'immediately'
    },
    
    // Raw form data for reference (in case AI needs to access original values)
    rawFormData: formData
  };
};

// Function to submit the optimized payload to the webhook
export const submitToWebhook = async (formData: FormData): Promise<boolean> => {
  try {
    // Create the AI-optimized payload
    const aiOptimizedPayload = createAIOptimizedPayload(formData);
    
    // Post the optimized payload to the webhook
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(aiOptimizedPayload),
    });
    
    if (!response.ok) {
      console.error(`Webhook submission failed with status: ${response.status}`);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error submitting to webhook:', error);
    return false;
  }
};
