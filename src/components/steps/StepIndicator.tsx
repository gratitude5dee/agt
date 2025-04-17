
import React from 'react';
import { Check, CircleDot } from 'lucide-react';

type Step = {
  id: number;
  label: string;
  status: 'upcoming' | 'current' | 'completed';
};

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => {
  return (
    <div className="w-full flex items-center justify-between mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          {/* Step indicator */}
          <div className="flex flex-col items-center group relative">
            <div 
              className={`
                flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-500
                ${step.status === 'completed' 
                  ? 'bg-gradient-to-r from-[#3498db] to-[#2980b9] border-blue-500 shadow-[0_0_10px_rgba(52,152,219,0.5)]' 
                  : step.status === 'current'
                    ? 'bg-gradient-to-r from-[#6C5CE7] to-[#6050DC] border-indigo-500 shadow-[0_0_15px_rgba(108,92,231,0.4)] animate-pulse' 
                    : 'bg-gray-800/80 border-gray-700 text-gray-400'
                }
                ${step.status === 'upcoming' ? 'hover:bg-gray-700/80 hover:border-gray-600 hover:text-gray-300' : ''}
              `}
            >
              {step.status === 'completed' ? (
                <Check className="h-5 w-5 text-white transform transition-transform duration-300" />
              ) : step.status === 'current' ? (
                <CircleDot className="h-5 w-5 text-white" />
              ) : (
                <span className="text-inherit">{step.id}</span>
              )}
              
              {/* Glowing ring for current step */}
              {step.status === 'current' && (
                <div className="absolute inset-0 rounded-full border border-indigo-400/30 scale-[1.15] animate-[pulse_2s_ease-in-out_infinite] blur-[1px]"></div>
              )}
            </div>
            
            {/* Tooltip on hover */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute -top-10 bg-gray-900/90 backdrop-blur-md border border-gray-800 px-3 py-1 rounded text-xs text-white whitespace-nowrap shadow-lg">
              {step.status === 'completed' ? 'Completed' : step.status === 'current' ? 'Current Step' : 'Upcoming'}
            </div>
            
            <span className={`mt-3 text-sm font-medium tracking-wide transition-all duration-300 ${
              step.status === 'current' 
                ? 'text-white scale-105' 
                : step.status === 'completed' 
                  ? 'text-blue-300' 
                  : 'text-gray-500'
            } group-hover:text-gray-300`}>
              {step.label}
            </span>
          </div>
          
          {/* Connector line between steps */}
          {index < steps.length - 1 && (
            <div className="flex-1 h-[2px] mx-2 relative overflow-hidden">
              <div 
                className={`
                  absolute top-0 left-0 h-full bg-gradient-to-r from-[#6C5CE7] to-[#00D2FF]
                  ${step.status === 'completed' ? 'w-full' : 'w-0'}
                  transition-all duration-1000 ease-in-out
                `} 
              />
              <div className="absolute top-0 left-0 h-full w-full bg-gray-700" />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepIndicator;
