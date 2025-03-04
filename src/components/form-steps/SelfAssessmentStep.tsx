
import React from 'react';
import { cn } from '@/lib/utils';

interface SelfAssessmentStepProps {
  question?: string;
  assessmentKey?: 'outOfBreath' | 'fallingBack' | 'suitableWorkouts' | 'motivationLevel' | 'dietConsistency';
  value: number | null;
  onChange: (value: number) => void;
  type?: string;
  onValidate?: () => boolean;
}

const SelfAssessmentStep: React.FC<SelfAssessmentStepProps> = ({ 
  question, 
  assessmentKey,
  value, 
  onChange,
  type,
  onValidate 
}) => {
  // Determine question text based on the type or assessmentKey
  const getQuestionText = () => {
    if (question) return question;
    
    switch (type || assessmentKey) {
      case 'outOfBreath':
        return "I am often out of breath when I climb the stairs";
      case 'fallingBack':
        return "I keep falling back into bad exercise habits";
      case 'suitableWorkouts':
        return "I struggle to find workouts suitable for my fitness level";
      case 'motivationLevel':
        return "I find it hard to stay motivated with exercise";
      case 'dietConsistency':
        return "I have trouble maintaining a consistent diet";
      default:
        return "";
    }
  };

  const ratings = [
    { value: 1, label: 'Not at all' },
    { value: 2, label: 'Slightly' },
    { value: 3, label: 'Moderately' },
    { value: 4, label: 'Very much' },
    { value: 5, label: 'Extremely' }
  ];

  return (
    <div className="max-w-2xl mx-auto w-full">
      <h2 className="text-2xl font-bold text-center mb-6">How much do you relate to this statement?</h2>
      
      <div className="text-xl text-center p-6 mb-8 bg-card rounded-xl shadow-md border border-border">
        <span className="text-orange font-medium">{getQuestionText()}</span>
      </div>

      <div className="grid gap-4">
        {ratings.map((rating) => (
          <div
            key={rating.value}
            className={cn(
              "option-card p-6 transition-all hover:scale-[1.01] cursor-pointer border border-border rounded-lg",
              value === rating.value ? "bg-muted border-orange" : "bg-card"
            )}
            onClick={() => onChange(rating.value)}
          >
            <div className="flex justify-between items-center">
              <span className="text-lg">{rating.label}</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "w-6 h-6 rounded-full",
                      i <= rating.value 
                        ? (value === rating.value ? "bg-orange" : "bg-muted-foreground/30") 
                        : "border border-muted-foreground"
                    )} 
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelfAssessmentStep;
