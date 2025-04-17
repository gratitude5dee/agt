
import React from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

// Define separate props to avoid variant conflict with ButtonProps
interface TheatricalButtonProps {
  className?: string;
  goldEffect?: boolean;
  xEffect?: boolean;
  starIcon?: boolean;
  buzzer?: boolean;
  nameplate?: boolean;
  variant?: "default" | "golden" | "judge" | "x";
  glow?: "none" | "subtle" | "intense";
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export const TheatricalButton = React.forwardRef<HTMLButtonElement, TheatricalButtonProps>(
  ({ 
    className, 
    goldEffect = false, 
    xEffect = false, 
    starIcon = false, 
    buzzer = false,
    nameplate = false,
    variant = "default",
    glow = "subtle",
    children,
    ...props 
  }, ref) => {
    // Determine which variant styling to use
    const getVariantClass = () => {
      if (variant === "golden" || goldEffect) {
        return "golden-buzzer h-8";
      }
      
      if (variant === "judge" || nameplate) {
        return "judge-nameplate h-8";
      }
      
      if (variant === "x" || xEffect) {
        return "x-button h-8";
      }
      
      return buzzer ? "buzzer-effect h-8" : "nameplate glass-button h-8";
    };
    
    // Determine glow effect
    const getGlowClass = () => {
      if (glow === "intense") {
        return "shadow-[0_0_25px_rgba(255,255,255,0.3)]";
      }
      
      if (glow === "subtle") {
        return "shadow-[0_0_15px_rgba(255,255,255,0.15)]";
      }
      
      return "";
    };
    
    return (
      <Button
        ref={ref}
        className={cn(
          "relative overflow-hidden transition-all duration-300 transform hover:scale-105 py-0",
          getVariantClass(),
          getGlowClass(),
          variant === "golden" && "animate-golden-pulse",
          className
        )}
        {...props}
      >
        {starIcon && <Star className="mr-2 h-4 w-4" />}
        <span className="relative z-10">{children}</span>
      </Button>
    );
  }
);

TheatricalButton.displayName = "TheatricalButton";
