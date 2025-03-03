
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FormNavigationProps {
  step: number;
  totalSteps: number;
  handleNext: () => void;
  handleBack: () => void;
}

const FormNavigation: React.FC<FormNavigationProps> = ({
  step,
  totalSteps,
  handleNext,
  handleBack
}) => {
  return (
    <div className="mt-8 flex gap-4 w-full max-w-4xl mx-auto">
      {step > 1 && (
        <Button 
          onClick={handleBack}
          variant="outline"
          className="px-6 py-3 border border-border rounded-lg hover:bg-secondary transition-colors"
        >
          Back
        </Button>
      )}
      <Button 
        onClick={handleNext}
        className="px-6 py-3 bg-orange hover:bg-orange-hover text-white rounded-lg ml-auto flex items-center gap-2 transition-colors"
      >
        {step === totalSteps ? "Complete" : "Continue"}
        <ChevronRight size={18} />
      </Button>
    </div>
  );
};

export default FormNavigation;
