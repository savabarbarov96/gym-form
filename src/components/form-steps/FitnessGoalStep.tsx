import React from "react";
import { Clock, Activity, Dumbbell, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface FitnessGoalStepProps {
  selectedGoal: string | null;
  onSelect: (goal: string) => void;
}

const FitnessGoalStep = ({ selectedGoal, onSelect }: FitnessGoalStepProps) => {
  const goals = [
    { 
      label: "Релефно тяло",
      id: "get-shredded", 
      icon: Dumbbell,
      description: "Постигане на видими мускули и минимално ниво на телесни мазнини" 
    },
    { 
      label: "Качване на тегло", 
      id: "gain-weight", 
      icon: TrendingUp,
      description: "Увеличаване на общата телесна маса и изграждане на мускули" 
    },
    { 
      label: "Дълголетие и здраве", 
      id: "longevity-health", 
      icon: Clock,
      description: "Фокус върху превенция на болести, анти-ейджинг и дългосрочна жизненост" 
    },
    { 
      label: "Подобряване на издръжливостта", 
      id: "improve-endurance", 
      icon: Activity,
      description: "Увеличаване на аеробния капацитет, издръжливостта и цялостната кондиция" 
    },
  ];

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
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <div className="text-center px-4 sm:px-6 py-6 max-w-[100vw] overflow-x-hidden">
      <motion.h1 
        className="text-4xl sm:text-5xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Изберете Вашата цел
      </motion.h1>
      
      <motion.p 
        className="text-muted-foreground text-xl mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Какво искате да постигнете?
      </motion.p>
      
      <motion.div 
        className="flex flex-col gap-4 max-w-2xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {goals.map((goal) => {
          const Icon = goal.icon;
          return (
            <motion.div
              key={goal.id}
              variants={itemVariants}
              className={cn(
                "option-card backdrop-blur-sm p-8 transition-all duration-300 rounded-xl cursor-pointer",
                selectedGoal === goal.id 
                  ? 'border-2 border-orange bg-orange/5 transform scale-[1.02] shadow-lg' 
                  : 'border-2 border-transparent hover:border-orange/30 bg-background/30 hover:bg-background/40'
              )}
              onClick={() => onSelect(goal.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-6">
                <div className={cn(
                  "icon-container transition-all p-4 rounded-full backdrop-blur-sm",
                  selectedGoal === goal.id ? "bg-orange/30" : "bg-secondary/70"
                )}>
                  <Icon className={cn(
                    "w-8 h-8",
                    selectedGoal === goal.id ? "text-orange" : "text-muted-foreground"
                  )} />
                </div>
                <div className="text-left flex-1">
                  <h3 className={cn(
                    "text-2xl font-medium mb-2 transition-colors duration-300",
                    selectedGoal === goal.id ? "text-orange" : ""
                  )}>
                    {goal.label}
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed">{goal.description}</p>
                </div>
                {selectedGoal === goal.id && (
                  <motion.div 
                    className="text-orange"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  );
};

export default FitnessGoalStep;
