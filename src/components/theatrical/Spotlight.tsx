
import React, { useState, useEffect } from 'react';

interface SpotlightProps {
  followCursor?: boolean;
  color?: string;
  size?: number;
  opacity?: number;
  className?: string;
  fixed?: boolean;
  x?: number;
  y?: number;
  intensity?: "low" | "medium" | "high";
  pulsing?: boolean;
}

const Spotlight: React.FC<SpotlightProps> = ({
  followCursor = false,
  color = "255, 255, 255",
  size = 300,
  opacity = 0.2,
  className = "",
  fixed = false,
  x: initialX,
  y: initialY,
  intensity = "medium",
  pulsing = false
}) => {
  const [position, setPosition] = useState({ x: initialX || 0, y: initialY || 0 });
  const [pulse, setPulse] = useState(opacity);

  useEffect(() => {
    if (followCursor) {
      const handleMouseMove = (e: MouseEvent) => {
        setPosition({ x: e.clientX, y: e.clientY });
      };

      window.addEventListener('mousemove', handleMouseMove);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [followCursor]);

  useEffect(() => {
    if (pulsing) {
      const interval = setInterval(() => {
        setPulse(prev => prev * 0.8 + (opacity * 0.2));
      }, 50);
      
      return () => clearInterval(interval);
    }
  }, [pulsing, opacity]);

  // Determine blur amount based on intensity
  const blurAmount = intensity === "low" ? 30 : 
                    intensity === "high" ? 10 : 20;
  
  // Center glow effect that's more intense
  const centerGlowSize = size * 0.3;

  return (
    <>
      <div
        className={`spotlight ${fixed ? 'fixed' : 'absolute'} pointer-events-none ${className}`}
        style={{
          left: position.x,
          top: position.y,
          width: size,
          height: size,
          background: `radial-gradient(circle, rgba(${color},${pulsing ? pulse : opacity}) 0%, rgba(${color},0) 70%)`,
          transform: 'translate(-50%, -50%)',
          zIndex: 1,
          filter: `blur(${blurAmount}px)`,
        }}
      />
      <div
        className={`spotlight ${fixed ? 'fixed' : 'absolute'} pointer-events-none`}
        style={{
          left: position.x,
          top: position.y,
          width: centerGlowSize,
          height: centerGlowSize,
          background: `radial-gradient(circle, rgba(${color},${(pulsing ? pulse : opacity) * 1.5}) 0%, rgba(${color},0) 70%)`,
          transform: 'translate(-50%, -50%)',
          zIndex: 1,
        }}
      />
    </>
  );
};

export default Spotlight;
