import { FormData } from "@/types/survey"; // Correct path

export const translateGender = (gender: string | null): string => {
  if (!gender) return 'Не е посочено';
  const genderMap: Record<string, string> = {
    'male': 'Мъж',
    'female': 'Жена',
    'other': 'Друго'
  };
  return genderMap[gender] || gender;
};

export const translateAge = (age: string | null): string => {
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

export const translateBodyType = (bodyType: string | null): string => {
  if (!bodyType) return 'Не е посочено';
  const bodyTypeMap: Record<string, string> = {
    'ectomorph': 'Ектоморф (слаб)',
    'mesomorph': 'Мезоморф (атлетичен)',
    'endomorph': 'Ендоморф (по-едър)',
    'not-sure': 'Не съм сигурен/а'
  };
  return bodyTypeMap[bodyType] || bodyType;
};

export const translateFitnessGoal = (goal: string | null): string => {
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

export const translateDesiredBody = (body: string | null): string => {
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

export const translateProblemAreas = (areas: string[]): string[] => {
  if (!areas || !areas.length) return [];
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

export const translateBestShapeTime = (time: string | null): string => {
  if (!time) return 'Не е посочено';
  const timeMap: Record<string, string> = {
    'never': 'Никога не съм бил/а в добра форма',
    'long-ago': 'Преди много време',
    'recent-years': 'В последните няколко години',
    'current': 'В момента съм в добра форма'
  };
  return timeMap[time] || time;
};

export const translateWeightChange = (change: string | null): string => {
  if (!change) return 'Не е посочено';
  const changeMap: Record<string, string> = {
    'gained': 'Качил/а съм килограми',
    'lost': 'Свалил/а съм килограми',
    'fluctuating': 'Теглото ми се променя често',
    'stable': 'Теглото ми е стабилно'
  };
  return changeMap[change] || change;
};

export const translateActivities = (activities: string[]): string[] => {
  if (!activities || !activities.length) return [];
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

export const translateHealthConcerns = (concerns: string[]): string[] => {
  if (!concerns || !concerns.length) return [];
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

export const translateWorkoutLocation = (location: string | null): string => {
  if (!location) return 'Не е посочено';
  const locationMap: Record<string, string> = {
    'gym': 'Фитнес зала',
    'home': 'Вкъщи',
    'outdoors': 'На открито',
    'mixed': 'Комбинирано'
  };
  return locationMap[location] || location;
};

export const translateWorkoutIntensity = (intensity: string | null): string => {
  if (!intensity) return 'Не е посочено';
  const intensityMap: Record<string, string> = {
    'light': 'Лека',
    'moderate': 'Умерена',
    'high': 'Висока',
    'variable': 'Променлива'
  };
  return intensityMap[intensity] || intensity;
};

export const translateWorkoutFrequency = (frequency: string | null): string => {
  if (!frequency) return 'Не е посочено';
  const frequencyMap: Record<string, string> = {
    '1-2': '1-2 пъти седмично',
    '3-4': '3-4 пъти седмично',
    '5-6': '5-6 пъти седмично',
    'daily': 'Всеки ден'
  };
  return frequencyMap[frequency] || frequency;
};

export const translateWorkoutDuration = (duration: string | null): string => {
  if (!duration) return 'Не е посочено';
  const durationMap: Record<string, string> = {
    'under-30': 'Под 30 минути',
    '30-45': '30-45 минути',
    '45-60': '45-60 минути',
    'over-60': 'Над 60 минути'
  };
  return durationMap[duration] || duration;
};

export const translateSugaryFoods = (sugary: string | null): string => {
  if (!sugary) return 'Не е посочено';
  const sugaryMap: Record<string, string> = {
    'daily': 'Всеки ден',
    'few-times-week': 'Няколко пъти седмично',
    'occasionally': 'Рядко',
    'avoid': 'Избягвам ги'
  };
  return sugaryMap[sugary] || sugary;
};

export const translateTypicalDay = (day: string | null): string => {
  if (!day) return 'Не е посочено';
  const dayMap: Record<string, string> = {
    'sedentary': 'Предимно седящ начин на живот',
    'lightly-active': 'Леко активен',
    'moderately-active': 'Умерено активен',
    'very-active': 'Много активен'
  };
  return dayMap[day] || day;
};

export const translateStartCommitment = (commitment: string | null): string => {
  if (!commitment) return 'Не е посочено';
  const commitmentMap: Record<string, string> = {
    'now': 'Веднага',
    'this-week': 'Тази седмица',
    'this-month': 'Този месец',
    'undecided': 'Все още не съм решил/а'
  };
  return commitmentMap[commitment] || commitment;
};

// Function to format equipment access
export const formatEquipmentAccess = (equipmentAccess: FormData['equipmentAccess']): string => {
  if (!equipmentAccess) return 'Не е посочено';
  const typeMap: Record<string, string> = {
    'home': 'Вкъщи',
    'gym': 'Фитнес зала',
    // Add other types if needed
  };
  const typeLabel = typeMap[equipmentAccess.type] || equipmentAccess.type;
  return `${typeLabel}: ${equipmentAccess.items.join(', ')}`;
};

// Function to format activities
export const formatActivities = (activities: string[], customActivity: string | null): string => {
  if (!activities || activities.length === 0) return 'Не е посочено';
  const translatedActivities = translateActivities(activities);
  const fullList = customActivity ? [...translatedActivities, customActivity] : translatedActivities;
  return fullList.join(', ');
};

// Function to format health concerns
export const formatHealthConcerns = (concerns: string[], customConcern: string | null): string => {
  if (!concerns || concerns.length === 0) return 'Няма посочени';
  const translatedConcerns = translateHealthConcerns(concerns);
  const fullList = customConcern ? [...translatedConcerns, customConcern] : translatedConcerns;
  return fullList.join(', ');
};

// Function to format allergies
export const formatAllergies = (allergies: string[], customAllergy: string | null): string => {
  if (!allergies || allergies.length === 0) {
      return customAllergy || 'Няма посочени';
  }
  const fullList = customAllergy ? [...allergies, customAllergy] : allergies;
  return fullList.join(', ');
};

// Function to format traditional foods
export const formatTraditionalFoods = (foods: string[], customFood: string | null): string => {
  if (!foods || foods.length === 0) {
    return customFood || 'Не е посочено';
  }
  const fullList = customFood ? [...foods, customFood] : foods;
  return fullList.join(', ');
};

// Function to format nullable numbers (like sleepAmount, energyLevels, selfAssessments)
export const formatNullableNumber = (value: number | null, unit: string = '', scale: string = ''): string => {
  if (value === null || value === undefined) return 'Не е посочено';
  return `${value}${unit}${scale ? `/${scale}` : ''}`;
}; 