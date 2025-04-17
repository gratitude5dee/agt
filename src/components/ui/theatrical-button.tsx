
import React from 'react';
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";
import { Star } from "lucide-react";

interface TheatricalButtonProps extends ButtonProps {
  goldEffect?: boolean;
  xEffect?: boolean;
  starIcon?: boolean;
  buzzer?: boolean;
  nameplate?: boolean;
  variant?: "default" | "golden" | "judge" | "x";
  glow?: "none" | "subtle" | "intense";
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
        return "golden-buzzer";
      }
      
      if (variant === "judge" || nameplate) {
        return "judge-nameplate";
      }
      
      if (variant === "x" || xEffect) {
        return "x-button";
      }
      
      return buzzer ? "buzzer-effect" : "nameplate glass-button";
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
          "relative overflow-hidden transition-all duration-300 transform hover:scale-105",
          getVariantClass(),
          getGlowClass(),
          variant === "golden" && "animate-golden-pulse",
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
