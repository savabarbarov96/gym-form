import React from 'react';
import { Heart, Wind, Brain, Ear, Activity, ArrowUpFromLine, Dumbbell, Footprints, HandMetal, SquareDashedBottom } from 'lucide-react';

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
    icon: <SquareDashedBottom className="w-5 h-5 text-orange" />,
    description: 'Issues when bending, climbing stairs'
  },
  { 
    id: 'back', 
    label: 'Back Pain', 
    icon: <ArrowUpFromLine className="w-5 h-5 text-orange" />,
    description: 'Discomfort when sitting or standing'
  },
  { 
    id: 'shoulders', 
    label: 'Shoulder Issues', 
    icon: <Dumbbell className="w-5 h-5 text-orange" />,
    description: 'Limited range of motion, pain'
  },
  { 
    id: 'wrists', 
    label: 'Wrist or Hand Problems', 
    icon: <HandMetal className="w-5 h-5 text-orange" />,
    description: 'Weakness, pain during movement'
  },
  { 
    id: 'ankle', 
    label: 'Ankle/Foot Pain', 
    icon: <Footprints className="w-5 h-5 text-orange" />,
    description: 'Issues with stability, discomfort'
  },
  { 
    id: 'hips', 
    label: 'Hip Problems', 
    icon: <Activity className="w-5 h-5 text-orange" />,
    description: 'Pain during movement or sitting'
  },
  { 
    id: 'heart', 
    label: 'Heart Conditions', 
    icon: <Heart className="w-5 h-5 text-orange" />,
    description: 'Any diagnosed cardiac issues'
  },
  { 
    id: 'breathing', 
    label: 'Breathing Issues', 
    icon: <Wind className="w-5 h-5 text-orange" />,
    description: 'Asthma, shortness of breath'
  },
  { 
    id: 'headaches', 
    label: 'Frequent Headaches', 
    icon: <Brain className="w-5 h-5 text-orange" />,
    description: 'Migraines, tension headaches'
  },
  { 
    id: 'hearing', 
    label: 'Hearing Problems', 
    icon: <Ear className="w-5 h-5 text-orange" />,
    description: 'Tinnitus, hearing loss'
  }
];

export default healthConcernOptions;
