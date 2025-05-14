import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { X, ChefHat, Dumbbell, CheckCircle, Gift, Loader2 } from "lucide-react";
import { motion } from 'framer-motion';
import { useStripe, PlanType, PRODUCT_PRICES } from '@/contexts/StripeContext';

// Define animations in the global CSS file
const fadeIn = "animate-in fade-in duration-200";
const fadeOut = "animate-out fade-out duration-200"; 
const scaleIn = "animate-in zoom-in-95 duration-200";
const scaleOut = "animate-out zoom-out-95 duration-200";

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
  isLoading = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className={`relative bg-white/95 dark:bg-gray-800/95 rounded-xl shadow-md border 
      ${isHighlighted 
        ? 'border-orange-500 shadow-orange-300/30 dark:shadow-orange-700/30'
        : 'border-orange/20'} 
      overflow-hidden h-full flex flex-col ${className}`}
    >
      {isHighlighted && (
        <div className="absolute top-0 left-0 right-0 w-full bg-gradient-to-r from-orange to-orange-600 text-white text-center py-1.5 px-4 font-semibold text-sm"> 
          {highlightLabel}
        </div>
      )}
      
      <div className={`p-5 flex-grow flex flex-col ${isHighlighted ? 'pt-10' : ''}`}>
        <div className="text-center mb-3">
          {isHighlighted ? (
            <div className="inline-flex items-center justify-center mb-2">
              <div className="bg-orange/10 w-10 h-10 rounded-full flex items-center justify-center">
                <ChefHat className="text-orange h-5 w-5" />
              </div>
              <div className="mx-1 text-orange font-bold">+</div>
              <div className="bg-orange/10 w-10 h-10 rounded-full flex items-center justify-center">
                <Dumbbell className="text-orange h-5 w-5" />
              </div>
            </div>
          ) : (
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-orange/10 mb-2">
              {icon}
            </div>
          )}
          
          <h3 className={`font-bold ${isHighlighted ? 'text-lg' : 'text-base'} text-gray-800 dark:text-white`}>{title}</h3>
        </div>
        
        <div className="text-center mb-4">
          {originalPrice && (
            <div className="mb-1">
              <span className="text-sm line-through text-gray-400 dark:text-gray-500">{originalPrice}</span>
            </div>
          )}
          <div className={`text-2xl font-bold ${isHighlighted ? 'text-orange-600' : 'text-orange'} mb-1`}>
            {price}
          </div>
          {discount && (
            <span className="inline-block bg-orange/10 text-orange text-xs font-semibold px-3 py-1 rounded-full">
              {discount}
            </span>
          )}
        </div>
        
        <ul className="space-y-2 mb-4 text-sm text-gray-700 dark:text-gray-200 flex-grow">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              {feature.icon ? feature.icon : <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />}
              <span className={feature.highlight ? 'font-medium' : ''}>{feature.text}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="px-5 pb-5">
        <button
          onClick={onClick}
          disabled={isLoading}
          className={`w-full py-3 rounded-lg font-semibold transition-all text-white
          ${isHighlighted 
            ? 'bg-gradient-to-r from-orange to-orange-600 hover:brightness-105' 
            : 'bg-orange hover:brightness-105'}
          ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Зареждане...
            </span>
          ) : (
            buttonText
          )}
        </button>
      </div>
    </motion.div>
  );
};

interface PricingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({ open, onOpenChange }) => {
  const { handleCheckout, isStripeLoading, stripeError } = useStripe();
  const [loading, setLoading] = useState<PlanType | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePlanSelection = async (selectedPlan: PlanType) => {
    if (isStripeLoading) {
      console.log("Payment processor is still initializing. Please try again in a moment.");
      return;
    }

    if (stripeError) {
      console.error("There was a problem loading the payment processor. Please try again later.");
      return;
    }

    setIsProcessing(true);
    setLoading(selectedPlan);

    try {
      const success = await handleCheckout(selectedPlan);
      if (!success) {
        console.error("Checkout failed. Please try again.");
      }
      // We don't close the modal here as the redirectToCheckout will navigate away
    } catch (error) {
      console.error("Error during checkout:", error);
    } finally {
      setIsProcessing(false);
      // Set loading to null after a short delay
      setTimeout(() => {
        setLoading(null);
      }, 1000);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="animate-scale-in max-w-[95vw] md:max-w-4xl bg-white/95 dark:bg-gray-900/95 border border-orange/30 p-4 md:p-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex justify-between items-center space-y-0 pb-3 mb-4 border-b border-orange/20 sticky top-0 bg-white/95 dark:bg-gray-900/95 z-10">
          <DialogTitle className="text-xl md:text-2xl font-bold text-gradient-to-r bg-gradient-to-r from-orange to-orange-600 bg-clip-text text-transparent">
            Изберете своя план
          </DialogTitle>
          <DialogClose className="rounded-full p-1.5 bg-orange-100 hover:bg-orange-200 text-orange-700">
            <X className="h-5 w-5" />
          </DialogClose>
        </DialogHeader>

        <div className="text-center mb-6 text-sm text-gray-700 dark:text-gray-200 max-w-2xl mx-auto">
          <p>След избор на план, ще изпратим вашата поръчка и ще създадем персонализирана програма,
          която ще бъде изпратена на вашия имейл адрес.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
          <PricingCard
            icon={<ChefHat className="text-orange h-5 w-5" />}
            title="Хранителен режим"
            price={PRODUCT_PRICES.meal}
            features={[
              { text: 'Седмично меню' },
              { text: 'Списък с покупки' },
              { text: 'Персонализиран режим' },
            ]}
            onClick={() => handlePlanSelection('meal')}
            isLoading={loading === 'meal'}
          />
          
          <PricingCard
            icon={<></>}
            title="Комбиниран план"
            price={PRODUCT_PRICES.combined}
            originalPrice="120 лева"
            discount="Спестявате 19%"
            features={[
              { text: 'Пълен хранителен режим' },
              { text: 'Пълен тренировъчен план' },
              { text: 'Интегрирана програма' },
              { text: 'Максимално бърз резултат', highlight: true },
              { text: 'Подарък: Брошура с рецепти', icon: <Gift className="w-4 h-4 text-orange flex-shrink-0 mt-0.5" />, highlight: true },
            ]}
            onClick={() => handlePlanSelection('combined')}
            isHighlighted={true}
            isLoading={loading === 'combined'}
          />
          
          <PricingCard
            icon={<Dumbbell className="text-orange h-5 w-5" />}
            title="Тренировъчен план"
            price={PRODUCT_PRICES.workout}
            features={[
              { text: 'Персонализирани тренировки' },
              { text: 'Инструкции за изпълнение' },
              { text: 'Прогресивна програма' },
            ]}
            onClick={() => handlePlanSelection('workout')}
            isLoading={loading === 'workout'}
          />
        </div>
        
        <p className="text-center mt-6 text-xs text-gray-600 dark:text-gray-300">
          Цените са за еднократно генериране на персонализиран план.
        </p>

        {stripeError && (
          <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Грешка:</strong>
            <span className="block sm:inline"> Възникна проблем при зареждането на платежния процесор. Моля, опитайте отново по-късно.</span>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};