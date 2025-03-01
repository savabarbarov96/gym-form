
import React from "react";
import AnimatedProgressGraph from "@/components/AnimatedProgressGraph";

interface ProgressGraphStepProps {
  goalValue: number;
}

const ProgressGraphStep = ({ goalValue }: ProgressGraphStepProps) => {
  return (
    <div className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold mb-12">Your Fitness Journey</h1>
      
      <div className="max-w-4xl mx-auto">
        <AnimatedProgressGraph goalValue={goalValue} />
      </div>
    </div>
  );
};

export default ProgressGraphStep;
