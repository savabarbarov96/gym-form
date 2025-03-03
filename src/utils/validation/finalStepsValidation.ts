
import { FormData } from "@/types/survey";
import { toast as toastFunction } from "@/components/ui/use-toast";

export const validateFinalStepsStep = (
  step: number,
  formData: FormData,
  toast = toastFunction
): boolean => {
  if (step >= 25 && step <= 28) {
    const assessmentKeys = ['outOfBreath', 'fallingBack', 'motivationLevel', 'dietConsistency'];
    const currentKey = assessmentKeys[step - 25];
    
    if (currentKey && formData.selfAssessments[currentKey as keyof typeof formData.selfAssessments] === null) {
      toast({
        title: "Selection required",
        description: "Please rate how much you relate to the statement",
        variant: "destructive",
      });
      return false;
    }
  }
  
  if (step === 29) {
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
  
  return true;
};
