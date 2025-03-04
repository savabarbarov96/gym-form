
import React from 'react';
import { HormoneGraphStep } from '@/components/form-steps';
import { FormData } from '@/types/survey';

interface HormoneGraphStepRendererProps {
  handleNext: () => void;
  formData: FormData;
}

const HormoneGraphStepRenderer = ({
  handleNext,
  formData
}: HormoneGraphStepRendererProps) => {
  // If the user is female, we should skip this step
  React.useEffect(() => {
    if (formData.gender === 'female') {
      // Skip to the next step for female users
      handleNext();
    }
  }, [formData.gender, handleNext]);

  // Only render for male users
  if (formData.gender === 'female') {
    return null;
  }

  return (
    <HormoneGraphStep
      onNext={handleNext}
      gender={formData.gender}
    />
  );
};

export default HormoneGraphStepRenderer;
