import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";

interface HormoneGraphStepProps {
  onNext: () => void;
}

const HormoneGraphStep: React.FC<HormoneGraphStepProps> = ({ onNext }) => {
  const data = [
    { name: "Now", value: 20 },
    { name: "Week 2", value: 35 },
    { name: "Week 4", value: 50 },
    { name: "Week 8", value: 75 },
    { name: "Week 12", value: 95 }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      // We'll keep the auto-continue functionality but won't add a button
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const chartVariants = {
    hidden: { opacity: 0, pathLength: 0 },
    visible: { 
      opacity: 1, 
      pathLength: 1,
      transition: { duration: 2, ease: "easeInOut" } 
    }
  };
  
  const pillVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: { 
        delay: 0.5 + (i * 0.3),
        duration: 0.5
      }
    })
  };
  
  return (
    <div className="text-center max-w-3xl mx-auto">
      <h1 className="text-4xl sm:text-5xl font-bold mb-6">Your hormones will improve</h1>
      <p className="text-xl text-muted-foreground mb-10 max-w-xl mx-auto">
        As you follow our program, your testosterone and growth hormone will naturally increase
      </p>
      
      <div className="bg-card border border-border p-6 rounded-xl mb-10">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <XAxis dataKey="name" stroke="#888" />
            <Tooltip 
              contentStyle={{ 
                background: 'rgb(var(--card))', 
                border: '1px solid rgb(var(--border))' 
              }} 
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="rgb(var(--orange))" 
              strokeWidth={3} 
              dot={false}
              animationDuration={2000}
            />
          </LineChart>
        </ResponsiveContainer>
        
        <div className="flex justify-between mt-4">
          {data.map((item, index) => (
            <motion.div 
              key={index}
              custom={index}
              variants={pillVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center"
            >
              <motion.div 
                className="w-8 h-8 rounded-full bg-orange flex items-center justify-center text-white font-bold text-xs"
              >
                {item.value}%
              </motion.div>
              <span className="text-xs mt-1 text-muted-foreground">{item.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-center">
        <Button
          onClick={onNext}
          className="px-8 py-6 bg-orange hover:bg-orange-hover text-white text-lg rounded-lg"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default HormoneGraphStep;
