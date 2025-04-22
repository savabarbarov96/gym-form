import React from 'react';
import { FormData } from '@/types/survey';
import {
  ProblemAreasStep,
  ActivitiesStep,
  WorkoutLocationStep,
  WorkoutIntensityStep,
  EquipmentAccessStep,
  WorkoutFrequencyStep,
  ExercisePreferencesStep,
  DesiredBodyStep
} from '@/components/form-steps';
import { useToast } from '@/hooks/use-toast';

interface WorkoutPreferencesStepRendererProps {
  step: number;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  handleNext: () => void;
}

const WorkoutPreferencesStepRenderer: React.FC<WorkoutPreferencesStepRendererProps> = ({
  step,
  formData,
  setFormData,
  handleNext
}) => {
  const { toast } = useToast();
  
  // This maps the global step number to the local step within this renderer
  // Adjusted for the Traditional Foods step (step 14)
  const localStep = step - 15;
  
  // Reduce excessive logging
  // console.log(`WorkoutPreferencesStepRenderer: Global Step ${step}, Local Step ${localStep}`);
  
  switch (localStep) {
    case 0: // Step 15
      return (
        <ProblemAreasStep
          selectedAreas={formData.problemAreas}
          onSelectArea={(problemAreas) => setFormData(prev => ({ ...prev, problemAreas }))}
        />
      );
    
    case 1: // Step 16
      return (
        <ActivitiesStep
          selectedActivities={formData.activities}
          customActivity={formData.customActivity}
          onSelectionsChange={(activities) => setFormData(prev => ({ ...prev, activities }))}
          onCustomActivityChange={(customActivity) => setFormData(prev => ({ ...prev, customActivity }))}
        />
      );
    
    case 2: // Step 17
      return (
        <WorkoutLocationStep
          selectedLocation={formData.workoutLocation}
          onSelect={(workoutLocation) => setFormData(prev => ({ ...prev, workoutLocation }))}
        />
      );
    
    case 3: // Step 18
      return (
        <WorkoutIntensityStep
          selectedIntensity={formData.workoutIntensity}
          onSelect={(workoutIntensity) => setFormData(prev => ({ ...prev, workoutIntensity }))}
        />
      );
    
    case 4: // Step 19
      return (
        <EquipmentAccessStep
          selected={formData.equipmentAccess?.type || null}
          onSelect={(type) => {
            const currentItems = formData.equipmentAccess?.items || [];
            setFormData(prev => ({ 
              ...prev, 
              equipmentAccess: { type, items: currentItems }
              // Keep workoutFrequency for backward compatibility but set it in a separate update
            }));
            
            // Set workoutFrequency in a separate update to avoid sync issues
            setTimeout(() => {
              setFormData(prev => ({ 
                ...prev, 
                workoutFrequency: type 
              }));
            }, 0);
          }}
          equipmentData={formData.equipmentAccess}
          onEquipmentDataChange={(equipmentData) => {
            if (JSON.stringify(formData.equipmentAccess) !== JSON.stringify(equipmentData)) {
              setFormData(prev => ({ 
                ...prev, 
                equipmentAccess: equipmentData 
              }));
            }
          }}
        />
      );
    
    case 5: // Step 20
      return (
        <WorkoutFrequencyStep
          selected={formData.workoutFrequency}
          onSelect={(workoutFrequency) => setFormData(prev => ({ ...prev, workoutFrequency }))}
        />
      );
    
    case 6: // Step 21
      return (
        <ExercisePreferencesStep
          preferences={formData.exercisePreferences}
          onPreferenceChange={(exercisePreferences) => {
            setFormData(prev => ({ ...prev, exercisePreferences }));
          }}
          onStepComplete={handleNext}
        />
      );
    
    case 7: // Step 22
      return (
        <DesiredBodyStep
          selectedBody={formData.desiredBody}
          onSelect={(desiredBody) => setFormData(prev => ({ ...prev, desiredBody }))}
        />
      );
      
    default:
      console.warn(`WorkoutPreferencesStepRenderer: No component for local step ${localStep}`);
      return null;
  }
};

export default WorkoutPreferencesStepRenderer;
