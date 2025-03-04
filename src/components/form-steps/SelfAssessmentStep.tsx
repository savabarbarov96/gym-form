import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useSurvey } from '@/contexts/SurveyContext';

interface SelfAssessmentStepProps {
  question?: string;
  assessmentKey?: 'outOfBreath' | 'fallingBack' | 'suitableWorkouts' | 'motivationLevel' | 'dietConsistency';
  value: number | null;
  onChange: (value: number) => void;
  type?: string;
  onValidate?: () => boolean;
  autoAdvance?: boolean;
}

const SelfAssessmentStep: React.FC<SelfAssessmentStepProps> = ({ 
  question, 
  assessmentKey,
  value, 
  onChange,
  type,
  onValidate,
  autoAdvance = true
}) => {
  const { handleNext } = useSurvey();
  const { toast, dismiss } = useToast();
  const initialValueRef = useRef<number | null>(value);
  const lastSelectedValueRef = useRef<number | null>(null);
  
  // Automatically advance to the next step only on initial selection
  useEffect(() => {
    // Only auto-advance if:
    // 1. Auto-advance is enabled
    // 2. The current value is not null (a selection has been made)
    // 3. The initial value was null (this is a new selection, not returning to a previous selection)
    // 4. The value has actually changed from the last selected value (prevent multiple advances)
    if (autoAdvance && 
        value !== null && 
        initialValueRef.current === null &&
        value !== lastSelectedValueRef.current) {
      
      console.log(`SelfAssessmentStep: New selection (${value}), preparing to auto-advance`);
      lastSelectedValueRef.current = value;
      
      // Short delay to allow the user to see their selection
      const timer = setTimeout(() => {
        if (onValidate) {
          console.log('SelfAssessmentStep: Running validation before auto-advancing');
          // If validation passes, proceed to next step
          if (onValidate()) {
            console.log('SelfAssessmentStep: Validation passed, auto-advancing to next step');
            handleNext();
          } else {
            console.log('SelfAssessmentStep: Validation failed, not advancing');
          }
        } else {
          // No validation needed, proceed directly
          console.log('SelfAssessmentStep: No validation required, auto-advancing to next step');
          handleNext();
        }
      }, 800); // Slightly longer delay for better UX
      
      return () => clearTimeout(timer);
    }
  }, [value, autoAdvance, handleNext, onValidate]);
  
  // Determine question text based on the type or assessmentKey
  const getQuestionText = () => {
    if (question) return question;
    
    switch (type || assessmentKey) {
      case 'outOfBreath':
        return "Често ми липсва въздух, когато се качвам по стълби";
      case 'fallingBack':
        return "Непрекъснато се връщам към лошите си навици за упражнения";
      case 'suitableWorkouts':
        return "Трудно ми е да намеря тренировки, подходящи за моето ниво на физическа подготовка";
      case 'motivationLevel':
        return "Трудно ми е да остана мотивиран/а с тренировките";
      case 'dietConsistency':
        return "Имам проблеми с поддържането на постоянна диета";
      default:
        return "";
    }
  };

  const ratings = [
    { value: 1, label: 'Изобщо не' },
    { value: 2, label: 'Леко' },
    { value: 3, label: 'Умерено' },
    { value: 4, label: 'Много' },
    { value: 5, label: 'Изключително' }
  ];

  const handleOptionSelect = (selectedValue: number) => {
    dismiss(); // Clear any existing error toasts
    onChange(selectedValue);
  };

  return (
    <div className="max-w-3xl mx-auto w-full">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8">Доколко се идентифицирате с това твърдение?</h2>
      
      <div className="text-xl text-center p-8 mb-10 bg-gradient-to-br from-card to-background rounded-2xl shadow-lg border border-border relative">
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-orange/10 text-orange px-4 py-1 rounded-full text-sm font-medium">
          Твърдение
        </div>
        <span className="text-orange font-medium leading-relaxed">{getQuestionText()}</span>
      </div>

      <div className="flex flex-col space-y-6 relative">
        {/* Scale labels */}
        <div className="grid grid-cols-5 w-full mb-2 px-2">
          {ratings.map((rating) => (
            <div key={`label-${rating.value}`} className="text-center text-sm text-muted-foreground">
              {rating.label}
            </div>
          ))}
        </div>
        
        {/* Rating visualization */}
        <div className="flex items-center justify-between w-full h-24 relative px-6 mb-8">
          {/* Background track */}
          <div className="absolute top-1/2 left-0 right-0 h-2 bg-muted rounded-full transform -translate-y-1/2"></div>
          
          {/* Selection dots */}
          {ratings.map((rating) => (
            <button
              key={rating.value}
              onClick={() => handleOptionSelect(rating.value)}
              className={cn(
                "relative flex flex-col items-center justify-center w-14 h-14 rounded-full transition-all duration-300 z-10",
                value === rating.value 
                  ? "bg-orange scale-110 shadow-lg" 
                  : "bg-card border-2 border-muted hover:border-orange/50 hover:scale-105"
              )}
            >
              <span className={cn(
                "text-lg font-bold",
                value === rating.value ? "text-white" : "text-foreground"
              )}>
                {rating.value}
              </span>
            </button>
          ))}
        </div>
        
        {/* Selected rating display */}
        {value !== null && (
          <div className="text-center mt-4 py-4 bg-muted/30 rounded-xl">
            <p className="text-lg">
              Избрахте: <span className="font-semibold text-orange">{ratings.find(r => r.value === value)?.label}</span>
            </p>
            {autoAdvance && initialValueRef.current === null && value !== initialValueRef.current && (
              <p className="text-sm text-muted-foreground mt-1">
                Преминаване към следващия въпрос...
              </p>
            )}
          </div>
        )}
        
        {!autoAdvance && (
          <p className="text-center text-muted-foreground text-sm mt-8">
            Изберете своя отговор и кликнете "Продължи", за да продължите
          </p>
        )}
      </div>
    </div>
  );
};

export default SelfAssessmentStep;
