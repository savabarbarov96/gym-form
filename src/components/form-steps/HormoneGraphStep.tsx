
import React, { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { motion } from "framer-motion";

interface HormoneGraphStepProps {
  onNext: () => void;
}

const HormoneGraphStep: React.FC<HormoneGraphStepProps> = ({ onNext }) => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [data, setData] = useState([
    { month: 'Month 1', cortisol: 100, testosterone: 10 },
    { month: 'Month 2', cortisol: 100, testosterone: 10 },
    { month: 'Month 3', cortisol: 100, testosterone: 10 },
    { month: 'Month 4', cortisol: 100, testosterone: 10 },
    { month: 'Month 5', cortisol: 100, testosterone: 10 },
    { month: 'Month 6', cortisol: 100, testosterone: 10 },
  ]);

  // Animate the data with smoother curves
  useEffect(() => {
    if (animationComplete) return;
    
    // Create more realistic, smoother curve data points
    const finalData = [
      { month: 'Month 1', cortisol: 100, testosterone: 10 },
      { month: 'Month 2', cortisol: 88, testosterone: 25 },
      { month: 'Month 3', cortisol: 74, testosterone: 42 },
      { month: 'Month 4', cortisol: 60, testosterone: 58 },
      { month: 'Month 5', cortisol: 45, testosterone: 72 },
      { month: 'Month 6', cortisol: 35, testosterone: 85 },
    ];
    
    // Animate the data points sequentially for a smoother transition
    let currentIndex = 0;
    const animateNextPoint = () => {
      if (currentIndex < finalData.length) {
        setData(prevData => {
          const newData = [...prevData];
          newData[currentIndex] = finalData[currentIndex];
          return newData;
        });
        currentIndex++;
        setTimeout(animateNextPoint, 400);
      } else {
        setAnimationComplete(true);
      }
    };
    
    animateNextPoint();
  }, []);

  return (
    <div className="text-center max-w-4xl mx-auto">
      <motion.h1 
        className="text-4xl sm:text-5xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Your Hormone Balance Will Improve
      </motion.h1>
      
      <motion.p
        className="text-lg mb-8 text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Our program helps reduce stress hormone (cortisol) and increase testosterone for better results
      </motion.p>
      
      <div className="h-80 w-full mb-10">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="cortisolGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff4700" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ff4700" stopOpacity={0.2} />
              </linearGradient>
              <linearGradient id="testosteroneGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#54D62C" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#54D62C" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" stroke="#666" />
            <YAxis stroke="#666" />
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#222', 
                borderColor: '#333',
                color: '#fff' 
              }} 
            />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="cortisol" 
              name="Cortisol (Stress)"
              stroke="#ff4700" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#cortisolGradient)" 
              isAnimationActive={true}
              animationDuration={1500}
              animationEasing="ease-out"
            />
            <Area 
              type="monotone" 
              dataKey="testosterone" 
              name="Testosterone"
              stroke="#54D62C" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#testosteroneGradient)" 
              isAnimationActive={true}
              animationDuration={1500}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <motion.button 
        onClick={onNext}
        className="px-8 py-4 bg-orange hover:bg-orange-hover text-white rounded-lg text-xl font-bold shadow-lg transition-all transform hover:scale-105"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: animationComplete ? 1 : 0, scale: animationComplete ? 1 : 0.9 }}
        transition={{ duration: 0.3 }}
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.95 }}
      >
        Awesome
      </motion.button>
    </div>
  );
};

export default HormoneGraphStep;
