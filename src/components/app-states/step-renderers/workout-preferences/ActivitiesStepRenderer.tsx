
import React from 'react';
import { FormData } from '@/types/survey';
import { ActivitiesStep } from '@/components/form-steps';

interface ActivitiesStepRendererProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const ActivitiesStepRenderer = ({
  formData,
  setFormData
}: ActivitiesStepRendererProps) => {
  return (
    <ActivitiesStep
      selectedActivities={formData.activities}
      customActivity={formData.customActivity}
      onSelectionsChange={(activities) =>
        setFormData(prev => ({ ...prev, activities }))
      }
      onCustomActivityChange={(customActivity) =>
        setFormData(prev => ({ ...prev, customActivity }))
      }
    />
  );
};

export default ActivitiesStepRenderer;
