export const translations = {
  gender: (gender: string | null): string => {
    if (!gender) return 'Не е посочено';
    const genderMap: Record<string, string> = {
      'male': 'Мъж',
      'female': 'Жена',
      'other': 'Друго'
    };
    return genderMap[gender] || gender;
  },

  age: (age: string | null): string => {
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
  },

  bodyType: (bodyType: string | null): string => {
    if (!bodyType) return 'Не е посочено';
    const bodyTypeMap: Record<string, string> = {
      'ectomorph': 'Ектоморф (слаб)',
      'mesomorph': 'Мезоморф (атлетичен)',
      'endomorph': 'Ендоморф (по-едър)',
      'not-sure': 'Не съм сигурен/а'
    };
    return bodyTypeMap[bodyType] || bodyType;
  },

  fitnessGoal: (goal: string | null): string => {
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
  },

  desiredBody: (body: string | null): string => {
    if (!body) return 'Не е посочено';
    const bodyMap: Record<string, string> = {
      'slim': 'Слабо тяло',
      'toned': 'Тонизирано тяло',
      'athletic': 'Атлетично тяло',
      'muscular': 'Мускулесто тяло',
      'balanced': 'Балансирано тяло'
    };
    return bodyMap[body] || body;
  },

  problemAreas: (areas: string[]): string[] => {
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
  },

  bestShapeTime: (time: string | null): string => {
    if (!time) return 'Не е посочено';
    const timeMap: Record<string, string> = {
      'never': 'Никога не съм бил/а в добра форма',
      'long-ago': 'Преди много време',
      'recent-years': 'В последните няколко години',
      'current': 'В момента съм в добра форма'
    };
    return timeMap[time] || time;
  },

  weightChange: (change: string | null): string => {
    if (!change) return 'Не е посочено';
    const changeMap: Record<string, string> = {
      'gained': 'Качил/а съм килограми',
      'lost': 'Свалил/а съм килограми',
      'fluctuating': 'Теглото ми се променя често',
      'stable': 'Теглото ми е стабилно'
    };
    return changeMap[change] || change;
  },

  activities: (activities: string[]): string[] => {
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
  },

  healthConcerns: (concerns: string[]): string[] => {
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
  },

  workoutLocation: (location: string | null): string => {
    if (!location) return 'Не е посочено';
    const locationMap: Record<string, string> = {
      'gym': 'Фитнес зала',
      'home': 'Вкъщи',
      'outdoors': 'На открито',
      'mixed': 'Комбинирано'
    };
    return locationMap[location] || location;
  },

  workoutIntensity: (intensity: string | null): string => {
    if (!intensity) return 'Не е посочено';
    const intensityMap: Record<string, string> = {
      'light': 'Лека',
      'moderate': 'Умерена',
      'high': 'Висока',
      'variable': 'Променлива'
    };
    return intensityMap[intensity] || intensity;
  },

  workoutFrequency: (frequency: string | null): string => {
    if (!frequency) return 'Не е посочено';
    const frequencyMap: Record<string, string> = {
      '1-2': '1-2 пъти седмично',
      '3-4': '3-4 пъти седмично',
      '5-6': '5-6 пъти седмично',
      'daily': 'Всеки ден'
    };
    return frequencyMap[frequency] || frequency;
  },

  workoutDuration: (duration: string | null): string => {
    if (!duration) return 'Не е посочено';
    const durationMap: Record<string, string> = {
      'under-30': 'Под 30 минути',
      '30-45': '30-45 минути',
      '45-60': '45-60 минути',
      'over-60': 'Над 60 минути'
    };
    return durationMap[duration] || duration;
  },

  sugaryFoods: (sugary: string | null): string => {
    if (!sugary) return 'Не е посочено';
    const sugaryMap: Record<string, string> = {
      'daily': 'Всеки ден',
      'few-times-week': 'Няколко пъти седмично',
      'occasionally': 'Рядко',
      'avoid': 'Избягвам ги'
    };
    return sugaryMap[sugary] || sugary;
  },

  typicalDay: (day: string | null): string => {
    if (!day) return 'Не е посочено';
    const dayMap: Record<string, string> = {
      'sedentary': 'Предимно седящ начин на живот',
      'lightly-active': 'Леко активен',
      'moderately-active': 'Умерено активен',
      'very-active': 'Много активен'
    };
    return dayMap[day] || day;
  },

  startCommitment: (commitment: string | null): string => {
    if (!commitment) return 'Не е посочено';
    const commitmentMap: Record<string, string> = {
      'now': 'Веднага',
      'this-week': 'Тази седмица',
      'this-month': 'Този месец',
      'undecided': 'Все още не съм решил/а'
    };
    return commitmentMap[commitment] || commitment;
  }
}; 