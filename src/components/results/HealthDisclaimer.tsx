import React from 'react';
import { motion } from 'framer-motion';
import { LucideHeartPulse } from 'lucide-react';

export const HealthDisclaimer: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }} // Adjust delay as needed
      className="bg-white dark:bg-gray-800 border border-amber-200 dark:border-amber-800 p-5 rounded-lg mb-8 flex items-start gap-3 max-w-3xl mx-auto shadow-md"
    >
      <LucideHeartPulse className="text-amber-600 dark:text-amber-500 h-6 w-6 flex-shrink-0 mt-1" />
      <div className="text-sm text-gray-800 dark:text-gray-200 text-left">
        <p className="font-semibold mb-1 text-amber-800 dark:text-amber-400">Здравен съвет:</p>
        <p>Препоръчваме Ви да се консултирате с Вашия лекар преди да започнете каквато и да е тренировъчна програма или промяна на хранителния режим, особено ако имате здравословни проблеми или дълъг период на неактивност.</p>
      </div>
    </motion.div>
  );
}; 