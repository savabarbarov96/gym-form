import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import {
  X,
  Heart,
  Dumbbell,
  Award,
  Calendar,
  CheckCircle,
  ChefHat,
  LucideHeartPulse
} from "lucide-react";
import { FormData } from "@/types/survey";
import {
  translateGender,
  translateAge,
  translateBodyType,
  translateFitnessGoal,
  translateDesiredBody,
  translateProblemAreas,
  translateBestShapeTime,
  translateWeightChange,
  translateStartCommitment,
  translateWorkoutLocation,
  translateWorkoutIntensity,
  translateWorkoutFrequency,
  translateWorkoutDuration,
  translateSugaryFoods,
  translateTypicalDay,
  formatEquipmentAccess,
  formatActivities,
  formatHealthConcerns,
  formatAllergies,
  formatTraditionalFoods,
  formatNullableNumber
} from "@/lib/translations";

interface SummaryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formData: FormData;
}

const SummarySection: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <div className="rounded-lg border border-orange/20 overflow-hidden">
    <div className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 px-4 py-2 border-b border-orange/20">
      <h3 className="font-bold text-lg text-orange-800 dark:text-orange-400 flex items-center gap-2">
        {icon}
        {title}
      </h3>
    </div>
    <div className="p-4 bg-white dark:bg-gray-800">
      <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-gray-700 dark:text-gray-200">
        {children}
      </dl>
    </div>
  </div>
);

const SummaryItem: React.FC<{ label: string; value: string | React.ReactNode; fullWidth?: boolean }> = ({ label, value, fullWidth = false }) => (
  <div className={fullWidth ? "md:col-span-2" : ""}>
    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}:</dt>
    <dd>{value}</dd>
  </div>
);

export const SummaryDialog: React.FC<SummaryDialogProps> = ({ open, onOpenChange, formData }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
          <SummarySection title="Лична информация" icon={<Heart className="h-5 w-5" />}>
            <SummaryItem label="Име" value={formData.personalInfo.name || 'Не е посочено'} />
            <SummaryItem label="Имейл" value={formData.personalInfo.email || 'Не е посочено'} />
            <SummaryItem label="Пол" value={translateGender(formData.gender)} />
            <SummaryItem label="Възраст" value={translateAge(formData.age)} />
          </SummarySection>

          {/* Физически данни */}
          <SummarySection title="Физически данни" icon={<Dumbbell className="h-5 w-5" />}>
            <SummaryItem label="Височина" value={formData.height || 'Не е посочено'} />
            <SummaryItem label="Текущо тегло" value={formData.currentWeight ? `${formData.currentWeight} ${formData.weightUnit}` : 'Не е посочено'} />
            <SummaryItem label="Целево тегло" value={formData.targetWeight ? `${formData.targetWeight} ${formData.weightUnit}` : 'Не е посочено'} />
            <SummaryItem label="Тип телосложение" value={translateBodyType(formData.bodyType)} />
            <SummaryItem label="Текущ процент телесни мазнини" value={formData.currentBodyFat ? `${formData.currentBodyFat}%` : 'Не е посочено'} fullWidth />
          </SummarySection>

          {/* Цели */}
          <SummarySection title="Цели и история" icon={<Award className="h-5 w-5" />}>
            <SummaryItem label="Фитнес цел" value={translateFitnessGoal(formData.fitnessGoal)} />
            <SummaryItem label="Желано тяло" value={translateDesiredBody(formData.desiredBody)} />
            <SummaryItem label="Проблемни зони" value={formData.problemAreas.length ? translateProblemAreas(formData.problemAreas).join(', ') : 'Не е посочено'} fullWidth />
            <SummaryItem label="Кога сте били в най-добра форма" value={translateBestShapeTime(formData.bestShapeTime)} />
            <SummaryItem label="Промяна в теглото" value={translateWeightChange(formData.weightChange)} />
            <SummaryItem label="Готовност за започване" value={translateStartCommitment(formData.startCommitment)} fullWidth />
          </SummarySection>

          {/* Тренировъчни предпочитания */}
          <SummarySection title="Тренировъчни предпочитания" icon={<Calendar className="h-5 w-5" />}>
            <SummaryItem label="Място за тренировка" value={translateWorkoutLocation(formData.workoutLocation)} />
            <SummaryItem label="Интензивност" value={translateWorkoutIntensity(formData.workoutIntensity)} />
            <SummaryItem label="Честота" value={translateWorkoutFrequency(formData.workoutFrequency)} />
            <SummaryItem label="Продължителност" value={translateWorkoutDuration(formData.workoutDuration)} />
            <SummaryItem label="Достъпно оборудване" value={formatEquipmentAccess(formData.equipmentAccess)} fullWidth />
            <SummaryItem label="Физически активности" value={formatActivities(formData.activities, formData.customActivity)} fullWidth />
          </SummarySection>

          {/* Здраве и начин на живот */}
          <SummarySection title="Здраве и начин на живот" icon={<LucideHeartPulse className="h-5 w-5" />}>
            <SummaryItem label="Здравословни проблеми" value={formatHealthConcerns(formData.healthConcerns, formData.customHealthConcern)} fullWidth />
            <SummaryItem label="Типичен ден" value={translateTypicalDay(formData.typicalDay)} />
            <SummaryItem label="Количество сън" value={formatNullableNumber(formData.sleepAmount, ' часа')} />
            <SummaryItem label="Енергийни нива" value={formatNullableNumber(formData.energyLevels, '', '10')} />
          </SummarySection>

          {/* Самооценки */}
          <SummarySection title="Самооценки" icon={<CheckCircle className="h-5 w-5" />}>
            <SummaryItem label="Задъхване при физически дейности" value={formatNullableNumber(formData.selfAssessments.outOfBreath, '', '10')} />
            <SummaryItem label="Връщане към стари навици" value={formatNullableNumber(formData.selfAssessments.fallingBack, '', '10')} />
            <SummaryItem label="Подходящи тренировки" value={formatNullableNumber(formData.selfAssessments.suitableWorkouts, '', '10')} />
            <SummaryItem label="Ниво на мотивация" value={formatNullableNumber(formData.selfAssessments.motivationLevel, '', '10')} />
            <SummaryItem label="Постоянство на диетата" value={formatNullableNumber(formData.selfAssessments.dietConsistency, '', '10')} />
          </SummarySection>

          {/* Хранителни навици */}
          <SummarySection title="Хранителни навици" icon={<ChefHat className="h-5 w-5" />}>
            <SummaryItem label="Алергии" value={formatAllergies(formData.allergies, formData.customAllergy)} fullWidth />
            <SummaryItem label="Традиционни храни" value={formatTraditionalFoods(formData.traditionalFoods, formData.customTraditionalFood)} fullWidth />
            <SummaryItem label="Консумация на сладки" value={translateSugaryFoods(formData.sugaryFoods)} />
            <SummaryItem label="Прием на вода" value={formData.waterIntake ? `${formData.waterIntake} мл` : 'Не е посочено'} />
          </SummarySection>
        </div>

        <div className="mt-6 pt-4 text-center border-t border-orange/20">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Тази информация ще бъде използвана за създаване на вашия персонализиран план.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}; 