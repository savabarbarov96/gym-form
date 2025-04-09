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
  LucideHeartPulse,
  Gift,
  ClipboardList,
  X,
  Eye
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSurvey } from "@/contexts/SurveyContext";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogClose
} from "@/components/ui/dialog";

// Translation helpers for Bulgarian display
const translateGender = (gender: string | null): string => {
  if (!gender) return 'Не е посочено';
  const genderMap: Record<string, string> = {
    'male': 'Мъж',
    'female': 'Жена',
    'other': 'Друго'
  };
  return genderMap[gender] || gender;
};

const translateAge = (age: string | null): string => {
  if (!age) return 'Не е посочено';
  const ageMap: Record<string, string> = {
    '18-24': '18-24 години',
    '25-34': '25-34 години',
    '35-44': '35-44 години',
    '45-54': '45-54 години',
    '55-64': '55-64 години',
    '65+': '65+ години'
  };
  return ageMap[age] || age;
};

const translateBodyType = (bodyType: string | null): string => {
  if (!bodyType) return 'Не е посочено';
  const bodyTypeMap: Record<string, string> = {
    'ectomorph': 'Ектоморф (слаб)',
    'mesomorph': 'Мезоморф (атлетичен)',
    'endomorph': 'Ендоморф (по-едър)',
    'not-sure': 'Не съм сигурен/а'
  };
  return bodyTypeMap[bodyType] || bodyType;
};

const translateFitnessGoal = (goal: string | null): string => {
  if (!goal) return 'Не е посочено';
  const goalMap: Record<string, string> = {
    'lose-weight': 'Отслабване',
    'build-muscle': 'Натрупване на мускули',
    'increase-endurance': 'Повишаване на издръжливостта',
    'improve-health': 'Подобряване на здравето',
    'tone-body': 'Тонизиране на тялото',
    'maintain-fitness': 'Поддържане на формата'
  };
  return goalMap[goal] || goal;
};

const translateDesiredBody = (body: string | null): string => {
  if (!body) return 'Не е посочено';
  const bodyMap: Record<string, string> = {
    'slim': 'Слабо тяло',
    'toned': 'Тонизирано тяло',
    'athletic': 'Атлетично тяло',
    'muscular': 'Мускулесто тяло',
    'balanced': 'Балансирано тяло'
  };
  return bodyMap[body] || body;
};

const translateProblemAreas = (areas: string[]): string[] => {
  if (!areas.length) return [];
  const areaMap: Record<string, string> = {
    'belly': 'Корем',
    'arms': 'Ръце',
    'thighs': 'Бедра',
    'back': 'Гръб',
    'chest': 'Гърди',
    'shoulders': 'Рамене'
  };
  return areas.map(area => areaMap[area] || area);
};

const translateBestShapeTime = (time: string | null): string => {
  if (!time) return 'Не е посочено';
  const timeMap: Record<string, string> = {
    'never': 'Никога не съм бил/а в добра форма',
    'long-ago': 'Преди много време',
    'recent-years': 'В последните няколко години',
    'current': 'В момента съм в добра форма'
  };
  return timeMap[time] || time;
};

const translateWeightChange = (change: string | null): string => {
  if (!change) return 'Не е посочено';
  const changeMap: Record<string, string> = {
    'gained': 'Качил/а съм килограми',
    'lost': 'Свалил/а съм килограми',
    'fluctuating': 'Теглото ми се променя често',
    'stable': 'Теглото ми е стабилно'
  };
  return changeMap[change] || change;
};

const translateActivities = (activities: string[]): string[] => {
  if (!activities.length) return [];
  const activityMap: Record<string, string> = {
    'walking': 'Ходене',
    'running': 'Бягане',
    'cycling': 'Колоездене',
    'swimming': 'Плуване',
    'yoga': 'Йога',
    'pilates': 'Пилатес',
    'weightlifting': 'Вдигане на тежести',
    'team-sports': 'Отборни спортове',
    'dancing': 'Танци',
    'hiking': 'Туризъм',
    'none': 'Никакви'
  };
  return activities.map(activity => activityMap[activity] || activity);
};

const translateHealthConcerns = (concerns: string[]): string[] => {
  if (!concerns.length) return [];
  const concernMap: Record<string, string> = {
    'heart': 'Сърдечни проблеми',
    'diabetes': 'Диабет',
    'joint-pain': 'Болки в ставите',
    'high-blood-pressure': 'Високо кръвно налягане',
    'back-pain': 'Болки в гърба',
    'obesity': 'Затлъстяване',
    'respiratory': 'Дихателни проблеми',
    'thyroid': 'Проблеми с щитовидната жлеза',
    'none': 'Нямам здравословни проблеми'
  };
  return concerns.map(concern => concernMap[concern] || concern);
};

const translateWorkoutLocation = (location: string | null): string => {
  if (!location) return 'Не е посочено';
  const locationMap: Record<string, string> = {
    'gym': 'Фитнес зала',
    'home': 'Вкъщи',
    'outdoors': 'На открито',
    'mixed': 'Комбинирано'
  };
  return locationMap[location] || location;
};

const translateWorkoutIntensity = (intensity: string | null): string => {
  if (!intensity) return 'Не е посочено';
  const intensityMap: Record<string, string> = {
    'light': 'Лека',
    'moderate': 'Умерена',
    'high': 'Висока',
    'variable': 'Променлива'
  };
  return intensityMap[intensity] || intensity;
};

const translateWorkoutFrequency = (frequency: string | null): string => {
  if (!frequency) return 'Не е посочено';
  const frequencyMap: Record<string, string> = {
    '1-2': '1-2 пъти седмично',
    '3-4': '3-4 пъти седмично',
    '5-6': '5-6 пъти седмично',
    'daily': 'Всеки ден'
  };
  return frequencyMap[frequency] || frequency;
};

const translateWorkoutDuration = (duration: string | null): string => {
  if (!duration) return 'Не е посочено';
  const durationMap: Record<string, string> = {
    'under-30': 'Под 30 минути',
    '30-45': '30-45 минути',
    '45-60': '45-60 минути',
    'over-60': 'Над 60 минути'
  };
  return durationMap[duration] || duration;
};

const translateSugaryFoods = (sugary: string | null): string => {
  if (!sugary) return 'Не е посочено';
  const sugaryMap: Record<string, string> = {
    'daily': 'Всеки ден',
    'few-times-week': 'Няколко пъти седмично',
    'occasionally': 'Рядко',
    'avoid': 'Избягвам ги'
  };
  return sugaryMap[sugary] || sugary;
};

const translateTypicalDay = (day: string | null): string => {
  if (!day) return 'Не е посочено';
  const dayMap: Record<string, string> = {
    'sedentary': 'Предимно седящ начин на живот',
    'lightly-active': 'Леко активен',
    'moderately-active': 'Умерено активен',
    'very-active': 'Много активен'
  };
  return dayMap[day] || day;
};

const translateStartCommitment = (commitment: string | null): string => {
  if (!commitment) return 'Не е посочено';
  const commitmentMap: Record<string, string> = {
    'now': 'Веднага',
    'this-week': 'Тази седмица',
    'this-month': 'Този месец',
    'undecided': 'Все още не съм решил/а'
  };
  return commitmentMap[commitment] || commitment;
};

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
  const [showSummary, setShowSummary] = useState(false);
  const { formData } = useSurvey();
  
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
          className="text-muted-foreground text-xl mb-8 max-w-2xl mx-auto"
        >
          Благодарим за отделеното време. Ето какво можете да очаквате да получите:
        </motion.p>
        
        {/* Summary Dialog */}
        <Dialog open={showSummary} onOpenChange={setShowSummary}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 p-1 rounded-2xl shadow-md mb-12 max-w-md mx-auto overflow-hidden"
          >
            <motion.button
              onClick={() => setShowSummary(true)}
              className="w-full py-3 bg-gradient-to-r from-orange to-orange-600 hover:from-orange-600 hover:to-orange text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Eye size={20} />
              Преглед на въведените данни
              <ClipboardList size={20} />
            </motion.button>
          </motion.div>
          
          <DialogContent className="max-w-[95vw] md:max-w-3xl bg-white dark:bg-gray-900 border border-orange/30 overflow-y-auto max-h-[90vh]">
            <DialogHeader className="flex justify-between items-start border-b border-orange/20 pb-4 mb-4">
              <DialogTitle className="text-2xl font-bold text-orange-700 dark:text-orange-500">
                Обобщение на Вашите данни
              </DialogTitle>
              <DialogClose className="rounded-full p-1.5 bg-orange-100 hover:bg-orange-200 text-orange-700">
                <X className="h-5 w-5" />
              </DialogClose>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Лична информация */}
              <div className="rounded-lg border border-orange/20 overflow-hidden">
                <div className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 px-4 py-2 border-b border-orange/20">
                  <h3 className="font-bold text-lg text-orange-800 dark:text-orange-400 flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Лична информация
                  </h3>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800">
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-gray-700 dark:text-gray-200">
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Име:</dt>
                      <dd>{formData.personalInfo.name || 'Не е посочено'}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Имейл:</dt>
                      <dd>{formData.personalInfo.email || 'Не е посочено'}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Пол:</dt>
                      <dd>{translateGender(formData.gender)}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Възраст:</dt>
                      <dd>{translateAge(formData.age)}</dd>
                    </div>
                  </dl>
                </div>
              </div>
              
              {/* Физически данни */}
              <div className="rounded-lg border border-orange/20 overflow-hidden">
                <div className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 px-4 py-2 border-b border-orange/20">
                  <h3 className="font-bold text-lg text-orange-800 dark:text-orange-400 flex items-center gap-2">
                    <Dumbbell className="h-5 w-5" />
                    Физически данни
                  </h3>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800">
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-gray-700 dark:text-gray-200">
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Височина:</dt>
                      <dd>{formData.height || 'Не е посочено'}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Текущо тегло:</dt>
                      <dd>{formData.currentWeight ? `${formData.currentWeight} ${formData.weightUnit}` : 'Не е посочено'}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Целево тегло:</dt>
                      <dd>{formData.targetWeight ? `${formData.targetWeight} ${formData.weightUnit}` : 'Не е посочено'}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Тип телосложение:</dt>
                      <dd>{translateBodyType(formData.bodyType)}</dd>
                    </div>
                    <div className="md:col-span-2">
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Текущ процент телесни мазнини:</dt>
                      <dd>{formData.currentBodyFat ? `${formData.currentBodyFat}%` : 'Не е посочено'}</dd>
                    </div>
                  </dl>
                </div>
              </div>
              
              {/* Цели */}
              <div className="rounded-lg border border-orange/20 overflow-hidden">
                <div className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 px-4 py-2 border-b border-orange/20">
                  <h3 className="font-bold text-lg text-orange-800 dark:text-orange-400 flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Цели и история
                  </h3>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800">
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-gray-700 dark:text-gray-200">
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Фитнес цел:</dt>
                      <dd>{translateFitnessGoal(formData.fitnessGoal)}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Желано тяло:</dt>
                      <dd>{translateDesiredBody(formData.desiredBody)}</dd>
                    </div>
                    <div className="md:col-span-2">
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Проблемни зони:</dt>
                      <dd>{formData.problemAreas.length ? translateProblemAreas(formData.problemAreas).join(', ') : 'Не е посочено'}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Кога сте били в най-добра форма:</dt>
                      <dd>{translateBestShapeTime(formData.bestShapeTime)}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Промяна в теглото:</dt>
                      <dd>{translateWeightChange(formData.weightChange)}</dd>
                    </div>
                    <div className="md:col-span-2">
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Готовност за започване:</dt>
                      <dd>{translateStartCommitment(formData.startCommitment)}</dd>
                    </div>
                  </dl>
                </div>
              </div>
              
              {/* Тренировъчни предпочитания */}
              <div className="rounded-lg border border-orange/20 overflow-hidden">
                <div className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 px-4 py-2 border-b border-orange/20">
                  <h3 className="font-bold text-lg text-orange-800 dark:text-orange-400 flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Тренировъчни предпочитания
                  </h3>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800">
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-gray-700 dark:text-gray-200">
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Място за тренировка:</dt>
                      <dd>{translateWorkoutLocation(formData.workoutLocation)}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Интензивност:</dt>
                      <dd>{translateWorkoutIntensity(formData.workoutIntensity)}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Честота:</dt>
                      <dd>{translateWorkoutFrequency(formData.workoutFrequency)}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Продължителност:</dt>
                      <dd>{translateWorkoutDuration(formData.workoutDuration)}</dd>
                    </div>
                    <div className="md:col-span-2">
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Достъпно оборудване:</dt>
                      <dd>
                        {formData.equipmentAccess ? (
                          <span>{formData.equipmentAccess.type === 'home' ? 'Вкъщи' : formData.equipmentAccess.type === 'gym' ? 'Фитнес зала' : formData.equipmentAccess.type}: {formData.equipmentAccess.items.join(', ')}</span>
                        ) : 'Не е посочено'}
                      </dd>
                    </div>
                    <div className="md:col-span-2">
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Физически активности:</dt>
                      <dd>
                        {formData.activities.length ? (
                          <span>
                            {translateActivities(formData.activities).join(', ')}
                            {formData.customActivity ? `, ${formData.customActivity}` : ''}
                          </span>
                        ) : 'Не е посочено'}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
              
              {/* Здраве и начин на живот */}
              <div className="rounded-lg border border-orange/20 overflow-hidden">
                <div className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 px-4 py-2 border-b border-orange/20">
                  <h3 className="font-bold text-lg text-orange-800 dark:text-orange-400 flex items-center gap-2">
                    <LucideHeartPulse className="h-5 w-5" />
                    Здраве и начин на живот
                  </h3>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800">
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-gray-700 dark:text-gray-200">
                    <div className="md:col-span-2">
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Здравословни проблеми:</dt>
                      <dd>
                        {formData.healthConcerns.length ? (
                          <span>
                            {translateHealthConcerns(formData.healthConcerns).join(', ')}
                            {formData.customHealthConcern ? `, ${formData.customHealthConcern}` : ''}
                          </span>
                        ) : 'Няма посочени'}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Типичен ден:</dt>
                      <dd>{translateTypicalDay(formData.typicalDay)}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Количество сън:</dt>
                      <dd>{formData.sleepAmount !== null ? `${formData.sleepAmount} часа` : 'Не е посочено'}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Енергийни нива:</dt>
                      <dd>{formData.energyLevels !== null ? `${formData.energyLevels}/10` : 'Не е посочено'}</dd>
                    </div>
                  </dl>
                </div>
              </div>
              
              {/* Самооценки */}
              <div className="rounded-lg border border-orange/20 overflow-hidden">
                <div className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 px-4 py-2 border-b border-orange/20">
                  <h3 className="font-bold text-lg text-orange-800 dark:text-orange-400 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Самооценки
                  </h3>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800">
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-gray-700 dark:text-gray-200">
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Задъхване при физически дейности:</dt>
                      <dd>{formData.selfAssessments.outOfBreath !== null ? `${formData.selfAssessments.outOfBreath}/10` : 'Не е оценено'}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Връщане към стари навици:</dt>
                      <dd>{formData.selfAssessments.fallingBack !== null ? `${formData.selfAssessments.fallingBack}/10` : 'Не е оценено'}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Подходящи тренировки:</dt>
                      <dd>{formData.selfAssessments.suitableWorkouts !== null ? `${formData.selfAssessments.suitableWorkouts}/10` : 'Не е оценено'}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Ниво на мотивация:</dt>
                      <dd>{formData.selfAssessments.motivationLevel !== null ? `${formData.selfAssessments.motivationLevel}/10` : 'Не е оценено'}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Постоянство на диетата:</dt>
                      <dd>{formData.selfAssessments.dietConsistency !== null ? `${formData.selfAssessments.dietConsistency}/10` : 'Не е оценено'}</dd>
                    </div>
                  </dl>
                </div>
              </div>
              
              {/* Хранителни навици */}
              <div className="rounded-lg border border-orange/20 overflow-hidden">
                <div className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 px-4 py-2 border-b border-orange/20">
                  <h3 className="font-bold text-lg text-orange-800 dark:text-orange-400 flex items-center gap-2">
                    <ChefHat className="h-5 w-5" />
                    Хранителни навици
                  </h3>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800">
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-gray-700 dark:text-gray-200">
                    <div className="md:col-span-2">
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Алергии:</dt>
                      <dd>
                        {formData.allergies.length ? (
                          <span>
                            {formData.allergies.join(', ')}
                            {formData.customAllergy ? `, ${formData.customAllergy}` : ''}
                          </span>
                        ) : 'Няма посочени'}
                      </dd>
                    </div>
                    <div className="md:col-span-2">
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Традиционни храни:</dt>
                      <dd>
                        {formData.traditionalFoods.length ? (
                          <span>
                            {formData.traditionalFoods.join(', ')}
                            {formData.customTraditionalFood ? `, ${formData.customTraditionalFood}` : ''}
                          </span>
                        ) : 'Не е посочено'}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Консумация на сладки:</dt>
                      <dd>{translateSugaryFoods(formData.sugaryFoods)}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Прием на вода:</dt>
                      <dd>{formData.waterIntake ? `${formData.waterIntake} мл` : 'Не е посочено'}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-4 text-center border-t border-orange/20">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Тази информация ще бъде използвана за създаване на вашия персонализиран план.
              </p>
            </div>
          </DialogContent>
        </Dialog>
        
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
            className="p-8 bg-transparent rounded-xl shadow-xl mb-8 max-w-3xl mx-auto border border-gray-200 dark:border-gray-800"
          >
            <h2 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-orange to-orange-600 bg-clip-text text-transparent">Изберете своя план</h2>
            
            <div className="text-center mb-6 text-sm text-white dark:text-white">
              <p>След избор на план, ще изпратим вашата поръчка и ще създадем персонализирана програма, 
              която ще бъде изпратена на вашия имейл адрес.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Meal Plan Option */}
              <motion.div 
                className="bg-white/90 dark:bg-gray-800 p-6 rounded-xl shadow-lg border-2 border-orange/20 hover:border-orange transition-all overflow-hidden relative"
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
                
                <ul className="space-y-3 mb-5 text-sm text-gray-700 dark:text-white">
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
                className="bg-white/90 dark:bg-gray-800 p-7 rounded-xl shadow-xl border-2 border-orange relative transform scale-105 md:scale-110 z-10 overflow-visible mt-6 md:mt-8"
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
                
                <ul className="space-y-3 mb-6 text-sm text-gray-700 dark:text-white">
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
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="font-medium">Максимално бърз резултат</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Gift className="w-5 h-5 text-orange flex-shrink-0 mt-0.5" />
                    <span className="font-medium text-orange">Подарък: Брошура с рецепти</span>
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
                className="bg-white/90 dark:bg-gray-800 p-6 rounded-xl shadow-lg border-2 border-orange/20 hover:border-orange transition-all overflow-hidden relative"
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
                
                <ul className="space-y-3 mb-5 text-sm text-gray-700 dark:text-white">
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
            
            <p className="text-white dark:text-white text-center mt-8 text-sm">
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
          className="bg-white dark:bg-gray-800 border border-amber-200 dark:border-amber-800 p-5 rounded-lg mb-8 flex items-start gap-3 max-w-3xl mx-auto shadow-md"
        >
          <LucideHeartPulse className="text-amber-600 dark:text-amber-500 h-6 w-6 flex-shrink-0 mt-1" />
          <div className="text-sm text-gray-800 dark:text-gray-200 text-left">
            <p className="font-semibold mb-1 text-amber-800 dark:text-amber-400">Здравен съвет:</p>
            <p>Препоръчваме Ви да се консултирате с Вашия лекар преди да започнете каквато и да е тренировъчна програма или промяна на хранителния режим, особено ако имате здравословни проблеми или дълъг период на неактивност.</p>
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