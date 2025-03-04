
import React from 'react';
import { Label } from "@/components/ui/label";
import { Calendar, AlertCircle } from 'lucide-react';
import { cn } from "@/lib/utils";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DateOfBirthInputProps {
  day: string;
  month: string;
  year: string;
  error: string;
  onDayChange: (value: string) => void;
  onMonthChange: (value: string) => void;
  onYearChange: (value: string) => void;
}

const DateOfBirthInput: React.FC<DateOfBirthInputProps> = ({
  day,
  month,
  year,
  error,
  onDayChange,
  onMonthChange,
  onYearChange
}) => {
  // Generate years for the dropdown (80 years back from current year)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 65 }, (_, i) => currentYear - 80 + i).reverse();
  
  // Generate months
  const months = [
    { value: '1', label: 'January' },
    { value: '2', label: 'February' },
    { value: '3', label: 'March' },
    { value: '4', label: 'April' },
    { value: '5', label: 'May' },
    { value: '6', label: 'June' },
    { value: '7', label: 'July' },
    { value: '8', label: 'August' },
    { value: '9', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' }
  ];
  
  // Generate days based on selected month and year
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate();
  };
  
  const days = month && year 
    ? Array.from({ length: getDaysInMonth(parseInt(month), parseInt(year)) }, (_, i) => (i + 1).toString())
    : Array.from({ length: 31 }, (_, i) => (i + 1).toString());

  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-2 text-base">
        <Calendar size={16} className="text-orange" />
        Date of Birth
      </Label>
      
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="day" className="text-sm text-muted-foreground mb-1 block">Day</Label>
          <Select value={day} onValueChange={onDayChange}>
            <SelectTrigger id="day" className={cn(
              "border-orange/20 hover:bg-orange/5 hover:text-orange",
              error && "border-red-500"
            )}>
              <SelectValue placeholder="Day" />
            </SelectTrigger>
            <SelectContent>
              {days.map(d => (
                <SelectItem key={d} value={d}>{d}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="month" className="text-sm text-muted-foreground mb-1 block">Month</Label>
          <Select value={month} onValueChange={onMonthChange}>
            <SelectTrigger id="month" className={cn(
              "border-orange/20 hover:bg-orange/5 hover:text-orange",
              error && "border-red-500"
            )}>
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {months.map(m => (
                <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="year" className="text-sm text-muted-foreground mb-1 block">Year</Label>
          <Select value={year} onValueChange={onYearChange}>
            <SelectTrigger id="year" className={cn(
              "border-orange/20 hover:bg-orange/5 hover:text-orange",
              error && "border-red-500"
            )}>
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map(y => (
                <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {error && (
        <div className="text-red-500 flex items-center gap-1 text-sm mt-1">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
      <p className="text-xs text-muted-foreground mt-1">
        This helps us tailor your workouts to your age group
      </p>
    </div>
  );
};

export default DateOfBirthInput;
