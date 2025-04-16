import React from 'react';
import { Dumbbell } from 'lucide-react';
import { translations } from '../translations';

interface PhysicalDataProps {
  height: string | null;
  currentWeight: number | null;
  targetWeight: number | null;
  weightUnit: string;
  bodyType: string | null;
  currentBodyFat: number | null;
}

export const PhysicalData: React.FC<PhysicalDataProps> = ({
  height,
  currentWeight,
  targetWeight,
  weightUnit,
  bodyType,
  currentBodyFat
}) => {
  return (
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
            <dd>{height || 'Не е посочено'}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Текущо тегло:</dt>
            <dd>{currentWeight ? `${currentWeight} ${weightUnit}` : 'Не е посочено'}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Целево тегло:</dt>
            <dd>{targetWeight ? `${targetWeight} ${weightUnit}` : 'Не е посочено'}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Тип телосложение:</dt>
            <dd>{translations.bodyType(bodyType)}</dd>
          </div>
          <div className="md:col-span-2">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Текущ процент телесни мазнини:</dt>
            <dd>{currentBodyFat ? `${currentBodyFat}%` : 'Не е посочено'}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}; 