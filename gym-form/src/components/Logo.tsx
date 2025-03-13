import React from "react";

const Logo = () => {
  // Use the local logo file from public directory
  const logoUrl = "/rm-gym-logo.png";
  
  return (
    <div className="bg-white p-2 rounded-xl shadow-sm">
      <img 
        src={logoUrl} 
        alt="RM Gym Logo" 
        className="h-10 rounded-lg" 
        style={{ objectFit: 'contain' }}
      />
    </div>
  );
};

export default Logo;
