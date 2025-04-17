
import React from 'react';

interface LightBeamsProps {
  beamCount?: number;
  className?: string;
}

const LightBeams: React.FC<LightBeamsProps> = ({
  beamCount = 6,
  className = ""
}) => {
  const beams = Array.from({ length: beamCount }).map((_, index) => {
    const rotation = Math.floor(Math.random() * 60) - 30;
    const width = Math.floor(Math.random() * 2) + 1;
    const left = `${Math.floor(Math.random() * 100)}%`;
    const opacity = Math.random() * 0.4 + 0.1;
    const color = [
      'rgba(255,255,255,{opacity})',
      'rgba(173,216,230,{opacity})',
      'rgba(255,0,0,{opacity})',
      'rgba(255,215,0,{opacity})',
      'rgba(138,43,226,{opacity})'
    ][Math.floor(Math.random() * 5)].replace('{opacity}', opacity.toString());

    return (
      <div 
        key={index}
        className="absolute top-0 h-[120%]"
        style={{
          width: `${width}px`,
          left,
          background: `linear-gradient(to bottom, ${color}, transparent)`,
          transform: `rotate(${rotation}deg)`,
          opacity: opacity,
          filter: 'blur(5px)',
          zIndex: 0,
        }}
      />
    );
  });

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {beams}
    </div>
  );
};

export default LightBeams;
