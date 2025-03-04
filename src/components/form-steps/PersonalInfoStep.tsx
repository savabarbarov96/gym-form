
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { format, isValid, parseISO } from 'date-fns';
import { AlertCircle, User, Calendar, Mail, CheckCircle2 } from 'lucide-react';
import { useSurvey } from '@/contexts/SurveyContext';
import { motion } from 'framer-motion';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface PersonalInfoStepProps {
  name?: string | null;
  dob?: string | null;
  email?: string | null;
  emailConsent?: boolean;
  onChangeName?: (value: string) => void;
  onChangeDob?: (value: string) => void;
  onChangeEmail?: (value: string) => void;
  onChangeConsent?: (value: boolean) => void;
  personalInfo?: {
    name: string | null;
    dob: string | null;
    email: string | null;
    emailConsent: boolean;
  };
  onChange?: (personalInfo: any) => void;
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({
  name: propName,
  dob: propDob,
  email: propEmail,
  emailConsent: propEmailConsent,
  onChangeName,
  onChangeDob,
  onChangeEmail,
  onChangeConsent,
  personalInfo,
  onChange
}) => {
  const { generateQuote } = useSurvey();
  
  // Use either direct props or from personalInfo object
  const name = personalInfo?.name || propName || null;
  const dob = personalInfo?.dob || propDob || null;
  const email = personalInfo?.email || propEmail || null;
  const emailConsent = personalInfo?.emailConsent ?? propEmailConsent ?? false;
  
  const [nameEntered, setNameEntered] = useState(!!name);
  const [errors, setErrors] = useState({
    dob: '',
    email: ''
  });

  const handleNameBlur = () => {
    setNameEntered(!!name);
  };

  const validateDob = (dateStr: string) => {
    if (!dateStr) return "Date of birth is required";
    
    const today = new Date();
    const birthDate = new Date(dateStr);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    if (age < 10) return "You must be at least 10 years old";
    if (age > 80) return "Please enter a valid date of birth (maximum age is 80)";
    
    return "";
  };

  const validateEmail = (email: string) => {
    if (!email) return "Email is required";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    
    return "";
  };

  const handleNameChange = (value: string) => {
    if (onChange) {
      onChange({ ...personalInfo, name: value });
    } else if (onChangeName) {
      onChangeName(value);
    }
  };

  const handleDobChange = (date: Date | undefined) => {
    const dateStr = date ? format(date, 'yyyy-MM-dd') : '';
    const dobError = validateDob(dateStr);
    setErrors(prev => ({ ...prev, dob: dobError }));
    
    if (onChange) {
      onChange({ ...personalInfo, dob: dateStr });
    } else if (onChangeDob) {
      onChangeDob(dateStr);
    }
  };

  const handleEmailChange = (value: string) => {
    const emailError = validateEmail(value);
    setErrors(prev => ({ ...prev, email: emailError }));
    
    if (onChange) {
      onChange({ ...personalInfo, email: value });
    } else if (onChangeEmail) {
      onChangeEmail(value);
    }
  };

  const handleConsentChange = (checked: boolean) => {
    if (onChange) {
      onChange({ ...personalInfo, emailConsent: checked });
    } else if (onChangeConsent) {
      onChangeConsent(checked);
    }
  };

  // Generate motivational quote based on the name
  const motivationalQuote = name ? generateQuote(name) : '';

  return (
    <div className="max-w-2xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-bold text-center mb-2">Your personalized workout plan is ready!</h2>
        <p className="text-muted-foreground text-center mb-10">Just a few more details to customize your fitness journey</p>
        
        <div className="bg-card rounded-xl shadow-lg p-8 space-y-8">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2 text-base">
              <User size={16} className="text-orange" />
              Your Name
            </Label>
            <Input 
              id="name" 
              value={name || ''} 
              onChange={(e) => handleNameChange(e.target.value)}
              onBlur={handleNameBlur}
              placeholder="Your name"
              className="text-lg py-6 border-orange/20 focus:border-orange/50 focus:ring-orange/30"
            />
          </div>
          
          {nameEntered && name && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-r from-orange/10 to-orange/20 p-6 rounded-lg border border-orange/20"
            >
              <p className="text-xl font-semibold text-orange">{motivationalQuote}</p>
            </motion.div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="dob" className="flex items-center gap-2 text-base">
              <Calendar size={16} className="text-orange" />
              Date of Birth
            </Label>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="dob"
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal border-orange/20 hover:bg-orange/5 hover:text-orange py-6",
                    !dob && "text-muted-foreground",
                    errors.dob && "border-red-500"
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {dob && isValid(parseISO(dob)) ? format(parseISO(dob), 'PPP') : "Select your birth date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={dob ? parseISO(dob) : undefined}
                  onSelect={handleDobChange}
                  disabled={(date) => {
                    // Disable future dates and dates more than 80 years in the past
                    const today = new Date();
                    const minDate = new Date();
                    minDate.setFullYear(today.getFullYear() - 80);
                    return date > today || date < minDate;
                  }}
                  initialFocus
                  className="rounded-md border border-orange/20"
                />
              </PopoverContent>
            </Popover>
            
            {errors.dob && (
              <div className="text-red-500 flex items-center gap-1 text-sm mt-1">
                <AlertCircle className="h-4 w-4" />
                <span>{errors.dob}</span>
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              This helps us tailor your workouts to your age group
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2 text-base">
              <Mail size={16} className="text-orange" />
              Email Address
            </Label>
            <Input 
              id="email" 
              type="email" 
              value={email || ''} 
              onChange={(e) => handleEmailChange(e.target.value)}
              placeholder="your.email@example.com"
              className={`border-orange/20 focus:border-orange/50 focus:ring-orange/30 ${errors.email ? "border-red-500" : ""}`}
            />
            {errors.email && (
              <div className="text-red-500 flex items-center gap-1 text-sm mt-1">
                <AlertCircle className="h-4 w-4" />
                <span>{errors.email}</span>
              </div>
            )}
          </div>
          
          <div className="bg-card p-5 rounded-lg flex items-start gap-3 border border-orange/10">
            <div className="pt-0.5">
              <Checkbox 
                id="emailConsent" 
                checked={emailConsent} 
                onCheckedChange={(checked) => handleConsentChange(checked as boolean)}
                className="text-orange border-orange/30"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="emailConsent" className="font-medium flex items-center gap-2">
                <CheckCircle2 size={16} className="text-orange" />
                Stay Updated
              </Label>
              <p className="text-sm text-muted-foreground">
                May we send product updates to your email — expert tips, promotions, special offers?
              </p>
              <p className="text-xs text-muted-foreground">
                You can change your mind at any time by clicking the unsubscribe link in the footer of any email you receive from us.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PersonalInfoStep;
