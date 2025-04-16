import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { XCircle, ArrowLeft } from 'lucide-react';

const PaymentCanceled = () => {
  const navigate = useNavigate();
  
  return (
    <div className="w-full max-w-4xl mx-auto flex items-center justify-center min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl mx-4"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 20,
              delay: 0.2 
            }}
            className="bg-red-100 p-4 rounded-full mx-auto mb-6 w-20 h-20 flex items-center justify-center"
          >
            <XCircle size={48} className="text-red-500" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold mb-4"
          >
            Плащането е отменено
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 dark:text-gray-300 mb-8"
          >
            Вашето плащане беше отменено. Никакви средства не са удържани от Вашата сметка.
          </motion.p>
          
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-orange to-orange-600 hover:from-orange-600 hover:to-orange text-white px-6 py-3 rounded-full inline-flex items-center font-medium transition-colors"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <ArrowLeft size={18} className="mr-2" />
            Върнете се към планове
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentCanceled; 