import React from 'react';
import { motion } from "framer-motion";
import PreferenceButton from './PreferenceButton';

/**
 * @typedef {"like" | "neutral" | "dislike" | null} Preference
 */

/**
 * Exercise card component for user preference selection
 * 
 * @param {Object} props - Component props
 * @param {string} props.exercise - Name of the exercise
 * @param {Preference} props.preference - Current preference selection
 * @param {function} props.onPreferenceSelect - Callback when preference is selected
 */
const ExerciseCard = ({ exercise, preference, onPreferenceSelect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="mb-8"
    >
      <div className="bg-card p-8 rounded-xl shadow-lg mb-8 h-56 flex items-center justify-center">
        <h2 className="text-3xl font-bold">{exercise}</h2>
      </div>

      <div className="flex justify-center gap-8">
        <PreferenceButton 
          type="dislike" 
          isSelected={preference === "dislike"}
          onClick={() => onPreferenceSelect("dislike")}
        />
        
        <PreferenceButton 
          type="neutral" 
          isSelected={preference === "neutral"}
          onClick={() => onPreferenceSelect("neutral")}
        />
        
        <PreferenceButton 
          type="like" 
          isSelected={preference === "like"}
          onClick={() => onPreferenceSelect("like")}
        />
      </div>
    </motion.div>
  );
};

export default ExerciseCard; 