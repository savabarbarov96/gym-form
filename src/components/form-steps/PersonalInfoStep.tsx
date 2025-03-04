
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSurvey } from '@/contexts/SurveyContext';
import {
  NameInput,
  DateOfBirthInput,
  EmailInput,
  ConsentCheckbox,
  MotivationalQuote
} from './personal-info';

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

  // Parse the dob to get day, month, year if available
  const parsedDob = dob ? new Date(dob) : null;
  const [day, setDay] = useState<string>(parsedDob ? parsedDob.getDate().toString() : '');
  const [month, setMonth] = useState<string>(parsedDob ? (parsedDob.getMonth() + 1).toString() : '');
  const [year, setYear] = useState<string>(parsedDob ? parsedDob.getFullYear().toString() : '');

  // Debug state updates
  useEffect(() => {
    console.log("PersonalInfoStep state:", { 
      name, dob, email, emailConsent, 
      dayMonthYear: { day, month, year } 
    });
  }, [name, dob, email, emailConsent, day, month, year]);

  const handleNameBlur = () => {
    setNameEntered(!!name);
  };

  const validateDob = (dateStr: string) => {
    if (!dateStr) return "Date of birth is required";
    
    const today = new Date();
    const birthDate = new Date(dateStr);
    
    // Check if the date is valid
    if (isNaN(birthDate.getTime())) {
      return "Please enter a valid date of birth";
    }
    
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

  const updateDob = () => {
    if (day && month && year) {
      // Format as YYYY-MM-DD
      const paddedMonth = month.padStart(2, '0');
      const paddedDay = day.padStart(2, '0');
      const dateStr = `${year}-${paddedMonth}-${paddedDay}`;
      
      const dobError = validateDob(dateStr);
      setErrors(prev => ({ ...prev, dob: dobError }));
      
      if (!dobError) {
        console.log("Setting DOB:", dateStr);
        if (onChange) {
          onChange({ ...personalInfo, dob: dateStr });
        } else if (onChangeDob) {
          onChangeDob(dateStr);
        }
      }
    } else {
      setErrors(prev => ({ ...prev, dob: "Date of birth is required" }));
    }
  };

  const handleDayChange = (value: string) => {
    setDay(value);
    setTimeout(() => {
      updateDob();
    }, 0);
  };

  const handleMonthChange = (value: string) => {
    setMonth(value);
    // If day is greater than the days in the new month, adjust it
    const daysInNewMonth = getDaysInMonth(parseInt(value), parseInt(year || '2000'));
    if (parseInt(day) > daysInNewMonth) {
      setDay(daysInNewMonth.toString());
    }
    setTimeout(() => {
      updateDob();
    }, 0);
  };

  const handleYearChange = (value: string) => {
    setYear(value);
    // Check if it's February in a leap year
    if (month === '2') {
      const daysInNewMonth = getDaysInMonth(2, parseInt(value));
      if (parseInt(day) > daysInNewMonth) {
        setDay(daysInNewMonth.toString());
      }
    }
    setTimeout(() => {
      updateDob();
    }, 0);
  };

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate();
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
          <NameInput 
            name={name} 
            onChange={handleNameChange} 
            onBlur={handleNameBlur} 
          />
          
          {nameEntered && name && (
            <MotivationalQuote quote={motivationalQuote} />
          )}
          
          <DateOfBirthInput 
            day={day}
            month={month}
            year={year}
            error={errors.dob}
            onDayChange={handleDayChange}
            onMonthChange={handleMonthChange}
            onYearChange={handleYearChange}
          />
          
          <EmailInput 
            email={email} 
            error={errors.email} 
            onChange={handleEmailChange} 
          />
          
          <ConsentCheckbox 
            checked={emailConsent} 
            onChange={handleConsentChange} 
          />
        </div>
      </motion.div>
    </div>
  );
};

export default PersonalInfoStep;
