import React, { useEffect } from 'react';
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
  // Add keyboard event listener for spacebar and enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if the active element is not an input, textarea, or button
      const activeElement = document.activeElement;
      const isInputActive = 
        activeElement instanceof HTMLInputElement || 
        activeElement instanceof HTMLTextAreaElement || 
        activeElement instanceof HTMLButtonElement ||
        activeElement instanceof HTMLSelectElement;
      
      // Only trigger if not in an input field
      if (!isInputActive) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          // Play sound
          try {
            const audio = new Audio('/assets/sounds/click.mp3');
            audio.volume = 0.3;
            audio.play().catch(error => {
              console.log('Error playing button sound:', error);
            });
          } catch (error) {
            console.log('Error creating audio instance:', error);
          }
          // Navigate to next step
          handleNext();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext]);

  const playClickSound = () => {
    try {
      const audio = new Audio('/assets/sounds/click.mp3');
      audio.volume = 0.3;
      audio.play().catch(error => {
        console.log('Error playing button sound:', error);
      });
    } catch (error) {
      console.log('Error creating audio instance:', error);
    }
  };

  return (
    <div className="mt-8 flex gap-4 w-full max-w-4xl mx-auto">
      {step > 1 && (
        <Button 
          onClick={() => {
            playClickSound();
            handleBack();
          }}
          variant="outline"
          className="px-6 py-3 border border-border rounded-lg hover:bg-secondary transition-colors"
        >
          Назад
        </Button>
      )}
      <Button 
        onClick={() => {
          playClickSound();
          handleNext();
        }}
        className="px-6 py-3 bg-orange hover:bg-orange-hover text-white rounded-lg ml-auto flex items-center gap-2 transition-colors"
        tabIndex={0} // Ensure it's focusable
        aria-label={step === totalSteps ? "Завърши" : "Продължи"}
      >
        {step === totalSteps ? "Завърши" : "Продължи"}
        <ChevronRight size={18} />
      </Button>
    </div>
  );
};

export default FormNavigation;
