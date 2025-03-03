
import React from 'react';
import { HormoneGraphStep } from '@/components/form-steps';

interface HormoneGraphStepRendererProps {
  handleNext: () => void;
}

const HormoneGraphStepRenderer = ({
  handleNext
}: HormoneGraphStepRendererProps) => {
  return (
    <HormoneGraphStep
      onNext={handleNext}
    />
  );
};

export default HormoneGraphStepRenderer;
