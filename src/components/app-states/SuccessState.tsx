
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Mail, Dumbbell, Calendar } from "lucide-react";

const SuccessState: React.FC = () => {
  return (
    <div className="w-full max-w-xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-card rounded-lg p-8 shadow-lg"
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 20,
            delay: 0.2
          }}
          className="mx-auto mb-6 text-orange"
        >
          <CheckCircle size={80} strokeWidth={1.5} className="mx-auto" />
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-4xl font-bold mb-4"
        >
          Your Plan Is On The Way!
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-muted-foreground text-lg mb-8"
        >
          We've created your personalized workout plan and sent it to your email. 
          Get ready to transform your fitness journey!
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          <div className="bg-background p-6 rounded-lg shadow-sm">
            <Mail className="w-10 h-10 text-orange mb-3 mx-auto" />
            <h3 className="font-semibold text-lg mb-2">Check Your Inbox</h3>
            <p className="text-muted-foreground">
              Your personalized plan has been sent to your email inbox
            </p>
          </div>
          
          <div className="bg-background p-6 rounded-lg shadow-sm">
            <Calendar className="w-10 h-10 text-orange mb-3 mx-auto" />
            <h3 className="font-semibold text-lg mb-2">Start Today</h3>
            <p className="text-muted-foreground">
              Begin your fitness journey with your new custom workout plan
            </p>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="bg-orange/10 rounded-lg p-4 border border-orange/20 text-orange"
        >
          <div className="flex items-center justify-center gap-2 mb-1">
            <Dumbbell className="w-5 h-5" />
            <span className="font-medium">Pro Tip</span>
          </div>
          <p className="text-sm">
            For the best results, follow your plan consistently and track your progress!
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SuccessState;
