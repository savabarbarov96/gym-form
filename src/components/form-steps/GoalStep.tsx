import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface GoalStepProps {
  value?: number;
  currentBodyFat?: number;
  onChange?: (value: number) => void;
  onCurrentBodyFatChange?: (value: number) => void;
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

const targetBodyFatOptions = [...currentBodyFatOptions];

export function GoalStep({ value, currentBodyFat, onChange, onCurrentBodyFatChange }: GoalStepProps) {
  const [step, setStep] = useState<'current' | 'target'>('current');
  const [selectedCurrent, setSelectedCurrent] = useState<BodyFatOption | null>(
    currentBodyFatOptions.find(opt => Math.abs(opt.numericPercentage - (currentBodyFat || 25)) < 5) || null
  );
  const [selectedTarget, setSelectedTarget] = useState<BodyFatOption | null>(
    targetBodyFatOptions.find(opt => Math.abs(opt.numericPercentage - (value || 20)) < 5) || null
  );
  const [showTransition, setShowTransition] = useState(false);

  // Update the selected options when props change
  useEffect(() => {
    if (currentBodyFat) {
      const option = currentBodyFatOptions.find(opt => Math.abs(opt.numericPercentage - currentBodyFat) < 5);
      if (option) setSelectedCurrent(option);
    }
    
    if (value) {
      const option = targetBodyFatOptions.find(opt => Math.abs(opt.numericPercentage - value) < 5);
      if (option) setSelectedTarget(option);
    }
  }, [currentBodyFat, value]);

  const handleCurrentSelection = (option: BodyFatOption) => {
    setSelectedCurrent(option);
    onCurrentBodyFatChange(option.numericPercentage);
    
    // Show transition animation
    setShowTransition(true);
    setTimeout(() => {
      setShowTransition(false);
      setStep('target');
    }, 3000);
  };

  const handleTargetSelection = (option: BodyFatOption) => {
    setSelectedTarget(option);
    onChange(option.numericPercentage);
  };

  const availableTargets = selectedCurrent 
    ? targetBodyFatOptions.filter(opt => opt.numericPercentage <= selectedCurrent.numericPercentage)
    : targetBodyFatOptions;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Progress Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4 w-full">
          <div className={cn(
            "flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors",
            step === 'current' ? "bg-orange text-white" : "bg-orange/20 text-orange"
          )}>1</div>
          <div className="h-1 flex-1 bg-gray-200 rounded">
            <div className={cn(
              "h-full bg-orange transition-all rounded",
              step === 'current' ? "w-0" : "w-full"
            )} />
          </div>
          <div className={cn(
            "flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors",
            step === 'target' ? "bg-orange text-white" : "bg-orange/20 text-orange"
          )}>2</div>
        </div>
      </div>

      {/* Transition Animation */}
      {showTransition && selectedCurrent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="animate-pulse text-center p-8 rounded-xl bg-blue-500/20 backdrop-blur-md">
            <div className="text-5xl mb-4">{selectedCurrent.icon}</div>
            <h3 className="text-2xl font-bold text-white mb-2">Текущо ниво: {selectedCurrent.percentage}</h3>
            <p className="text-white/80">Сега нека изберем вашата цел...</p>
          </div>
        </div>
      )}

      {/* Current Body Fat Selection */}
      {step === 'current' && (
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
      )}

      {/* Target Body Fat Selection */}
      {step === 'target' && (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Каква е вашата цел?</h2>
            <p className="text-gray-500 font-medium">Изберете желаното ниво на телесни мазнини, което искате да постигнете</p>
          </div>

          <div className="relative">
            {/* Current Selection Summary */}
            <div className="bg-orange/5 rounded-xl p-4 mb-6 flex items-center space-x-4 border-l-4 border-orange">
              <span className="text-3xl">{selectedCurrent?.icon}</span>
              <div>
                <p className="text-sm text-gray-500 font-medium">Текущо ниво</p>
                <p className="font-medium">{selectedCurrent?.range} - {selectedCurrent?.description}</p>
              </div>
              <button 
                onClick={() => setStep('current')}
                className="ml-auto text-orange hover:text-orange-600 text-sm underline font-medium"
              >
                Промяна
              </button>
            </div>

            <div className="mb-6 text-center">
              <p className="text-lg font-medium text-white bg-blue-500/20 p-3 rounded-lg inline-block">
                Сега изберете вашето желано ниво на телесни мазнини
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {availableTargets.map((option) => (
                option.numericPercentage < (selectedCurrent?.numericPercentage || 100) && (
                  <button
                    key={option.range}
                    onClick={() => handleTargetSelection(option)}
                    className={cn(
                      "flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all backdrop-blur-sm",
                      "hover:border-blue-500 hover:bg-blue-50/30",
                      selectedTarget?.range === option.range
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
                )
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Goal Summary */}
      {step === 'target' && selectedCurrent && selectedTarget && (
        <div className="mt-8 p-6 rounded-xl border-2 border-gray-200 backdrop-blur-sm bg-transparent shadow-lg">
          <h3 className="text-xl font-bold text-white mb-4">
            Детайли за Трансформацията
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/80">Текущо ниво</p>
                <p className="font-medium text-white">{selectedCurrent.percentage}</p>
                <p className="text-sm text-white/80">{selectedCurrent.description}</p>
              </div>
              <span className="text-4xl">{selectedCurrent.icon}</span>
            </div>
            
            {/* Arrow indicator */}
            <div className="flex justify-center">
              <div className="h-12 w-1 bg-orange/30 relative">
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 text-orange">▼</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/80">Целево ниво</p>
                <p className="font-medium text-white">{selectedTarget.percentage}</p>
                <p className="text-sm text-white/80">{selectedTarget.description}</p>
              </div>
              <span className="text-4xl">{selectedTarget.icon}</span>
            </div>
            
            <div className="mt-4 pt-4 border-t border-white/20">
              <p className="text-sm text-white/80 text-center">
                Целите си за намаляване на телесните мазнини с {selectedCurrent.numericPercentage - selectedTarget.numericPercentage}%
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GoalStep;
