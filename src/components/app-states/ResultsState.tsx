import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Eye, ClipboardList } from "lucide-react";
import { loadStripe } from '@stripe/stripe-js';
import { useSurvey } from "@/contexts/SurveyContext";
import { SummaryDialog } from "@/components/results/SummaryDialog";
import { PlanPreviewCards } from "@/components/results/PlanPreviewCards";
import { PricingModal } from "@/components/results/PricingModal";
import { ResultHighlights } from "@/components/results/ResultHighlights";
import { HealthDisclaimer } from "@/components/results/HealthDisclaimer";
import { Button } from "@/components/ui/button";

// Initialize Stripe outside of the component render cycle
const stripePromise = loadStripe('pk_live_51RBLsSP3RUANtq4LgJlJgCZhnHBzLGOPCjc3yIo8Kl8Wh6mFog3jLTJCSmh8rO0oSTgIaYWvBatR4oHbnJ5ye5u5005KAvJkCM');

interface ResultsStateProps {
  // handleGetPlan: () => void; // Removed
  // handleGetMealPlan: () => void; // Removed
  // handleGetWorkoutPlan: () => void; // Removed
}

const ResultsState: React.FC<ResultsStateProps> = ({ 
  // handleGetPlan, // Removed
  // handleGetMealPlan, // Removed
  // handleGetWorkoutPlan // Removed
}) => {
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const { formData } = useSurvey();
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-4xl mx-auto results-container"
    >
      <div className="text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl font-bold mb-8 bg-gradient-to-r from-orange to-orange-600 bg-clip-text text-transparent"
        >
          Персонално обобщение въз основа на Вашите отговори
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground text-xl mb-8 max-w-2xl mx-auto"
        >
          Благодарим за отделеното време. Ето какво можете да очаквате да получите:
        </motion.p>
        
        {/* Summary Dialog Trigger Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 p-1 rounded-2xl shadow-md mb-12 max-w-md mx-auto overflow-hidden"
        >
          <motion.button
            onClick={() => setShowSummary(true)}
            className="w-full py-3 bg-gradient-to-r from-orange to-orange-600 hover:from-orange-600 hover:to-orange text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Eye size={20} />
            Преглед на въведените данни
            <ClipboardList size={20} />
          </motion.button>
        </motion.div>
          
        {/* Use the SummaryDialog component */}
        <SummaryDialog 
          open={showSummary} 
          onOpenChange={setShowSummary} 
          formData={formData} 
        />
        
        {/* Use the PlanPreviewCards component */}
        <PlanPreviewCards />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-orange to-orange-600 p-1 rounded-2xl shadow-xl mb-8 max-w-2xl mx-auto"
          whileHover={{ scale: 1.02, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
        >
          <div className="bg-white dark:bg-gray-900 rounded-xl p-1">
            <motion.button 
              onClick={() => setShowPricingModal(true)}
              className="w-full bg-gradient-to-r from-orange to-orange-600 hover:from-orange-600 hover:to-orange text-white px-8 py-6 rounded-xl text-xl font-bold transition-all flex items-center justify-center gap-3"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Mail size={24} />
              Получете моя персонализиран план
              <ArrowRight size={24} />
            </motion.button>
          </div>
        </motion.div>
        
        {/* Use the PricingModal component */}
        <PricingModal 
          open={showPricingModal} 
          onOpenChange={setShowPricingModal} 
        />
        
        {/* Use the ResultHighlights component */}
        <ResultHighlights />
        
        {/* Use the HealthDisclaimer component */}
        <HealthDisclaimer />
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-xs text-muted-foreground mb-8"
        >
          *Персонализираният план се изпраща само на посочения от Вас имейл адрес. Ако не сте предоставили имейл, ще трябва да го въведете на следващата стъпка.
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ResultsState; 