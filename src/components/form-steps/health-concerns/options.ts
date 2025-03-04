
import React from 'react';
import { motion } from 'framer-motion';
import { Ear, Brain, Heart, Wind } from 'lucide-react';

export interface HealthConcernOption {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
}

const healthConcernOptions: HealthConcernOption[] = [
  { 
    id: 'knees', 
    label: 'Knee Pain', 
    icon: <motion.div className="relative"><motion.div className="w-6 h-1 absolute top-3.5 left-0 bg-orange"></motion.div><motion.div className="w-1 h-8 absolute top-0 left-2.5 bg-orange"></motion.div></motion.div>,
    description: 'Issues when bending, climbing stairs'
  },
  { 
    id: 'back', 
    label: 'Back Pain', 
    icon: <motion.div className="relative"><motion.div className="w-6 h-1 absolute top-3.5 left-0 bg-orange transform rotate-90"></motion.div><motion.div className="w-1 h-8 absolute top-0 left-2.5 bg-orange"></motion.div></motion.div>,
    description: 'Discomfort when sitting or standing'
  },
  { 
    id: 'shoulders', 
    label: 'Shoulder Issues', 
    icon: <motion.div className="relative"><motion.div className="w-6 h-1 absolute top-1 left-0 bg-orange transform rotate-45"></motion.div><motion.div className="w-6 h-1 absolute top-1 left-0 bg-orange transform -rotate-45"></motion.div></motion.div>,
    description: 'Limited range of motion, pain'
  },
  { 
    id: 'wrists', 
    label: 'Wrist or Hand Problems', 
    icon: <motion.div className="relative"><motion.div className="w-4 h-4 absolute top-1 left-1 border-2 border-orange rounded"></motion.div></motion.div>,
    description: 'Weakness, pain during movement'
  },
  { 
    id: 'ankle', 
    label: 'Ankle/Foot Pain', 
    icon: <motion.div className="relative"><motion.div className="w-6 h-1 absolute top-3.5 left-0 bg-orange"></motion.div><motion.div className="w-1 h-6 absolute top-1 left-1 bg-orange transform rotate-45"></motion.div></motion.div>,
    description: 'Issues with stability, discomfort'
  },
  { 
    id: 'hips', 
    label: 'Hip Problems', 
    icon: <motion.div className="relative"><motion.div className="w-6 h-1 absolute top-3.5 left-0 bg-orange"></motion.div><motion.div className="w-1 h-8 absolute top-0 left-5 bg-orange transform rotate-45"></motion.div></motion.div>,
    description: 'Pain during movement or sitting'
  },
  { 
    id: 'heart', 
    label: 'Heart Conditions', 
    icon: <Heart className="w-6 h-6 text-orange" />,
    description: 'Any diagnosed cardiac issues'
  },
  { 
    id: 'breathing', 
    label: 'Breathing Issues', 
    icon: <Wind className="w-6 h-6 text-orange" />,
    description: 'Asthma, shortness of breath'
  },
  { 
    id: 'headaches', 
    label: 'Frequent Headaches', 
    icon: <Brain className="w-6 h-6 text-orange" />,
    description: 'Migraines, tension headaches'
  },
  { 
    id: 'hearing', 
    label: 'Hearing Problems', 
    icon: <Ear className="w-6 h-6 text-orange" />,
    description: 'Tinnitus, hearing loss'
  }
];

export default healthConcernOptions;
