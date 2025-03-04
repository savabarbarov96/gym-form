
import React from 'react';
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2 } from 'lucide-react';

interface ConsentCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const ConsentCheckbox: React.FC<ConsentCheckboxProps> = ({ checked, onChange }) => {
  return (
    <div className="bg-card p-5 rounded-lg flex items-start gap-3 border border-orange/10">
      <div className="pt-0.5">
        <Checkbox 
          id="emailConsent" 
          checked={checked} 
          onCheckedChange={(checked) => onChange(checked as boolean)}
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
  );
};

export default ConsentCheckbox;
