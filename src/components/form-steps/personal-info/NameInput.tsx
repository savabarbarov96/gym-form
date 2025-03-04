
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from 'lucide-react';

interface NameInputProps {
  name: string | null;
  onChange: (value: string) => void;
  onBlur: () => void;
}

const NameInput: React.FC<NameInputProps> = ({ name, onChange, onBlur }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="name" className="flex items-center gap-2 text-base">
        <User size={16} className="text-orange" />
        Your Name
      </Label>
      <Input 
        id="name" 
        value={name || ''} 
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder="Your name"
        className="text-lg py-6 border-orange/20 focus:border-orange/50 focus:ring-orange/30"
      />
    </div>
  );
};

export default NameInput;
