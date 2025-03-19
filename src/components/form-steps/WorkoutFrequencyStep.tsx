import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { motion } from "framer-motion";

interface WorkoutFrequencyStepProps {
  selected: string | null;
  onSelect: (value: string) => void;
}

const WorkoutFrequencyStep: React.FC<WorkoutFrequencyStepProps> = ({ selected, onSelect }) => {
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
    { value: "none", label: "Нито веднъж" },
    { value: "1-2-times", label: "1-2 пъти седмично" },
    { value: "3-times", label: "3 пъти седмично" },
    { value: "more-than-3", label: "Повече от 3 пъти седмично" }
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
        Колко пъти седмично сте тренирали през последните 3 месеца?
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
        
        {selected === "more-than-3" && (
          <motion.div 
            className="mt-6 p-4 bg-card rounded-lg border border-orange text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-orange font-bold text-xl mb-2">Поздравления! 🎉</p>
            <p>Тренирали сте 65% повече от средния потребител. Вашата отдаденост на фитнеса е впечатляваща!</p>
          </motion.div>
        )}
        
        {selected === "1-2-times" && (
          <motion.div 
            className="mt-6 p-4 bg-card rounded-lg border border-orange text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-lg mb-2">Ще Ви помогнем да създадете солиден навик!</p>
            <p>Нашият план ще Ви помогне да установите постоянна тренировъчна рутина, която пасва на Вашия начин на живот.</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default WorkoutFrequencyStep;
