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
    label: 'Болки в коленете', 
    icon: <SquareDashedBottom className="w-5 h-5 text-orange" />,
    description: 'Проблеми при сгъване, изкачване на стълби'
  },
  { 
    id: 'back', 
    label: 'Болки в гърба', 
    icon: <ArrowUpFromLine className="w-5 h-5 text-orange" />,
    description: 'Дискомфорт при седене или стоене'
  },
  { 
    id: 'shoulders', 
    label: 'Проблеми с раменете', 
    icon: <Dumbbell className="w-5 h-5 text-orange" />,
    description: 'Ограничен обхват на движение, болка'
  },
  { 
    id: 'wrists', 
    label: 'Проблеми с китките/ръцете', 
    icon: <HandMetal className="w-5 h-5 text-orange" />,
    description: 'Слабост, болка при движение'
  },
  { 
    id: 'ankle', 
    label: 'Болки в глезена/стъпалото', 
    icon: <Footprints className="w-5 h-5 text-orange" />,
    description: 'Проблеми със стабилността, дискомфорт'
  },
  { 
    id: 'hips', 
    label: 'Проблеми с тазобедрената става', 
    icon: <Activity className="w-5 h-5 text-orange" />,
    description: 'Болка при движение или седене'
  },
  { 
    id: 'heart', 
    label: 'Сърдечни заболявания', 
    icon: <Heart className="w-5 h-5 text-orange" />,
    description: 'Диагностицирани сърдечни проблеми'
  },
  { 
    id: 'breathing', 
    label: 'Проблеми с дишането', 
    icon: <Wind className="w-5 h-5 text-orange" />,
    description: 'Астма, задух'
  },
  { 
    id: 'headaches', 
    label: 'Чести главоболия', 
    icon: <Brain className="w-5 h-5 text-orange" />,
    description: 'Мигрени, напрежение'
  },
  { 
    id: 'hearing', 
    label: 'Проблеми със слуха', 
    icon: <Ear className="w-5 h-5 text-orange" />,
    description: 'Шум в ушите, загуба на слух'
  }
];

export default healthConcernOptions;
