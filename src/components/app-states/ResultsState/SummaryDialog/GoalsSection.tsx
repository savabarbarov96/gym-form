import React from 'react';
import { Award } from 'lucide-react';
import { translations } from '../translations';

interface GoalsSectionProps {
  fitnessGoal: string | null;
  desiredBody: string | null;
  problemAreas: string[];
  bestShapeTime: string | null;
  weightChange: string | null;
  startCommitment: string | null;
}

export const GoalsSection: React.FC<GoalsSectionProps> = ({
  fitnessGoal,
  desiredBody,
  problemAreas,
  bestShapeTime,
  weightChange,
  startCommitment
}) => {
  return (
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
            <dd>{translations.fitnessGoal(fitnessGoal)}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Желано тяло:</dt>
            <dd>{translations.desiredBody(desiredBody)}</dd>
          </div>
          <div className="md:col-span-2">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Проблемни зони:</dt>
            <dd>{problemAreas.length ? translations.problemAreas(problemAreas).join(', ') : 'Не е посочено'}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Кога сте били в най-добра форма:</dt>
            <dd>{translations.bestShapeTime(bestShapeTime)}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Промяна в теглото:</dt>
            <dd>{translations.weightChange(weightChange)}</dd>
          </div>
          <div className="md:col-span-2">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Готовност за започване:</dt>
            <dd>{translations.startCommitment(startCommitment)}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}; 