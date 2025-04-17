
import React, { useState, useEffect } from 'react';

interface LightBeamsProps {
  beamCount?: number;
  className?: string;
  animated?: boolean;
  colors?: string[];
  intensity?: "low" | "medium" | "high";
  agtStyle?: boolean;
}

const LightBeams: React.FC<LightBeamsProps> = ({
  beamCount = 6,
  className = "",
  animated = true,
  colors = [],
  intensity = "medium",
  agtStyle = true
}) => {
  const [beams, setBeams] = useState<React.ReactNode[]>([]);
  
  // Default AGT colors if none provided
  const defaultColors = agtStyle ? [
    'rgba(27,117,188,{opacity})',   // AGT blue
    'rgba(227,25,55,{opacity})',    // AGT red
    'rgba(255,201,38,{opacity})',   // AGT gold
    'rgba(255,255,255,{opacity})'   // White
  ] : [
    'rgba(255,255,255,{opacity})',
    'rgba(173,216,230,{opacity})',
    'rgba(255,0,0,{opacity})',
    'rgba(255,215,0,{opacity})',
    'rgba(138,43,226,{opacity})'
  ];
  
  const beamColors = colors.length > 0 ? colors : defaultColors;
  
  const getOpacityByIntensity = () => {
    switch(intensity) {
      case "low": return { min: 0.05, max: 0.15 };
      case "high": return { min: 0.2, max: 0.5 };
      default: return { min: 0.1, max: 0.3 }; // medium
    }
  };
  
  useEffect(() => {
    const { min, max } = getOpacityByIntensity();
    
    const generateBeams = () => {
      return Array.from({ length: beamCount }).map((_, index) => {
        const rotation = agtStyle 
          ? (index % 2 === 0 ? 45 : -45) + (Math.random() * 30 - 15)
          : Math.floor(Math.random() * 180) - 90;
          
        const width = agtStyle
          ? Math.floor(Math.random() * 3) + 2
          : Math.floor(Math.random() * 2) + 1;
          
        const left = `${Math.floor(Math.random() * 100)}%`;
        const opacity = Math.random() * (max - min) + min;
        const color = beamColors[Math.floor(Math.random() * beamColors.length)].replace('{opacity}', opacity.toString());
        
        // For AGT style, add a more structured grid-like pattern
        const top = agtStyle
          ? `${Math.floor(index / 2) * (100 / (beamCount / 2))}%`
          : '0';
          
        const height = agtStyle ? '200%' : '120%';
        
        const blurAmount = agtStyle ? '8px' : '5px';
        
        const animationDuration = animated ? `${Math.random() * 10 + 10}s` : '0s';
        const animationDelay = animated ? `${Math.random() * -10}s` : '0s';

        return (
          <div 
            key={index}
            className="absolute"
            style={{
              width: `${width}px`,
              height,
              left,
              top,
              background: `linear-gradient(to bottom, ${color}, transparent)`,
              transform: `rotate(${rotation}deg)`,
              filter: `blur(${blurAmount})`,
              opacity: opacity,
              transition: 'all 0.5s ease',
              animation: animated ? `lightBeamMove ${animationDuration} ease-in-out infinite alternate` : 'none',
              animationDelay,
              zIndex: 0,
            }}
          />
        );
      });
    };

    setBeams(generateBeams());
    
    if (animated) {
      // Add keyframes for animation
      const style = document.createElement('style');
      style.innerHTML = `
        @keyframes lightBeamMove {
          0% {
            transform: rotate(${agtStyle ? '45' : '0'}deg) translateX(0);
            opacity: ${min};
          }
          100% {
            transform: rotate(${agtStyle ? '45' : '0'}deg) translateX(${agtStyle ? '50px' : '20px'});
            opacity: ${max};
          }
        }
      `;
      document.head.appendChild(style);
      
      return () => {
        document.head.removeChild(style);
      };
    }
  }, [beamCount, animated, beamColors, intensity, agtStyle]);

  return (
    <div className={`absolute inset-0 overflow-hidden led-panel ${className}`}>
      {beams}
      
      {agtStyle && (
        // Add horizontal LED-like bands for the AGT stage look
        <>
          {Array.from({ length: 6 }).map((_, index) => (
            <div 
              key={`horizontal-${index}`}
              className="absolute w-full h-px bg-blue-500/10"
              style={{
                top: `${(index + 1) * 15}%`,
                boxShadow: '0 0 8px rgba(27, 117, 188, 0.3)'
              }}
            />
          ))}
          
          {Array.from({ length: 6 }).map((_, index) => (
            <div 
              key={`vertical-${index}`}
              className="absolute w-px h-full bg-blue-500/10"
              style={{
                left: `${(index + 1) * 15}%`,
                boxShadow: '0 0 8px rgba(27, 117, 188, 0.3)'
              }}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default LightBeams;
