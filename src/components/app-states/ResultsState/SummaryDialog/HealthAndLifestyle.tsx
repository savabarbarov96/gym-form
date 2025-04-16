import React from 'react';
import { Heart } from 'lucide-react';
import { translations } from '../translations';

interface HealthAndLifestyleProps {
  healthConcerns: string[];
  customHealthConcern?: string;
  typicalDay: string | null;
  sugaryFoods: string | null;
  dietaryRestrictions: string[];
  customDietaryRestriction?: string;
}

export const HealthAndLifestyle: React.FC<HealthAndLifestyleProps> = ({
  healthConcerns,
  customHealthConcern,
  typicalDay,
  sugaryFoods,
  dietaryRestrictions,
  customDietaryRestriction
}) => {
  return (
    <div className="rounded-lg border border-red/20 overflow-hidden">
      <div className="bg-gradient-to-r from-red-500/10 to-red-600/10 px-4 py-2 border-b border-red/20">
        <h3 className="font-bold text-lg text-red-800 dark:text-red-400 flex items-center gap-2">
          <Heart className="h-5 w-5" />
          Здраве и начин на живот
        </h3>
      </div>
      <div className="p-4 bg-white dark:bg-gray-800">
        <dl className="grid grid-cols-1 gap-y-3 text-gray-700 dark:text-gray-200">
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Здравословни проблеми:</dt>
            <dd>
              {healthConcerns.length ? (
                <span>
                  {translations.healthConcerns(healthConcerns).join(', ')}
                  {customHealthConcern ? `, ${customHealthConcern}` : ''}
                </span>
              ) : 'Няма посочени'}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Типичен ден:</dt>
            <dd>{translations.typicalDay(typicalDay)}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Консумация на сладки храни:</dt>
            <dd>{translations.sugaryFoods(sugaryFoods)}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Хранителни ограничения:</dt>
            <dd>
              {dietaryRestrictions.length ? (
                <span>
                  {dietaryRestrictions.join(', ')}
                  {customDietaryRestriction ? `, ${customDietaryRestriction}` : ''}
                </span>
              ) : 'Няма посочени'}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}; 