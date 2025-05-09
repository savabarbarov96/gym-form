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
  // Now we show this step for all genders
  return (
    <HormoneGraphStep
      onNext={handleNext}
      gender={formData.gender}
    />
  );
};

export default HormoneGraphStepRenderer;
