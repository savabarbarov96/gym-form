import React from 'react';
import { Heart } from 'lucide-react';
import { translations } from '../translations';

interface PersonalInfoProps {
  personalInfo: {
    name: string;
    email: string;
  };
  gender: string | null;
  age: string | null;
}

export const PersonalInfo: React.FC<PersonalInfoProps> = ({
  personalInfo,
  gender,
  age
}) => {
  return (
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
            <dd>{personalInfo.name || 'Не е посочено'}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Имейл:</dt>
            <dd>{personalInfo.email || 'Не е посочено'}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Пол:</dt>
            <dd>{translations.gender(gender)}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Възраст:</dt>
            <dd>{translations.age(age)}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}; 