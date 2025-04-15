
import React, { useEffect, useState } from 'react';

interface VibezSpeechBubbleProps {
  message: string;
}

const VibezSpeechBubble: React.FC<VibezSpeechBubbleProps> = ({ message }) => {
  const [currentText, setCurrentText] = useState('');
  const [index, setIndex] = useState(0);
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    // Start with a short delay to let the bubble animation happen first
    setTimeout(() => {
      setShowBubble(true);
    }, 300);
  }, []);

  // Typing effect
  useEffect(() => {
    if (showBubble && index < message.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prev => prev + message[index]);
        setIndex(index + 1);
      }, 30); // typing speed
      
      return () => clearTimeout(timeout);
    }
  }, [showBubble, index, message]);

  // Reset when message changes
  useEffect(() => {
    setCurrentText('');
    setIndex(0);
    setShowBubble(false);
    
    setTimeout(() => {
      setShowBubble(true);
    }, 300);
  }, [message]);

  return (
    <div className={`absolute top-0 right-0 -mt-16 transform translate-y-0 transition-all duration-500 ease-out ${showBubble ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
      <div className="relative bg-white/90 backdrop-blur-sm text-gray-900 p-4 rounded-lg shadow-xl max-w-xs">
        <p className="text-sm font-medium">{currentText}</p>
        <span className="absolute bottom-[-8px] right-[30px] w-4 h-4 bg-white/90 transform rotate-45"></span>
      </div>
    </div>
  );
};

export default VibezSpeechBubble;
