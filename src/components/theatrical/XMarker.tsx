
import React from 'react';
import { cn } from "@/lib/utils";

interface XMarkerProps {
  size?: number;
  color?: string;
  glowing?: boolean;
  className?: string;
  strokeWidth?: number;
  agtStyle?: boolean;
}

const XMarker: React.FC<XMarkerProps> = ({
  size = 100,
  color = "#E31937",
  glowing = true,
  className = "",
  strokeWidth = 8,
  agtStyle = true
}) => {
  if (agtStyle) {
    return (
      <div 
        className={cn(
          "relative agt-x-buzzer", 
          glowing && "animate-x-glow", 
          className
        )}
        style={{ 
          width: size, 
          height: size
        }}
      />
    );
  }
  
  return (
    <div 
      className={cn(
        "relative", 
        glowing && "animate-x-glow", 
        className
      )}
      style={{ 
        width: size, 
        height: size
      }}
    >
      <div 
        className="absolute top-1/2 left-0 w-full h-0 origin-center"
        style={{ 
          borderTop: `${strokeWidth}px solid ${color}`,
          transform: "rotate(45deg)"
        }}
      />
      <div 
        className="absolute top-1/2 left-0 w-full h-0 origin-center"
        style={{ 
          borderTop: `${strokeWidth}px solid ${color}`,
          transform: "rotate(-45deg)" 
        }}
      />
    </div>
  );
};

export default XMarker;
