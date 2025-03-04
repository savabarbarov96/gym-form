
import React, { useState, useEffect } from 'react';
import { ConcernOption, CustomConcern, NoneOption, healthConcernOptions } from './health-concerns';

interface HealthConcernsStepProps {
  selectedOptions: string[];
  customOption: string | null;
  onSelectionChange: (selected: string[]) => void;
  onCustomOptionChange: (customOption: string | null) => void;
}

const HealthConcernsStep = ({
  selectedOptions,
  customOption,
  onSelectionChange,
  onCustomOptionChange
}: HealthConcernsStepProps) => {
  const [showCustomInput, setShowCustomInput] = useState(!!customOption);
  
  // Handle auto-continuing after adding custom concern
  useEffect(() => {
    if (customOption && customOption.trim() !== '') {
      // Close the input after setting it
      setShowCustomInput(false);
    }
  }, [customOption]);

  const toggleOption = (id: string) => {
    if (selectedOptions.includes(id)) {
      onSelectionChange(selectedOptions.filter(item => item !== id));
    } else {
      onSelectionChange([...selectedOptions, id]);
    }
  };
  
  const clearAllSelections = () => {
    onSelectionChange([]);
    onCustomOptionChange(null);
  };

  const hasNoSelections = selectedOptions.length === 0 && !customOption;

  return (
    <div className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold mb-4">Do you have any physical limitations or areas of pain?</h1>
      <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
        Select any areas where you experience pain or have limitations to help us customize your workout plan
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {healthConcernOptions.map(option => (
          <ConcernOption
            key={option.id}
            id={option.id}
            label={option.label}
            icon={option.icon}
            description={option.description}
            isSelected={selectedOptions.includes(option.id)}
            onToggle={toggleOption}
          />
        ))}
        
        {/* Custom option placeholder - only show if no custom option is already set */}
        {!showCustomInput && !customOption && (
          <CustomConcern
            customOption={null}
            showCustomInput={showCustomInput}
            setShowCustomInput={setShowCustomInput}
            onCustomOptionChange={onCustomOptionChange}
          />
        )}
      </div>
      
      {/* Custom input or display */}
      {(showCustomInput || customOption) && (
        <CustomConcern
          customOption={customOption}
          showCustomInput={showCustomInput}
          setShowCustomInput={setShowCustomInput}
          onCustomOptionChange={onCustomOptionChange}
        />
      )}
      
      {/* None of the above button */}
      <NoneOption
        isSelected={hasNoSelections}
        onClick={clearAllSelections}
      />
      
      {hasNoSelections ? (
        <div className="text-lg text-muted-foreground mb-4">
          No issues? Great! Select any that apply or continue.
        </div>
      ) : (
        <div className="mt-4 text-orange font-medium">
          Your plan will account for the selected limitations.
        </div>
      )}
    </div>
  );
};

export default HealthConcernsStep;
