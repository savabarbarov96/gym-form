import React from 'react';
import { Calendar } from 'lucide-react';
import { translations } from '../translations';

interface EquipmentAccess {
  type: string;
  items: string[];
}

interface WorkoutPreferencesProps {
  workoutLocation: string | null;
  workoutIntensity: string | null;
  workoutFrequency: string | null;
  workoutDuration: string | null;
  equipmentAccess: EquipmentAccess | null;
  activities: string[];
  customActivity?: string;
}

export const WorkoutPreferences: React.FC<WorkoutPreferencesProps> = ({
  workoutLocation,
  workoutIntensity,
  workoutFrequency,
  workoutDuration,
  equipmentAccess,
  activities,
  customActivity
}) => {
  return (
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
            <dd>{translations.workoutLocation(workoutLocation)}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Интензивност:</dt>
            <dd>{translations.workoutIntensity(workoutIntensity)}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Честота:</dt>
            <dd>{translations.workoutFrequency(workoutFrequency)}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Продължителност:</dt>
            <dd>{translations.workoutDuration(workoutDuration)}</dd>
          </div>
          <div className="md:col-span-2">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Достъпно оборудване:</dt>
            <dd>
              {equipmentAccess ? (
                <span>
                  {equipmentAccess.type === 'home' ? 'Вкъщи' : 
                   equipmentAccess.type === 'gym' ? 'Фитнес зала' : 
                   equipmentAccess.type}: {equipmentAccess.items.join(', ')}
                </span>
              ) : 'Не е посочено'}
            </dd>
          </div>
          <div className="md:col-span-2">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Физически активности:</dt>
            <dd>
              {activities.length ? (
                <span>
                  {translations.activities(activities).join(', ')}
                  {customActivity ? `, ${customActivity}` : ''}
                </span>
              ) : 'Не е посочено'}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}; 