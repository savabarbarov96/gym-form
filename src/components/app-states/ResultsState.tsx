import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  ChefHat, 
  Dumbbell, 
  Calendar, 
  CheckCircle, 
  Heart, 
  Award, 
  Mail, 
  FileText,
  Sparkles,
  LucideHeartPulse
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ResultsStateProps {
  handleGetPlan: () => void;
  handleGetMealPlan: () => void;
  handleGetWorkoutPlan: () => void;
}

const ResultsState: React.FC<ResultsStateProps> = ({ 
  handleGetPlan,
  handleGetMealPlan,
  handleGetWorkoutPlan 
}) => {
  const [showPricing, setShowPricing] = useState(false);
  
  const handleShowPricing = () => {
    setShowPricing(true);
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-4xl mx-auto results-container"
    >
      <div className="text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl font-bold mb-8 bg-gradient-to-r from-orange to-orange-600 bg-clip-text text-transparent"
        >
          Персонално обобщение въз основа на Вашите отговори
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground text-xl mb-16 max-w-2xl mx-auto"
        >
          Благодарим за отделеното време. Ето какво можете да очаквате да получите:
        </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card p-8 rounded-xl shadow-lg relative overflow-hidden card-hover-effect"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange/30 to-orange/70"></div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Dumbbell className="text-orange" />
              <span>Персонализиран тренировъчен план</span>
            </h2>
            
            <div className="flex justify-center mb-8 h-48 bg-cover bg-center rounded-lg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=2070&auto=format&fit=crop')" }}>
              <div className="w-full h-full bg-black/30 rounded-lg flex items-center justify-center">
                <div className="bg-white/90 p-4 rounded-lg">
                  <Dumbbell className="h-12 w-12 text-orange mx-auto" />
                </div>
              </div>
            </div>
            
            <div className="text-left space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <p>Детайлни упражнения съобразени с Вашите предпочитания</p>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <p>Напредваща програма според Вашето ниво</p>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <p>Ще бъде изпратен на посочения от Вас имейл адрес</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card p-8 rounded-xl shadow-lg relative overflow-hidden card-hover-effect"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange/50 to-orange"></div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <ChefHat className="text-orange" />
              <span>Хранителен режим</span>
            </h2>
            
            <div className="flex justify-center mb-8 h-48 bg-cover bg-center rounded-lg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1576402187878-974f70c890a5?q=80&w=2033&auto=format&fit=crop')" }}>
              <div className="w-full h-full bg-black/30 rounded-lg flex items-center justify-center">
                <div className="bg-white/90 p-4 rounded-lg">
                  <ChefHat className="h-12 w-12 text-orange mx-auto" />
                </div>
              </div>
            </div>
            
            <div className="text-left space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <p>Балансирани хранителни режими според Вашите цели</p>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <p>Съобразен с Вашите хранителни предпочитания</p>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <p>Включва седмично меню и списък с покупки</p>
              </div>
            </div>
          </motion.div>
        </div>
        
        {!showPricing ? (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-r from-orange to-orange-600 p-1 rounded-2xl shadow-xl mb-8 max-w-2xl mx-auto"
            whileHover={{ scale: 1.02, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
          >
            <div className="bg-white dark:bg-gray-900 rounded-xl p-1">
              <motion.button 
                onClick={handleShowPricing}
                className="w-full bg-gradient-to-r from-orange to-orange-600 hover:from-orange-600 hover:to-orange text-white px-8 py-6 rounded-xl text-xl font-bold transition-all flex items-center justify-center gap-3"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Mail size={24} />
                Получете моя персонализиран план
                <ArrowRight size={24} />
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 rounded-xl shadow-xl mb-8 max-w-2xl mx-auto border border-gray-200 dark:border-gray-800"
          >
            <h2 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-orange to-orange-600 bg-clip-text text-transparent">Изберете своя план</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Meal Plan Option */}
              <motion.div 
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-2 border-orange/20 hover:border-orange transition-all overflow-hidden relative"
                whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-orange/10 rounded-full -mr-8 -mt-8"></div>
                <div className="text-center mb-4 relative">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange/10 mb-3">
                    <ChefHat className="text-orange h-9 w-9" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-800 dark:text-white">Хранителен режим</h3>
                  <div className="text-3xl font-bold text-orange mt-3 mb-1">60 лева</div>
                </div>
                
                <ul className="space-y-3 mb-5 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Седмично меню</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Списък с покупки</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Персонализиран режим</span>
                  </li>
                </ul>
                
                <button 
                  onClick={handleGetMealPlan}
                  className="w-full py-3 bg-gradient-to-r from-orange/90 to-orange hover:from-orange hover:to-orange-600 text-white rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
                >
                  Поръчай сега
                </button>
              </motion.div>
              
              {/* Combined Plan Option - Highlighted as best value */}
              <motion.div 
                className="bg-white dark:bg-gray-800 p-7 rounded-xl shadow-xl border-2 border-orange relative transform scale-105 md:scale-110 z-10 overflow-visible mt-6 md:mt-8"
                whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
              >
                <div className="absolute -top-14 -right-14 w-28 h-28 bg-orange/20 rounded-full transform rotate-12"></div>
                <div className="absolute -bottom-14 -left-14 w-28 h-28 bg-orange/20 rounded-full"></div>
                
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-max px-6 py-1.5 bg-gradient-to-r from-orange to-orange-600 text-white text-sm font-semibold rounded-full shadow-lg">
                  Най-популярен избор
                </div>
                
                <div className="text-center mb-4 relative pt-4">
                  <div className="inline-flex items-center justify-center mb-3">
                    <div className="bg-orange/10 w-14 h-14 rounded-full flex items-center justify-center">
                      <ChefHat className="text-orange h-7 w-7" />
                    </div>
                    <div className="mx-1 text-orange font-bold">+</div>
                    <div className="bg-orange/10 w-14 h-14 rounded-full flex items-center justify-center">
                      <Dumbbell className="text-orange h-7 w-7" />
                    </div>
                  </div>
                  <h3 className="font-bold text-xl text-gray-800 dark:text-white">Комбиниран план</h3>
                  <div className="mt-2 mb-1">
                    <span className="text-sm line-through text-gray-400 dark:text-gray-500">120 лева</span>
                  </div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-orange to-orange-600 bg-clip-text text-transparent mb-2">97 лева</div>
                  <span className="inline-block bg-orange/10 text-orange text-xs font-semibold px-2 py-1 rounded-full">
                    Спестявате 19%
                  </span>
                </div>
                
                <ul className="space-y-3 mb-6 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Пълен хранителен режим</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Пълен тренировъчен план</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Интегрирана програма</span>
                  </li>
                </ul>
                
                <button 
                  onClick={handleGetPlan}
                  className="w-full py-3.5 bg-gradient-to-r from-orange to-orange-600 hover:from-orange-600 hover:to-orange text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all relative overflow-hidden group"
                >
                  <span className="relative z-10">Поръчай сега</span>
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                </button>
              </motion.div>
              
              {/* Workout Plan Option */}
              <motion.div 
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-2 border-orange/20 hover:border-orange transition-all overflow-hidden relative"
                whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-orange/10 rounded-full -mr-8 -mt-8"></div>
                <div className="text-center mb-4 relative">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange/10 mb-3">
                    <Dumbbell className="text-orange h-9 w-9" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-800 dark:text-white">Тренировъчен план</h3>
                  <div className="text-3xl font-bold text-orange mt-3 mb-1">60 лева</div>
                </div>
                
                <ul className="space-y-3 mb-5 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Персонализирани тренировки</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Инструкции за изпълнение</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Прогресивна програма</span>
                  </li>
                </ul>
                
                <button 
                  onClick={handleGetWorkoutPlan}
                  className="w-full py-3 bg-gradient-to-r from-orange/90 to-orange hover:from-orange hover:to-orange-600 text-white rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
                >
                  Поръчай сега
                </button>
              </motion.div>
            </div>
            
            <p className="text-muted-foreground text-center mt-8 text-sm">
              Цените са за еднократно генериране на персонализиран план.
            </p>
          </motion.div>
        )}
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col md:flex-row gap-4 justify-center items-center max-w-2xl mx-auto mb-8"
        >
          <div className="bg-card p-4 rounded-lg flex items-center gap-3 flex-1 w-full">
            <FileText className="text-orange h-8 w-8 flex-shrink-0" />
            <p className="text-sm text-left">PDF формат, удобен за принтиране и преглед на всяко устройство</p>
          </div>
          <div className="bg-card p-4 rounded-lg flex items-center gap-3 flex-1 w-full">
            <Sparkles className="text-orange h-8 w-8 flex-shrink-0" />
            <p className="text-sm text-left">Бонус съвети за максимизиране на резултатите</p>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-4 rounded-lg mb-8 flex items-start gap-3 max-w-2xl mx-auto"
        >
          <LucideHeartPulse className="text-amber-600 dark:text-amber-500 h-6 w-6 flex-shrink-0 mt-1" />
          <div className="text-sm text-amber-800 dark:text-amber-300 text-left">
            <p className="font-semibold mb-1">Здравен съвет:</p>
            <p>Препоръчваме Ви да се консултирате с Вашия лекар преди да започнете каквато и да е тренировъчна програма, особено ако имате здравословни проблеми или дълъг период на неактивност.</p>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-xs text-muted-foreground mb-8"
        >
          *Персонализираният план се изпраща само на посочения от Вас имейл адрес. Ако не сте предоставили имейл, ще трябва да го въведете на следващата стъпка.
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ResultsState; 