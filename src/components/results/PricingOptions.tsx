import React from 'react';
import { motion } from 'framer-motion';
import { ChefHat, Dumbbell, CheckCircle, Gift } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe outside of the component render cycle
// Use the same key as in ResultsState.tsx
const stripePromise = loadStripe('pk_test_51RBLsb09RSewZPYHj4dcfAEVrBAIffaPwo6AfJLbRl6rJOE8WpTMvoxMzCMmepUZEGzz5XV9ZInhjL5fYXA3wiar00iu9d2Elm');

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
  delay
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
          className={`w-full py-3.5 rounded-xl font-semibold transition-all text-white
          ${isHighlighted 
            ? 'bg-gradient-to-r from-orange to-orange-600 hover:from-orange-600 hover:to-orange shadow-lg hover:shadow-xl relative overflow-hidden group' 
            : 'bg-gradient-to-r from-orange/90 to-orange hover:from-orange hover:to-orange-600 shadow-md hover:shadow-lg'}`}
        >
          <span className={isHighlighted ? "relative z-10" : ""}>{buttonText}</span>
          {isHighlighted && <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>}
        </button>
      </div>
    </motion.div>
  );
};

interface PricingOptionsProps {
  // handleGetPlan: () => void; // Removed
  // handleGetMealPlan: () => void; // Removed
  // handleGetWorkoutPlan: () => void; // Removed
}

export const PricingOptions: React.FC<PricingOptionsProps> = ({
  // handleGetPlan, // Removed
  // handleGetMealPlan, // Removed
  // handleGetWorkoutPlan // Removed
}) => {

  const handleStripeCheckout = async (priceId: string, planType: 'workout' | 'meal' | 'combined') => {
    const stripe = await stripePromise;
    if (!stripe) {
      console.error("Stripe.js has not loaded yet.");
      return;
    }

    const { error } = await stripe.redirectToCheckout({
      lineItems: [{ price: priceId, quantity: 1 }],
      mode: 'payment',
      successUrl: `${window.location.origin}/payment-success?session_id={CHECKOUT_SESSION_ID}_${planType}`,
      cancelUrl: `${window.location.origin}/payment-canceled`,
    });

    if (error) {
      console.error("Stripe checkout error:", error.message);
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
          price="60 лева"
          features={[
            { text: 'Седмично меню' },
            { text: 'Списък с покупки' },
            { text: 'Персонализиран режим' },
          ]}
          onClick={() => handleStripeCheckout('price_1RBwp509RSewZPYHEKr9LQzp', 'meal')}
          delay={0}
        />
        
        <PricingCard
          icon={<><ChefHat className="text-orange h-7 w-7" /><Dumbbell className="text-orange h-7 w-7" /></>}
          title="Комбиниран план"
          price="97 лева"
          originalPrice="120 лева"
          discount="Спестявате 19%"
          features={[
            { text: 'Пълен хранителен режим' },
            { text: 'Пълен тренировъчен план' },
            { text: 'Интегрирана програма' },
            { text: 'Максимално бърз резултат', highlight: true },
            { text: 'Подарък: Брошура с рецепти', icon: <Gift className="w-5 h-5 text-orange flex-shrink-0 mt-0.5" />, highlight: true },
          ]}
          onClick={() => handleStripeCheckout('price_1RBwqy09RSewZPYHofVF49Uy', 'combined')}
          isHighlighted={true}
          delay={0}
        />
        
        <PricingCard
          icon={<Dumbbell className="text-orange h-9 w-9" />}
          title="Тренировъчен план"
          price="60 лева"
          features={[
            { text: 'Персонализирани тренировки' },
            { text: 'Инструкции за изпълнение' },
            { text: 'Прогресивна програма' },
          ]}
          onClick={() => handleStripeCheckout('price_1RBwo109RSewZPYHEBeKTIbm', 'workout')}
          delay={0}
        />
      </div>
      
      <p className="text-white dark:text-white text-center mt-8 text-sm max-w-xl mx-auto">
        Цените са за еднократно генериране на персонализиран план.
      </p>
    </motion.div>
  );
}; 