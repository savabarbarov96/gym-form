import React from 'react';
import { motion } from 'framer-motion';
import { ChefHat, Dumbbell, CheckCircle } from 'lucide-react';

interface PlanCardProps {
  icon: React.ReactNode;
  title: string;
  imageUrl: string;
  features: string[];
  delay: number;
  gradientFrom: string;
  gradientTo: string;
}

const PlanCard: React.FC<PlanCardProps> = ({
  icon,
  title,
  imageUrl,
  features,
  delay,
  gradientFrom,
  gradientTo
}) => (
  <motion.div
    initial={{ opacity: 0, x: delay < 0.5 ? -30 : 30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
    className="bg-card p-8 rounded-xl shadow-lg relative overflow-hidden card-hover-effect"
  >
    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${gradientFrom} ${gradientTo}`}></div>
    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
      {icon}
      <span>{title}</span>
    </h2>
    <div
      className="flex justify-center mb-8 h-48 bg-cover bg-center rounded-lg"
      style={{ backgroundImage: `url('${imageUrl}')` }}
    >
      <div className="w-full h-full bg-black/30 rounded-lg flex items-center justify-center">
        <div className="bg-white/90 p-4 rounded-lg">
          {React.cloneElement(icon as React.ReactElement, { className: "h-12 w-12 text-orange mx-auto" })}
        </div>
      </div>
    </div>
    <div className="text-left space-y-4">
      {features.map((feature, index) => (
        <div key={index} className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
          <p>{feature}</p>
        </div>
      ))}
    </div>
  </motion.div>
);

export const PlanPreviewCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
      <PlanCard
        icon={<Dumbbell className="text-orange" />}
        title="Персонализиран тренировъчен план"
        imageUrl="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=2070&auto=format&fit=crop"
        features={[
          'Детайлни упражнения съобразени с Вашите предпочитания',
          'Напредваща програма според Вашето ниво',
          'Ще бъде изпратен на посочения от Вас имейл адрес',
        ]}
        delay={0.4}
        gradientFrom="from-orange/30"
        gradientTo="to-orange/70"
      />
      <PlanCard
        icon={<ChefHat className="text-orange" />}
        title="Хранителен режим"
        imageUrl="https://images.unsplash.com/photo-1576402187878-974f70c890a5?q=80&w=2033&auto=format&fit=crop"
        features={[
          'Балансирани хранителни режими според Вашите цели',
          'Съобразен с Вашите хранителни предпочитания',
          'Включва седмично меню и списък с покупки',
        ]}
        delay={0.4} // Same delay for simultaneous appearance
        gradientFrom="from-orange/50"
        gradientTo="to-orange"
      />
    </div>
  );
}; 