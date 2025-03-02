import React from 'react';
import { motion } from 'framer-motion';
import {
  AgeSelectionStep,
  BodyTypeStep,
  GoalStep,
  FitnessGoalStep,
  DesiredBodyStep,
  ProblemAreasStep,
  BestShapeStep,
  WeightChangeStep,
  ActivitiesStep,
  ProgressGraphStep,
  HealthConcernsStep,
  WorkoutLocationStep,
  WorkoutIntensityStep,
  WorkoutFrequencyStep,
  WorkoutDurationStep,
  HormoneGraphStep,
  HeightInputStep,
  WeightInputStep,
  ExercisePreferencesStep,
  SugaryFoodsStep,
  WaterIntakeStep,
  TypicalDayStep,
  EnergyLevelsStep,
  SleepAmountStep,
  SelfAssessmentStep,
  PersonalInfoStep,
  StartCommitmentStep
} from "@/components/form-steps";
import { FormData } from '@/types/survey';

interface StepRendererProps {
  step: number;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  handleNext: () => void;
  animationDirection: string;
}

const StepRenderer: React.FC<StepRendererProps> = ({
  step,
  formData,
  setFormData,
  handleNext,
  animationDirection
}) => {
  const slideVariants = {
    enter: (direction: string) => ({
      x: direction === "next" ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: string) => ({
      x: direction === "next" ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  return (
    <motion.div
      key={step}
      custom={animationDirection}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
      className="w-full max-w-4xl mx-auto"
    >
      {step === 1 && (
        <AgeSelectionStep 
          selectedAge={formData.age}
          onSelect={(age) => setFormData({...formData, age})}
        />
      )}
      
      {step === 2 && (
        <BodyTypeStep 
          selectedType={formData.bodyType}
          onSelect={(bodyType) => setFormData({...formData, bodyType})}
        />
      )}
      
      {step === 3 && (
        <GoalStep 
          value={formData.goal} 
          onChange={(goal) => setFormData({...formData, goal})}
        />
      )}

      {step === 4 && (
        <FitnessGoalStep 
          selectedGoal={formData.fitnessGoal}
          onSelect={(fitnessGoal) => setFormData({...formData, fitnessGoal})}
        />
      )}

      {step === 5 && (
        <DesiredBodyStep 
          selectedBody={formData.desiredBody}
          onSelect={(desiredBody) => setFormData({...formData, desiredBody})}
        />
      )}

      {step === 6 && (
        <ProblemAreasStep 
          selectedAreas={formData.problemAreas}
          onSelectArea={(problemAreas) => setFormData({...formData, problemAreas})}
        />
      )}

      {step === 7 && (
        <BestShapeStep 
          selected={formData.bestShapeTime}
          onSelect={(bestShapeTime) => setFormData({...formData, bestShapeTime})}
        />
      )}

      {step === 8 && (
        <WeightChangeStep 
          selected={formData.weightChange}
          onSelect={(weightChange) => setFormData({...formData, weightChange})}
        />
      )}

      {step === 9 && (
        <ActivitiesStep 
          selectedActivities={formData.activities}
          onSelectActivities={(activities) => setFormData({...formData, activities})}
        />
      )}
      
      {step === 10 && (
        <ProgressGraphStep 
          goalValue={formData.goal}
        />
      )}
      
      {step === 11 && (
        <HealthConcernsStep 
          selectedConcerns={formData.healthConcerns}
          onSelectConcerns={(healthConcerns) => setFormData({...formData, healthConcerns})}
        />
      )}

      {step === 12 && (
        <WorkoutLocationStep
          selectedLocation={formData.workoutLocation}
          onSelect={(workoutLocation) => setFormData({...formData, workoutLocation})}
        />
      )}

      {step === 13 && (
        <WorkoutIntensityStep
          selectedIntensity={formData.workoutIntensity}
          onSelect={(workoutIntensity) => setFormData({...formData, workoutIntensity})}
        />
      )}
      
      {step === 14 && (
        <WorkoutFrequencyStep
          selected={formData.workoutFrequency}
          onSelect={(workoutFrequency) => setFormData({...formData, workoutFrequency})}
        />
      )}
      
      {step === 15 && (
        <WorkoutDurationStep
          selected={formData.workoutDuration}
          onSelect={(workoutDuration) => setFormData({...formData, workoutDuration})}
        />
      )}
      
      {step === 16 && (
        <HormoneGraphStep
          onNext={handleNext}
        />
      )}
      
      {step === 17 && (
        <HeightInputStep
          value={formData.height}
          onChange={(height) => setFormData({...formData, height})}
        />
      )}
      
      {step === 18 && (
        <WeightInputStep
          currentWeight={formData.currentWeight}
          targetWeight={formData.targetWeight}
          weightUnit={formData.weightUnit || "kg"}
          onWeightChange={({ currentWeight, targetWeight, weightUnit }) => 
            setFormData({...formData, currentWeight, targetWeight, weightUnit})}
        />
      )}
      
      {step === 19 && (
        <ExercisePreferencesStep
          preferences={formData.exercisePreferences || {}}
          onPreferenceChange={(exercisePreferences) => 
            setFormData({...formData, exercisePreferences})}
          onStepComplete={handleNext}
        />
      )}
      
      {step === 20 && (
        <SugaryFoodsStep
          selected={formData.sugaryFoods}
          onSelect={(sugaryFoods) => setFormData({...formData, sugaryFoods})}
        />
      )}
      
      {step === 21 && (
        <WaterIntakeStep
          value={formData.waterIntake}
          onChange={(waterIntake) => setFormData({...formData, waterIntake})}
        />
      )}
      
      {step === 22 && (
        <TypicalDayStep
          selected={formData.typicalDay}
          onSelect={(typicalDay) => setFormData({...formData, typicalDay})}
        />
      )}
      
      {step === 23 && (
        <EnergyLevelsStep
          value={formData.energyLevels}
          onChange={(energyLevels) => setFormData({...formData, energyLevels})}
        />
      )}
      
      {step === 24 && (
        <SleepAmountStep
          value={formData.sleepAmount}
          onChange={(sleepAmount) => setFormData({...formData, sleepAmount})}
        />
      )}
      
      {step === 25 && (
        <SelfAssessmentStep 
          assessmentKey="outOfBreath"
          question="I am often out of breath when I climb the stairs"
          value={formData.selfAssessments.outOfBreath}
          onChange={(value) => setFormData({
            ...formData, 
            selfAssessments: {...formData.selfAssessments, outOfBreath: value}
          })}
        />
      )}
      
      {step === 26 && (
        <SelfAssessmentStep 
          assessmentKey="fallingBack"
          question="I keep falling back into bad exercise habits"
          value={formData.selfAssessments.fallingBack}
          onChange={(value) => setFormData({
            ...formData, 
            selfAssessments: {...formData.selfAssessments, fallingBack: value}
          })}
        />
      )}
      
      {step === 27 && (
        <SelfAssessmentStep 
          assessmentKey="motivationLevel"
          question="I find it hard to stay motivated with exercise"
          value={formData.selfAssessments.motivationLevel}
          onChange={(value) => setFormData({
            ...formData, 
            selfAssessments: {...formData.selfAssessments, motivationLevel: value}
          })}
        />
      )}
      
      {step === 28 && (
        <PersonalInfoStep
          name={formData.personalInfo.name}
          dob={formData.personalInfo.dob}
          email={formData.personalInfo.email}
          emailConsent={formData.personalInfo.emailConsent}
          onChangeName={(name) => setFormData({
            ...formData,
            personalInfo: {...formData.personalInfo, name}
          })}
          onChangeDob={(dob) => setFormData({
            ...formData,
            personalInfo: {...formData.personalInfo, dob}
          })}
          onChangeEmail={(email) => setFormData({
            ...formData,
            personalInfo: {...formData.personalInfo, email}
          })}
          onChangeConsent={(emailConsent) => setFormData({
            ...formData,
            personalInfo: {...formData.personalInfo, emailConsent}
          })}
        />
      )}
      
      {step === 29 && (
        <StartCommitmentStep
          value={formData.startCommitment}
          onChange={(startCommitment) => setFormData({...formData, startCommitment})}
        />
      )}
    </motion.div>
  );
};

export default StepRenderer;
