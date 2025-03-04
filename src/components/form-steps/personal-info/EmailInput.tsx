
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, AlertCircle } from 'lucide-react';

interface EmailInputProps {
  email: string | null;
  error: string;
  onChange: (value: string) => void;
}

const EmailInput: React.FC<EmailInputProps> = ({ email, error, onChange }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="email" className="flex items-center gap-2 text-base">
        <Mail size={16} className="text-orange" />
        Email Address
      </Label>
      <Input 
        id="email" 
        type="email" 
        value={email || ''} 
        onChange={(e) => onChange(e.target.value)}
        placeholder="your.email@example.com"
        className={`border-orange/20 focus:border-orange/50 focus:ring-orange/30 ${error ? "border-red-500" : ""}`}
      />
      {error && (
        <div className="text-red-500 flex items-center gap-1 text-sm mt-1">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default EmailInput;
