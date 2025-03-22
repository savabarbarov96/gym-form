import React from 'react';

interface LogoProps {
  className?: string;
}

const LogoPlaceholder: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img 
        src="/images/logo-palm.png" 
        alt="Palm Fitness Logo" 
        className="max-h-full max-w-full object-contain"
      />
    </div>
  );
};

export default LogoPlaceholder; 