
import React from 'react';
import { cn } from '@/lib/utils';

interface SelfAssessmentStepProps {
  question: string;
  assessmentKey: 'outOfBreath' | 'fallingBack' | 'suitableWorkouts' | 'motivationLevel' | 'dietConsistency';
  value: number | null;
  onChange: (value: number) => void;
}

const SelfAssessmentStep: React.FC<SelfAssessmentStepProps> = ({ 
  question, 
  assessmentKey, 
  value, 
  onChange 
}) => {
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
      <div className="text-xl text-center mb-8 text-orange">{question}</div>

      <div className="grid gap-4">
        {ratings.map((rating) => (
          <div
            key={rating.value}
            className={cn(
              "option-card p-6 hover:scale-[1.01] cursor-pointer",
              value === rating.value && "selected"
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
                        ? (value === rating.value ? "bg-orange" : "bg-muted") 
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
