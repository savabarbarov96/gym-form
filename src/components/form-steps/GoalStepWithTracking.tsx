import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useFacebookPixelContext } from '@/contexts/FacebookPixelContext';
import { trackGymFormStepComplete, trackCustomGymEvent } from '@/utils/facebookPixelEvents';

interface GoalStepProps {
  currentBodyFat?: number;
  onCurrentBodyFatChange?: (value: number) => void;
  stepNumber?: number;
}

interface BodyFatOption {
  range: string;
  percentage: string;
  numericPercentage: number;
  description: string;
  icon: string;
  imageSrc: string;
}

const currentBodyFatOptions: BodyFatOption[] = [
  {
    range: "10%",
    percentage: "10%",
    numericPercentage: 10,
    description: "Много ниско ниво на телесни мазнини",
    icon: "💪",
    imageSrc: "/images/body-fat/5-10.jpg"
  },
  {
    range: "15%",
    percentage: "15%",
    numericPercentage: 15,
    description: "Атлетично ниво на телесни мазнини",
    icon: "🏃",
    imageSrc: "/images/body-fat/10-15.jpg"
  },
  {
    range: "20%",
    percentage: "20%",
    numericPercentage: 20,
    description: "Нормално ниво на телесни мазнини",
    icon: "👌",
    imageSrc: "/images/body-fat/15-20.jpg"
  },
  {
    range: "25%",
    percentage: "25%",
    numericPercentage: 25,
    description: "Леко завишено ниво на телесни мазнини",
    icon: "🤔",
    imageSrc: "/images/body-fat/20-25.jpg"
  },
  {
    range: "30%",
    percentage: "30%",
    numericPercentage: 30,
    description: "Високо ниво на телесни мазнини",
    icon: "😟",
    imageSrc: "/images/body-fat/25-30.jpg"
  },
  {
    range: "40%",
    percentage: "40%",
    numericPercentage: 40,
    description: "Много високо ниво на телесни мазнини",
    icon: "😰",
    imageSrc: "/images/body-fat/30-40.jpg"
  }
];

export function GoalStepWithTracking({ currentBodyFat, onCurrentBodyFatChange, stepNumber = 1 }: GoalStepProps) {
  const [selectedCurrent, setSelectedCurrent] = useState<BodyFatOption | null>(
    currentBodyFatOptions.find(opt => Math.abs(opt.numericPercentage - (currentBodyFat || 25)) < 5) || null
  );

  // Get Facebook Pixel tracking functions
  const { trackEvent, trackCustomEvent } = useFacebookPixelContext();

  // Track when the step is viewed
  useEffect(() => {
    trackGymFormStepComplete(trackEvent, stepNumber, 'Body Fat Assessment');
    
    // Track custom event for step view
    trackCustomEvent('StepViewed', {
      step_number: stepNumber,
      step_name: 'Body Fat Assessment',
      form_type: 'gym_assessment',
      value: stepNumber * 10,
      currency: 'USD'
    });
  }, [trackEvent, trackCustomEvent, stepNumber]);

  // Update the selected option when props change
  useEffect(() => {
    if (currentBodyFat) {
      const option = currentBodyFatOptions.find(opt => Math.abs(opt.numericPercentage - currentBodyFat) < 5);
      if (option) setSelectedCurrent(option);
    }
  }, [currentBodyFat]);

  const handleCurrentSelection = (option: BodyFatOption) => {
    setSelectedCurrent(option);
    
    // Track the body fat selection
    trackCustomGymEvent(trackCustomEvent, 'BodyFatSelected', {
      step_number: stepNumber,
      form_type: 'gym_assessment',
      user_goal: `${option.percentage} body fat`,
      fitness_level: option.description,
      value: 25, // Value for body fat assessment completion
      currency: 'USD'
    });

    // Track as a ViewContent event for Facebook optimization
    trackEvent('ViewContent', {
      content_name: `Body Fat Selection - ${option.percentage}`,
      content_category: 'fitness_assessment',
      content_ids: [`body_fat_${option.numericPercentage}`],
      value: 25,
      currency: 'USD'
    });

    if (onCurrentBodyFatChange) {
      onCurrentBodyFatChange(option.numericPercentage);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Current Body Fat Selection */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Какво е вашето текущо ниво на телесни мазнини?</h2>
          <p className="text-gray-500 font-medium">Изберете опцията, която най-добре описва вашето текущо състояние</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {currentBodyFatOptions.map((option) => (
            <button
              key={option.range}
              onClick={() => handleCurrentSelection(option)}
              className={cn(
                "flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all backdrop-blur-sm",
                "hover:border-blue-500 hover:bg-blue-50/30",
                selectedCurrent?.range === option.range
                  ? "border-blue-500 bg-blue-50/30"
                  : "border-gray-200 bg-transparent shadow-lg"
              )}
            >
              <div className="relative w-full aspect-square mb-2 overflow-hidden rounded-lg">
                <img
                  src={option.imageSrc}
                  alt={`Body fat ${option.percentage}`}
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden text-4xl absolute inset-0 flex items-center justify-center bg-gray-100">
                  {option.icon}
                </div>
              </div>
              <span className="font-medium text-white">{option.percentage}</span>
              <span className="text-sm text-white text-center mt-1">
                {option.description}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GoalStepWithTracking; 