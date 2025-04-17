
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
}

const Spotlight: React.FC<SpotlightProps> = ({
  followCursor = false,
  color = "255, 255, 255",
  size = 300,
  opacity = 0.2,
  className = "",
  fixed = false,
  x: initialX,
  y: initialY
}) => {
  const [position, setPosition] = useState({ x: initialX || 0, y: initialY || 0 });

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

  return (
    <div
      className={`spotlight ${fixed ? 'fixed' : 'absolute'} pointer-events-none ${className}`}
      style={{
        left: position.x,
        top: position.y,
        width: size,
        height: size,
        background: `radial-gradient(circle, rgba(${color},${opacity}) 0%, rgba(${color},0) 70%)`,
        transform: 'translate(-50%, -50%)',
        zIndex: 1,
      }}
    />
  );
};

export default Spotlight;
