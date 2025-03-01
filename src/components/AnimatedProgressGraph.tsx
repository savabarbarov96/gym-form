
import React, { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { motion } from "framer-motion";

interface AnimatedProgressGraphProps {
  goalValue?: number;
}

const AnimatedProgressGraph = ({ goalValue = 20 }: AnimatedProgressGraphProps) => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [progressData, setProgressData] = useState([
    { month: 'Month 1', bodyFat: 0, muscleMass: 0 },
    { month: 'Month 2', bodyFat: 0, muscleMass: 0 },
    { month: 'Month 3', bodyFat: 0, muscleMass: 0 },
    { month: 'Month 4', bodyFat: 0, muscleMass: 0 },
    { month: 'Month 5', bodyFat: 0, muscleMass: 0 },
    { month: 'Month 6', bodyFat: 0, muscleMass: 0 },
  ]);

  // Adjust expected progress based on goal value
  useEffect(() => {
    if (animationComplete) return;
    
    // Calculate the starting body fat and muscle mass
    const startingBodyFat = goalValue;
    const targetBodyFat = Math.max(startingBodyFat * 0.6, 10); // Target is 60% of starting, min 10%
    const startingMuscleMass = 30; // Arbitrary starting point
    const targetMuscleMass = 60; // Target muscle mass

    const finalData = [
      { 
        month: 'Month 1', 
        bodyFat: Math.round(startingBodyFat - (startingBodyFat - targetBodyFat) * 0.1),
        muscleMass: Math.round(startingMuscleMass + (targetMuscleMass - startingMuscleMass) * 0.1)
      },
      { 
        month: 'Month 2', 
        bodyFat: Math.round(startingBodyFat - (startingBodyFat - targetBodyFat) * 0.25),
        muscleMass: Math.round(startingMuscleMass + (targetMuscleMass - startingMuscleMass) * 0.25)
      },
      { 
        month: 'Month 3', 
        bodyFat: Math.round(startingBodyFat - (startingBodyFat - targetBodyFat) * 0.45),
        muscleMass: Math.round(startingMuscleMass + (targetMuscleMass - startingMuscleMass) * 0.45)
      },
      { 
        month: 'Month 4', 
        bodyFat: Math.round(startingBodyFat - (startingBodyFat - targetBodyFat) * 0.65),
        muscleMass: Math.round(startingMuscleMass + (targetMuscleMass - startingMuscleMass) * 0.65)
      },
      { 
        month: 'Month 5', 
        bodyFat: Math.round(startingBodyFat - (startingBodyFat - targetBodyFat) * 0.85),
        muscleMass: Math.round(startingMuscleMass + (targetMuscleMass - startingMuscleMass) * 0.85)
      },
      { 
        month: 'Month 6', 
        bodyFat: Math.round(targetBodyFat),
        muscleMass: Math.round(targetMuscleMass)
      },
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
              <linearGradient id="bodyFatGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--orange)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--orange)" stopOpacity={0.2} />
              </linearGradient>
              <linearGradient id="muscleMassGradient" x1="0" y1="0" x2="0" y2="1">
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
              dataKey="bodyFat" 
              name="Body Fat %"
              stroke="var(--orange)" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#bodyFatGradient)" 
              isAnimationActive={true}
              animationDuration={1000}
              animationEasing="ease-out"
            />
            <Area 
              type="monotone" 
              dataKey="muscleMass" 
              name="Muscle Mass %"
              stroke="#54D62C" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#muscleMassGradient)" 
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
