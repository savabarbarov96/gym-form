
export type AppState = "form" | "loading" | "results";

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
  workoutFrequency: string | null;
  workoutDuration: string | null;
  height: string | null;
  currentWeight: string | null;
  targetWeight: string | null;
  weightUnit: "kg" | "lbs";
  exercisePreferences: {
    [key: string]: "like" | "neutral" | "dislike" | null;
  };
  sugaryFoods: string | null;
  waterIntake: number | null;
  typicalDay: string | null;
  energyLevels: number | null;
  sleepAmount: number | null;
  selfAssessments: {
    outOfBreath: number | null;
    fallingBack: number | null;
    suitableWorkouts: number | null;
    motivationLevel: number | null;
    dietConsistency: number | null;
  };
  personalInfo: {
    name: string | null;
    dob: string | null;
    email: string | null;
    emailConsent: boolean;
  };
  startCommitment: string | null;
}

export interface SurveyContextType {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  animationDirection: string;
  setAnimationDirection: React.Dispatch<React.SetStateAction<string>>;
  loadingProgress: number;
  setLoadingProgress: React.Dispatch<React.SetStateAction<number>>;
  handleNext: () => void;
  handleBack: () => void;
  handleGetPlan: () => void;
  simulateLoading: () => void;
  totalSteps: number;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  generateQuote: (name: string) => string;
}
