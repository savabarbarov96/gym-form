import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Sparkles } from 'lucide-react';

interface HighlightCardProps {
  icon: React.ReactNode;
  text: string;
}

const HighlightCard: React.FC<HighlightCardProps> = ({ icon, text }) => (
  <div className="bg-card p-4 rounded-lg flex items-center gap-3 flex-1 w-full">
    {icon}
    <p className="text-sm text-left">{text}</p>
  </div>
);

export const ResultHighlights: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }} // Adjust delay as needed
      className="flex flex-col md:flex-row gap-4 justify-center items-center max-w-2xl mx-auto mb-8"
    >
      <HighlightCard 
        icon={<FileText className="text-orange h-8 w-8 flex-shrink-0" />} 
        text="PDF формат, удобен за принтиране и преглед на всяко устройство"
      />
      <HighlightCard 
        icon={<Sparkles className="text-orange h-8 w-8 flex-shrink-0" />} 
        text="Бонус съвети за максимизиране на резултатите"
      />
    </motion.div>
  );
}; 