
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
          <div className="flex flex-col items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 
              ${step.status === 'completed' 
                ? 'bg-green-600 border-green-500' 
                : step.status === 'current'
                  ? 'bg-indigo-600 border-indigo-500' 
                  : 'bg-gray-800 border-gray-700'}`}>
              {step.status === 'completed' ? (
                <Check className="h-5 w-5 text-white" />
              ) : step.status === 'current' ? (
                <CircleDot className="h-5 w-5 text-white" />
              ) : (
                <span className="text-gray-400">{step.id}</span>
              )}
            </div>
            <span className={`mt-2 text-sm ${
              step.status === 'current' ? 'text-white font-medium' : 
              step.status === 'completed' ? 'text-gray-300' : 'text-gray-500'
            }`}>
              {step.label}
            </span>
          </div>
          
          {/* Connector line between steps */}
          {index < steps.length - 1 && (
            <div 
              className={`flex-1 h-0.5 mx-2 ${
                step.status === 'completed' ? 'bg-green-600' : 'bg-gray-700'
              }`} 
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepIndicator;
