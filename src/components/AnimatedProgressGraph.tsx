
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

  // Adjust expected progress based on goal value with smoother curves
  useEffect(() => {
    if (animationComplete) return;
    
    // Calculate the starting body fat and muscle mass with realistic values
    const startingBodyFat = goalValue;
    const targetBodyFat = Math.max(startingBodyFat * 0.65, 10); // Target is 65% of starting, min 10%
    const startingMuscleMass = 30; // Arbitrary starting point
    const targetMuscleMass = 55; // Target muscle mass - more realistic

    // Create smoother curve with cubic bezier type transitions
    const finalData = [
      { 
        month: 'Month 1', 
        bodyFat: startingBodyFat,
        muscleMass: startingMuscleMass
      },
      { 
        month: 'Month 2', 
        bodyFat: startingBodyFat - (startingBodyFat - targetBodyFat) * 0.2,
        muscleMass: startingMuscleMass + (targetMuscleMass - startingMuscleMass) * 0.25
      },
      { 
        month: 'Month 3', 
        bodyFat: startingBodyFat - (startingBodyFat - targetBodyFat) * 0.4,
        muscleMass: startingMuscleMass + (targetMuscleMass - startingMuscleMass) * 0.5
      },
      { 
        month: 'Month 4', 
        bodyFat: startingBodyFat - (startingBodyFat - targetBodyFat) * 0.65,
        muscleMass: startingMuscleMass + (targetMuscleMass - startingMuscleMass) * 0.7
      },
      { 
        month: 'Month 5', 
        bodyFat: startingBodyFat - (startingBodyFat - targetBodyFat) * 0.85,
        muscleMass: startingMuscleMass + (targetMuscleMass - startingMuscleMass) * 0.9
      },
      { 
        month: 'Month 6', 
        bodyFat: targetBodyFat,
        muscleMass: targetMuscleMass
      },
    ];

    // Round values for cleaner display
    const roundedData = finalData.map(item => ({
      month: item.month,
      bodyFat: Math.round(item.bodyFat * 10) / 10,
      muscleMass: Math.round(item.muscleMass * 10) / 10
    }));
    
    // Animate the data points with smoother transitions
    let currentIndex = 0;
    const animateNextPoint = () => {
      if (currentIndex < roundedData.length) {
        setProgressData(prevData => {
          const newData = [...prevData];
          newData[currentIndex] = roundedData[currentIndex];
          return newData;
        });
        currentIndex++;
        setTimeout(animateNextPoint, 400);
      } else {
        setAnimationComplete(true);
      }
    };
    
    animateNextPoint();
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
              animationDuration={1500}
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
              animationDuration={1500}
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
