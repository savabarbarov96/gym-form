
import React from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface HormoneGraphStepProps {
  onNext: () => void;
  gender: string | null;
}

const HormoneGraphStep: React.FC<HormoneGraphStepProps> = ({ onNext, gender }) => {
  // Skip this step for female users
  if (gender === "female") {
    // Auto-advance to next step
    setTimeout(() => {
      onNext();
    }, 100);
    return null;
  }
  
  const data = [
    { name: "Now", testosterone: 20, cortisol: 80 },
    { name: "Week 2", testosterone: 35, cortisol: 65 },
    { name: "Week 4", testosterone: 50, cortisol: 50 },
    { name: "Week 8", testosterone: 75, cortisol: 35 },
    { name: "Week 12", testosterone: 95, cortisol: 20 }
  ];
  
  const chartVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { duration: 0.8, ease: "easeInOut" } 
    }
  };
  
  const pillVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: { 
        delay: 0.2 + (i * 0.15),
        duration: 0.5
      }
    })
  };
  
  return (
    <div className="text-center max-w-3xl mx-auto">
      <h1 className="text-4xl sm:text-5xl font-bold mb-6">Your hormones will improve</h1>
      <p className="text-xl text-muted-foreground mb-10 max-w-xl mx-auto">
        As you follow our program, your testosterone will increase and cortisol (stress hormone) will decrease
      </p>
      
      <div className="bg-card border border-border p-6 rounded-xl mb-10">
        <motion.div
          variants={chartVariants}
          initial="hidden"
          animate="visible"
          className="w-full"
        >
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <XAxis dataKey="name" stroke="#888" />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ 
                  background: 'rgb(var(--card))', 
                  border: '1px solid rgb(var(--border))' 
                }} 
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="testosterone" 
                name="Testosterone" 
                stroke="rgb(var(--orange))" 
                strokeWidth={3} 
                dot={false}
                activeDot={{ r: 6 }}
                animationDuration={2000}
              />
              <Line 
                type="monotone" 
                dataKey="cortisol" 
                name="Cortisol (Stress)" 
                stroke="#888" 
                strokeWidth={3} 
                dot={false}
                activeDot={{ r: 6 }}
                animationDuration={2000}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
        
        <div className="flex justify-between mt-6">
          {data.map((item, index) => (
            <motion.div 
              key={index}
              custom={index}
              variants={pillVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center"
            >
              <span className="text-xs mb-1 text-muted-foreground">{item.name}</span>
              <div className="flex flex-col md:flex-row gap-1">
                <motion.div 
                  className="w-8 h-8 rounded-full bg-orange flex items-center justify-center text-white font-bold text-xs"
                >
                  {item.testosterone}%
                </motion.div>
                <motion.div 
                  className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold text-xs"
                >
                  {item.cortisol}%
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-4 flex justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange"></div>
            <span className="text-sm">Testosterone</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-400"></div>
            <span className="text-sm">Cortisol (Stress)</span>
          </div>
        </div>
      </div>
      
      <motion.button
        className="btn-primary mt-6"
        onClick={onNext}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Continue
      </motion.button>
    </div>
  );
};

export default HormoneGraphStep;
