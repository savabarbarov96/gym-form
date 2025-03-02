
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from 'date-fns';
import { Info, AlertCircle } from 'lucide-react';

interface PersonalInfoStepProps {
  name: string | null;
  dob: string | null;
  email: string | null;
  emailConsent: boolean;
  onChangeName: (value: string) => void;
  onChangeDob: (value: string) => void;
  onChangeEmail: (value: string) => void;
  onChangeConsent: (value: boolean) => void;
  motivationalQuote: string;
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({
  name,
  dob,
  email,
  emailConsent,
  onChangeName,
  onChangeDob,
  onChangeEmail,
  onChangeConsent,
  motivationalQuote
}) => {
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

  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDob = e.target.value;
    onChangeDob(newDob);
    setErrors(prev => ({...prev, dob: validateDob(newDob)}));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    onChangeEmail(newEmail);
    setErrors(prev => ({...prev, email: validateEmail(newEmail)}));
  };

  return (
    <div className="max-w-2xl mx-auto w-full">
      <h2 className="text-3xl font-bold text-center mb-8">Your personalized workout plan is ready!</h2>
      
      <div className="space-y-8">
        <div className="space-y-2">
          <Label htmlFor="name">Enter your name</Label>
          <Input 
            id="name" 
            value={name || ''} 
            onChange={(e) => onChangeName(e.target.value)}
            onBlur={handleNameBlur}
            placeholder="Your name"
            className="text-lg py-6"
          />
        </div>
        
        {nameEntered && name && (
          <div className="bg-orange/10 p-6 rounded-lg border border-orange/30 text-center">
            <p className="text-xl font-semibold text-orange">{motivationalQuote}</p>
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="dob">Date of birth</Label>
          <Input 
            id="dob" 
            type="date" 
            value={dob || ''} 
            onChange={handleDobChange}
            max={format(new Date(), 'yyyy-MM-dd')}
            className={errors.dob ? "border-red-500" : ""}
          />
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
          <Label htmlFor="email">Email address</Label>
          <Input 
            id="email" 
            type="email" 
            value={email || ''} 
            onChange={handleEmailChange}
            placeholder="your.email@example.com"
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <div className="text-red-500 flex items-center gap-1 text-sm mt-1">
              <AlertCircle className="h-4 w-4" />
              <span>{errors.email}</span>
            </div>
          )}
        </div>
        
        <div className="bg-card p-4 rounded-lg flex items-start gap-3">
          <div className="pt-0.5">
            <Checkbox 
              id="emailConsent" 
              checked={emailConsent} 
              onCheckedChange={(checked) => onChangeConsent(checked as boolean)}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="emailConsent" className="font-normal">
              May we send product updates to your email — expert tips, promotions, special offers?
            </Label>
            <p className="text-xs text-muted-foreground">
              You can change your mind at any time by clicking the unsubscribe link in the footer of any email you receive from us.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoStep;
