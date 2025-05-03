import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChefHat, Dumbbell, CheckCircle, Gift, AlertCircle } from 'lucide-react';
import { useStripe, PlanType, PRODUCT_PRICES } from '@/contexts/StripeContext';

interface PricingCardProps {
  icon: React.ReactNode;
  title: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  features: { text: string; icon?: React.ReactNode; highlight?: boolean }[];
  onClick: () => void;
  isHighlighted?: boolean;
  highlightLabel?: string;
  className?: string;
  buttonText?: string;
  delay: number;
  isLoading?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({
  icon,
  title,
  price,
  originalPrice,
  discount,
  features,
  onClick,
  isHighlighted = false,
  highlightLabel = 'Най-популярен избор',
  className = '',
  buttonText = 'Поръчай сега',
  delay,
  isLoading = false
}) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      className={`relative bg-white/95 dark:bg-gray-800 rounded-2xl shadow-lg border-2 
      ${isHighlighted 
        ? 'border-orange-500 shadow-orange-300/30 dark:shadow-orange-700/30'
        : 'border-orange/20 hover:border-orange/50'} 
      overflow-hidden transition-all h-full flex flex-col ${className}`}
      whileHover={{ 
        y: -5, 
        boxShadow: isHighlighted 
          ? '0 25px 50px -12px rgba(249, 115, 22, 0.3)'
          : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
    >
      {isHighlighted && (
        <div className="absolute top-0 left-0 right-0 w-full bg-gradient-to-r from-orange to-orange-600 text-white text-center py-2 px-4 font-semibold text-sm shadow-md z-10"> 
          {highlightLabel}
        </div>
      )}
      
      <div className={`p-6 flex-grow flex flex-col ${isHighlighted ? 'pt-14' : ''}`}>
        <div className="text-center mb-4">
          {isHighlighted ? (
            <div className="inline-flex items-center justify-center mb-3">
              <div className="bg-orange/10 w-14 h-14 rounded-full flex items-center justify-center">
                <ChefHat className="text-orange h-7 w-7" />
              </div>
              <div className="mx-1 text-orange font-bold">+</div>
              <div className="bg-orange/10 w-14 h-14 rounded-full flex items-center justify-center">
                <Dumbbell className="text-orange h-7 w-7" />
              </div>
            </div>
          ) : (
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange/10 mb-3">
              {icon}
            </div>
          )}
          
          <h3 className={`font-bold ${isHighlighted ? 'text-xl' : 'text-lg'} text-gray-800 dark:text-white`}>{title}</h3>
        </div>
        
        <div className="text-center mb-5">
          {originalPrice && (
            <div className="mb-1">
              <span className="text-sm line-through text-gray-400 dark:text-gray-500">{originalPrice}</span>
            </div>
          )}
          <div className={`text-3xl font-bold ${isHighlighted ? 'bg-gradient-to-r from-orange to-orange-600 bg-clip-text text-transparent' : 'text-orange'} mb-1`}>
            {price}
          </div>
          {discount && (
            <span className="inline-block bg-orange/10 text-orange text-xs font-semibold px-3 py-1 rounded-full">
              {discount}
            </span>
          )}
        </div>
        
        <ul className="space-y-3 mb-6 text-sm text-gray-700 dark:text-gray-200 flex-grow">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              {feature.icon ? feature.icon : <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />}
              <span className={feature.highlight ? 'font-medium' : ''}>{feature.text}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className={`px-6 pb-6 ${isHighlighted ? 'pt-2' : 'pt-0'}`}>
        <button
          onClick={onClick}
          disabled={isLoading}
          className={`w-full py-3.5 rounded-xl font-semibold transition-all text-white
          ${isHighlighted 
            ? 'bg-gradient-to-r from-orange to-orange-600 hover:from-orange-600 hover:to-orange shadow-lg hover:shadow-xl relative overflow-hidden group' 
            : 'bg-gradient-to-r from-orange/90 to-orange hover:from-orange hover:to-orange-600 shadow-md hover:shadow-lg'}
          ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Зареждане...
            </span>
          ) : (
            <span className={isHighlighted ? "relative z-10" : ""}>{buttonText}</span>
          )}
          {isHighlighted && <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>}
        </button>
      </div>
    </motion.div>
  );
};

interface PricingOptionsProps {
  // No props needed anymore as we use the Stripe context
}

export const PricingOptions: React.FC<PricingOptionsProps> = () => {
  const { handleCheckout, isStripeLoading, stripeError } = useStripe();
  const [loading, setLoading] = useState<PlanType | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePlanSelect = async (planType: PlanType) => {
    if (isStripeLoading) {
      setError('Платежният процесор все още се зарежда. Моля, опитайте отново след момент.');
      return;
    }

    if (stripeError) {
      setError('Възникна проблем при зареждането на платежния процесор. Моля, опитайте отново по-късно.');
      return;
    }

    try {
      setLoading(planType);
      setError(null);
      
      console.log(`Initiating checkout for plan: ${planType}`);
      const success = await handleCheckout(planType);
      
      if (!success) {
        setError('Процесът на плащане не може да бъде стартиран. Моля, опитайте отново.');
      }
      
      // Note: If successful, the page will redirect so we don't need to update state
    } catch (error) {
      console.error('Checkout error:', error);
      setError('Възникна неочаквана грешка. Моля, опитайте отново.');
    } finally {
      // In case checkout fails or there's an error that doesn't redirect
      setLoading(null);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        delay: 0.6,
        staggerChildren: 0.15
      } 
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="px-4 py-6 md:p-10 bg-transparent rounded-xl mb-8 mx-auto w-full max-w-6xl"
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center bg-gradient-to-r from-orange to-orange-600 bg-clip-text text-transparent">
        Изберете своя план
      </h2>
      
      <div className="text-center mb-8 text-sm text-white dark:text-white max-w-2xl mx-auto">
        <p>След избор на план, ще изпратим вашата поръчка и ще създадем персонализирана програма,
        която ще бъде изпратена на вашия имейл адрес.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
        <PricingCard
          icon={<ChefHat className="text-orange h-9 w-9" />}
          title="Хранителен режим"
          price={PRODUCT_PRICES.meal}
          features={[
            { text: 'Седмично меню' },
            { text: 'Списък с покупки' },
            { text: 'Персонализиран режим' },
          ]}
          onClick={() => handlePlanSelect('meal')}
          delay={0}
          isLoading={loading === 'meal'}
        />
        
        <PricingCard
          icon={<><ChefHat className="text-orange h-7 w-7" /><Dumbbell className="text-orange h-7 w-7" /></>}
          title="Комбиниран план"
          price={PRODUCT_PRICES.combined}
          originalPrice="120 лева"
          discount="Спестявате 19%"
          features={[
            { text: 'Пълен хранителен режим' },
            { text: 'Пълен тренировъчен план' },
            { text: 'Интегрирана програма' },
            { text: 'Максимално бърз резултат', highlight: true },
            { text: 'Подарък: Брошура с рецепти', icon: <Gift className="w-5 h-5 text-orange flex-shrink-0 mt-0.5" />, highlight: true },
          ]}
          onClick={() => handlePlanSelect('combined')}
          isHighlighted={true}
          delay={0}
          isLoading={loading === 'combined'}
        />
        
        <PricingCard
          icon={<Dumbbell className="text-orange h-9 w-9" />}
          title="Тренировъчен план"
          price={PRODUCT_PRICES.workout}
          features={[
            { text: 'Персонализирани тренировки' },
            { text: 'Инструкции за изпълнение' },
            { text: 'Прогресивна програма' },
          ]}
          onClick={() => handlePlanSelect('workout')}
          delay={0}
          isLoading={loading === 'workout'}
        />
      </div>
      
      <p className="text-white dark:text-white text-center mt-8 text-sm max-w-xl mx-auto">
        Цените са за еднократно генериране на персонализиран план.
      </p>
      
      {error && (
        <div className="mt-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span className="block sm:inline">{error}</span>
          </div>
        </div>
      )}
      
      {stripeError && (
        <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Грешка:</strong>
          <span className="block sm:inline"> Възникна проблем при зареждането на платежния процесор. Моля, опитайте отново по-късно.</span>
        </div>
      )}
    </motion.div>
  );
}; 