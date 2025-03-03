
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, TrendingDown, Dumbbell, BarChart, Calendar, Timer, Heart, Award } from "lucide-react";
import { useRive } from '@rive-app/react-canvas';
import { cn } from "@/lib/utils";

interface ResultsStateProps {
  handleGetPlan: () => void;
}

const ResultsState: React.FC<ResultsStateProps> = ({ handleGetPlan }) => {
  const { RiveComponent: BeforeRive, rive: beforeRive } = useRive({
    src: 'https://cdn.rive.app/animations/vehicles.riv',
    stateMachines: 'idle',
    autoplay: true,
  });
  
  const { RiveComponent: AfterRive, rive: afterRive } = useRive({
    src: 'https://cdn.rive.app/animations/juice.riv',
    stateMachines: 'state',
    autoplay: true,
  });
  
  // Trigger animations on hover
  useEffect(() => {
    return () => {
      if (beforeRive) {
        beforeRive.cleanup();
      }
      if (afterRive) {
        afterRive.cleanup();
      }
    };
  }, [beforeRive, afterRive]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-4xl mx-auto results-container"
    >
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-8">
          Personal summary based on your answers
        </h1>
        
        <p className="text-muted-foreground text-xl mb-16 max-w-2xl mx-auto">
          Here's what you can expect to achieve with your personalized plan
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-card p-8 rounded-lg relative overflow-hidden card-hover-effect">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange/30 to-orange/70"></div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Calendar className="text-orange" />
              <span>Current State</span>
            </h2>
            
            <div className="flex justify-center mb-8 h-48">
              <BeforeRive className="w-full h-full" />
            </div>
            
            <div className="text-left space-y-6">
              <div>
                <div className="text-muted-foreground flex items-center gap-2">
                  <TrendingDown className="w-4 h-4" />
                  Body fat
                </div>
                <div className="text-orange text-xl font-semibold">20-24%</div>
              </div>
              
              <div>
                <div className="text-muted-foreground flex items-center gap-2">
                  <Timer className="w-4 h-4" />
                  Fitness age
                </div>
                <div className="text-orange text-xl font-semibold">36</div>
              </div>
              
              <div>
                <div className="text-muted-foreground flex items-center gap-2">
                  <Dumbbell className="w-4 h-4" />
                  Body muscles
                </div>
                <div className="flex gap-1 mt-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div 
                      key={i} 
                      className={`h-2 rounded-full flex-1 ${i <= 2 ? 'bg-orange' : 'bg-muted'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-card p-8 rounded-lg relative overflow-hidden card-hover-effect">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange/50 to-orange"></div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <BarChart className="text-orange" />
              <span>After 6 months</span>
            </h2>
            
            <div className="flex justify-center mb-8 h-48">
              <AfterRive className="w-full h-full" />
            </div>
            
            <div className="text-left space-y-6">
              <div>
                <div className="text-muted-foreground flex items-center gap-2">
                  <TrendingDown className="w-4 h-4" />
                  Body fat
                </div>
                <div className="text-orange text-xl font-semibold">15-17%</div>
              </div>
              
              <div>
                <div className="text-muted-foreground flex items-center gap-2">
                  <Timer className="w-4 h-4" />
                  Fitness age
                </div>
                <div className="text-orange text-xl font-semibold">32</div>
              </div>
              
              <div>
                <div className="text-muted-foreground flex items-center gap-2">
                  <Dumbbell className="w-4 h-4" />
                  Body muscles
                </div>
                <div className="flex gap-1 mt-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div 
                      key={i} 
                      className={`h-2 rounded-full flex-1 ${i <= 4 ? 'bg-orange' : 'bg-muted'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground mb-16">
          *Results vary by individual and are not guaranteed. Your personalized plan is based on your specific information.
        </div>
        
        <motion.a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            handleGetPlan();
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-3 text-white bg-orange hover:bg-orange-hover px-12 py-4 rounded-lg text-xl font-bold transition-colors"
        >
          Get my personalized plan
          <ArrowRight size={20} />
        </motion.a>
      </div>
    </motion.div>
  );
};

export default ResultsState;
