import { FormData } from "@/types/survey";
import { toast as toastFunction } from "@/components/ui/use-toast";

export const validateStep = (
  step: number,
  formData: FormData,
  toast = toastFunction
): boolean => {
  if (step === 1 && !formData.age) {
    toast({
      title: "Selection required",
      description: "Please select your age group to continue",
      variant: "destructive",
    });
    return false;
  }
  
  if (step === 2 && !formData.bodyType) {
    toast({
      title: "Selection required",
      description: "Please select your body type to continue",
      variant: "destructive",
    });
    return false;
  }
  
  if (step === 4 && !formData.fitnessGoal) {
    toast({
      title: "Selection required",
      description: "Please select your fitness goal to continue",
      variant: "destructive",
    });
    return false;
  }
  
  if (step === 5 && !formData.desiredBody) {
    toast({
      title: "Selection required",
      description: "Please select your desired body to continue",
      variant: "destructive",
    });
    return false;
  }
  
  if (step === 7 && !formData.bestShapeTime) {
    toast({
      title: "Selection required",
      description: "Please select when you were in your best shape to continue",
      variant: "destructive",
    });
    return false;
  }
  
  if (step === 8 && !formData.weightChange) {
    toast({
      title: "Selection required",
      description: "Please select how your weight typically changes to continue",
      variant: "destructive",
    });
    return false;
  }
  
  if (step === 9 && formData.activities.length === 0) {
    toast({
      title: "Selection required",
      description: "Please select at least one activity or 'None of the above' to continue",
      variant: "destructive",
    });
    return false;
  }
  
  if (step === 11 && formData.healthConcerns.length === 0) {
    toast({
      title: "Selection required",
      description: "Please select a health concern or 'None of the above' to continue",
      variant: "destructive",
    });
    return false;
  }
  
  if (step === 12 && !formData.workoutLocation) {
    toast({
      title: "Selection required",
      description: "Please select where you will be working out to continue",
      variant: "destructive",
    });
    return false;
  }
  
  if (step === 13 && !formData.workoutIntensity) {
    toast({
      title: "Selection required",
      description: "Please select your preferred workout intensity to continue",
      variant: "destructive",
    });
    return false;
  }
  
  if (step === 14 && !formData.workoutFrequency) {
    toast({
      title: "Selection required",
      description: "Please select how often you've worked out to continue",
      variant: "destructive",
    });
    return false;
  }
  
  if (step === 15 && !formData.workoutDuration) {
    toast({
      title: "Selection required",
      description: "Please select your preferred workout duration to continue",
      variant: "destructive",
    });
    return false;
  }
  
  if (step === 17 && !formData.height) {
    toast({
      title: "Selection required",
      description: "Please enter your height to continue",
      variant: "destructive",
    });
    return false;
  }
  
  if (step === 18 && (!formData.currentWeight || !formData.targetWeight)) {
    toast({
      title: "Required fields",
      description: "Please enter both your current and target weight",
      variant: "destructive",
    });
    return false;
  }
  
  if (step === 19) {
    return true;
  }
  
  if (step === 20 && !formData.sugaryFoods) {
    toast({
      title: "Selection required",
      description: "Please select how often you consume sugary foods or beverages",
      variant: "destructive",
    });
    return false;
  }
  
  if (step === 22 && !formData.typicalDay) {
    toast({
      title: "Selection required",
      description: "Please select how you would describe your typical day",
      variant: "destructive",
    });
    return false;
  }
  
  if (step === 23 && !formData.energyLevels) {
    toast({
      title: "Selection required",
      description: "Please rate your average energy levels during the day",
      variant: "destructive",
    });
    return false;
  }
  
  if (step === 24 && formData.sleepAmount === null) {
    toast({
      title: "Sleep amount required",
      description: "Please indicate how much sleep you usually get",
      variant: "destructive",
    });
    return false;
  }
  
  if (step >= 25 && step <= 27) {
    const assessmentKeys = ['outOfBreath', 'fallingBack', 'suitableWorkouts', 'motivationLevel', 'dietConsistency'];
    const currentKey = assessmentKeys[step - 25];
    
    if (currentKey && !formData.selfAssessments[currentKey as keyof typeof formData.selfAssessments]) {
      toast({
        title: "Selection required",
        description: "Please rate how much you relate to the statement",
        variant: "destructive",
      });
      return false;
    }
  }
  
  if (step === 28) {
    if (!formData.personalInfo.name) {
      toast({
        title: "Name required",
        description: "Please enter your name to continue",
        variant: "destructive",
      });
      return false;
    }
    
    if (!formData.personalInfo.dob) {
      toast({
        title: "Date of birth required",
        description: "Please enter your date of birth to continue",
        variant: "destructive",
      });
      return false;
    }
    
    const today = new Date();
    const birthDate = new Date(formData.personalInfo.dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    if (age < 10 || age > 80) {
      toast({
        title: "Invalid age",
        description: "Your age must be between 10 and 80 years",
        variant: "destructive",
      });
      return false;
    }
    
    if (!formData.personalInfo.email) {
      toast({
        title: "Email required",
        description: "Please enter your email address to continue",
        variant: "destructive",
      });
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.personalInfo.email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return false;
    }
  }
  
  if (step === 29 && !formData.startCommitment) {
    toast({
      title: "Selection required",
      description: "Please select when you plan to start your fitness journey",
      variant: "destructive",
    });
    return false;
  }
  
  return true;
};
