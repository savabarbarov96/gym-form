
import React, { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { motion } from "framer-motion";

interface AnimatedProgressGraphProps {
  goalValue?: number;
}

const AnimatedProgressGraph = ({ goalValue = 20 }: AnimatedProgressGraphProps) => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [progressData, setProgressData] = useState([
    { month: 'Month 1', progress: 0 },
    { month: 'Month 2', progress: 0 },
    { month: 'Month 3', progress: 0 },
    { month: 'Month 4', progress: 0 },
    { month: 'Month 5', progress: 0 },
    { month: 'Month 6', progress: 0 },
  ]);

  // Adjust expected progress based on goal value
  useEffect(() => {
    if (animationComplete) return;
    
    const finalData = [
      { month: 'Month 1', progress: Math.round(goalValue * 0.1) },
      { month: 'Month 2', progress: Math.round(goalValue * 0.25) },
      { month: 'Month 3', progress: Math.round(goalValue * 0.45) },
      { month: 'Month 4', progress: Math.round(goalValue * 0.65) },
      { month: 'Month 5', progress: Math.round(goalValue * 0.85) },
      { month: 'Month 6', progress: Math.round(goalValue) },
    ];
    
    // Animate the data points sequentially
    const animateData = async () => {
      for (let i = 0; i < finalData.length; i++) {
        await new Promise<void>((resolve) => {
          setTimeout(() => {
            setProgressData(prevData => {
              const newData = [...prevData];
              newData[i] = finalData[i];
              return newData;
            });
            resolve();
          }, 300);
        });
      }
      setAnimationComplete(true);
    };
    
    animateData();
  }, [goalValue]);

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6"
      >
        <h2 className="text-2xl font-bold mb-2">Your Expected Progress</h2>
        <p className="text-muted-foreground">Based on your goals and current fitness level</p>
      </motion.div>
      
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={progressData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="progressGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--orange)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--orange)" stopOpacity={0.2} />
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
            <Area 
              type="monotone" 
              dataKey="progress" 
              stroke="var(--orange)" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#progressGradient)" 
              isAnimationActive={true}
              animationDuration={1000}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: animationComplete ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mt-6 text-orange font-medium"
      >
        You can achieve your goal in approximately 6 months!
      </motion.div>
    </div>
  );
};

export default AnimatedProgressGraph;
