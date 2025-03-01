
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface ResultsStateProps {
  handleGetPlan: () => void;
}

const ResultsState: React.FC<ResultsStateProps> = ({ handleGetPlan }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-4xl mx-auto results-container"
    >
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-16">
          Personal summary based on your answers
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-card p-6 rounded-lg">
            <img 
              src="/lovable-uploads/40fb59b5-9510-4b7b-bb48-eec384b61f02.png"
              alt="Current body" 
              className="max-h-96 mx-auto"
            />
            <div className="mt-4 text-xl font-bold">Now</div>
            
            <div className="mt-6 text-left">
              <div className="mb-4">
                <div className="text-muted-foreground">Body fat</div>
                <div className="text-orange text-xl font-semibold">20-24%</div>
              </div>
              
              <div className="mb-4">
                <div className="text-muted-foreground">Fitness age</div>
                <div className="text-orange text-xl font-semibold">36</div>
              </div>
              
              <div>
                <div className="text-muted-foreground">Body muscles</div>
                <div className="flex gap-1 mt-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div 
                      key={i} 
                      className={`h-1 flex-1 ${i <= 2 ? 'bg-orange' : 'bg-muted'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-card p-6 rounded-lg">
            <img 
              src="/lovable-uploads/6a426793-a78f-42c3-9449-6deaf13b0f41.png"
              alt="Goal body" 
              className="max-h-96 mx-auto"
            />
            <div className="mt-4 text-xl font-bold">6 months</div>
            
            <div className="mt-6 text-left">
              <div className="mb-4">
                <div className="text-muted-foreground">Body fat</div>
                <div className="text-orange text-xl font-semibold">15-17%</div>
              </div>
              
              <div className="mb-4">
                <div className="text-muted-foreground">Fitness age</div>
                <div className="text-orange text-xl font-semibold">32</div>
              </div>
              
              <div>
                <div className="text-muted-foreground">Body muscles</div>
                <div className="flex gap-1 mt-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div 
                      key={i} 
                      className={`h-1 flex-1 ${i <= 4 ? 'bg-orange' : 'bg-muted'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground mb-16">
          *The image is not intended to represent the user. Results vary per person and are not guaranteed.
        </div>
        
        <motion.a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            handleGetPlan();
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 text-white bg-orange hover:bg-orange-hover px-12 py-4 rounded-lg text-xl font-medium transition-colors"
        >
          Get my plan
          <ArrowRight size={20} />
        </motion.a>
      </div>
    </motion.div>
  );
};

export default ResultsState;
