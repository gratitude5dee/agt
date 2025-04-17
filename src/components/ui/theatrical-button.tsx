
import React from 'react';
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";
import { Star } from "lucide-react";

interface TheatricalButtonProps extends ButtonProps {
  goldEffect?: boolean;
  xEffect?: boolean;
  starIcon?: boolean;
}

export const TheatricalButton = React.forwardRef<HTMLButtonElement, TheatricalButtonProps>(
  ({ className, goldEffect = false, xEffect = false, starIcon = false, children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(
          "relative overflow-hidden transition-all duration-300 transform hover:scale-105 buzzer-effect",
          goldEffect ? 
            "bg-gradient-to-r from-yellow-600 to-yellow-400 hover:from-yellow-500 hover:to-yellow-300 text-black shadow-[0_0_15px_rgba(255,215,0,0.5)] hover:shadow-[0_0_25px_rgba(255,215,0,0.8)] animate-golden-pulse" : 
            "nameplate glass-button",
          xEffect && "x-button",
          className
        )}
        {...props}
      >
        {starIcon && <Star className="mr-2 h-5 w-5" />}
        <span className="relative z-10">{children}</span>
      </Button>
    );
  }
);

TheatricalButton.displayName = "TheatricalButton";
