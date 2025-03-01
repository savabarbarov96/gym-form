
import React from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const ProgressGraph = () => {
  const progressData = [
    { month: 'Month 1', progress: 10 },
    { month: 'Month 2', progress: 25 },
    { month: 'Month 3', progress: 45 },
    { month: 'Month 4', progress: 60 },
    { month: 'Month 5', progress: 80 },
    { month: 'Month 6', progress: 100 },
  ];

  return (
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
            fillOpacity={1} 
            fill="url(#progressGradient)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressGraph;
