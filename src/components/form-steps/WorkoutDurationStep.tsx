import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { motion } from "framer-motion";

interface WorkoutDurationStepProps {
  selected: string | null;
  onSelect: (value: string) => void;
}

const WorkoutDurationStep: React.FC<WorkoutDurationStepProps> = ({ selected, onSelect }) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const options = [
    { value: "10-15", label: "10-15 минути" },
    { value: "20-30", label: "20-30 минути" },
    { value: "30-40", label: "30-40 минути" },
    { value: "auto", label: "Оставете на нас" }
  ];

  const handleChange = (value: string) => {
    onSelect(value);
  };

  return (
    <div className="text-center max-w-3xl mx-auto">
      <motion.h1 
        className="text-4xl sm:text-5xl font-bold mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Колко дълги искате да бъдат Вашите тренировки?
      </motion.h1>
      
      <motion.div
        className="mt-8 space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <RadioGroup value={selected || ""} onValueChange={handleChange} className="flex flex-col gap-4">
          {options.map((option) => (
            <motion.div 
              key={option.value}
              variants={itemVariants}
              className={`option-card p-4 ${selected === option.value ? 'selected' : ''}`}
              onClick={() => handleChange(option.value)}
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem value={option.value} id={option.value} />
                <label htmlFor={option.value} className="font-medium text-lg cursor-pointer flex-1 text-left">
                  {option.label}
                </label>
              </div>
            </motion.div>
          ))}
        </RadioGroup>
      </motion.div>
    </div>
  );
};

export default WorkoutDurationStep;
