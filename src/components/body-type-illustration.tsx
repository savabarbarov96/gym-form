import React from "react";

export interface BodyTypeIllustrationProps {
  type: "ectomorph" | "mesomorph" | "endomorph";
  className?: string;
}

export const BodyTypeIllustration: React.FC<BodyTypeIllustrationProps> = ({
  type,
  className,
}) => {
  const illustrations = {
    ectomorph: (
      <div className={`relative overflow-hidden rounded-xl ${className}`}>
        {/* Background Stock Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/body-types/photos/ectomorph.jpg')" }}
        ></div>
        
        {/* Dark Overlay with Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30 mix-blend-multiply"></div>
      </div>
    ),
    mesomorph: (
      <div className={`relative overflow-hidden rounded-xl ${className}`}>
        {/* Background Stock Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/body-types/photos/mesomorph.jpg')" }}
        ></div>
        
        {/* Dark Overlay with Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30 mix-blend-multiply"></div>
      </div>
    ),
    endomorph: (
      <div className={`relative overflow-hidden rounded-xl ${className}`}>
        {/* Background Stock Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/body-types/photos/endomorph.jpg')" }}
        ></div>
        
        {/* Dark Overlay with Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30 mix-blend-multiply"></div>
      </div>
    ),
  };

  return illustrations[type];
}; 