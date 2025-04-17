
import React from 'react';
import { cn } from "@/lib/utils";

interface TheatricalTextProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "metallic" | "golden" | "gradient" | "agt-title" | "agt-subtitle";
  shadow?: boolean;
  glow?: boolean;
  letterSpacing?: "normal" | "wide" | "wider" | "widest";
  as?: React.ElementType;
  backlit?: boolean;
}

export const TheatricalText = React.forwardRef<
  HTMLDivElement,
  TheatricalTextProps
>(({ 
    className, 
    variant = "metallic", 
    shadow = true, 
    glow = false, 
    letterSpacing = "normal", 
    as: Component = "div", 
    backlit = false,
    children, 
    ...props 
  }, ref) => {
  
  const letterSpacingClasses = {
    normal: "tracking-normal",
    wide: "tracking-wide",
    wider: "tracking-wider",
    widest: "tracking-widest"
  };
  
  const getVariantClass = () => {
    switch(variant) {
      case "agt-title":
        return "text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-500 font-black uppercase";
      case "agt-subtitle":
        return "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 font-semibold";
      case "metallic":
        return "metallic-text";
      case "golden":
        return "golden-text";
      case "gradient":
        return "text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500";
      default:
        return "";
    }
  };
  
  return (
    <Component
      ref={ref}
      className={cn(
        getVariantClass(),
        letterSpacingClasses[letterSpacing],
        shadow && variant !== "agt-subtitle" && "drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]",
        glow && "filter drop-shadow(0 0 5px currentColor)",
        backlit && "relative isolate",
        className
      )}
      {...props}
    >
      {children}
      {backlit && (
        <span 
          className="absolute inset-0 -z-10 blur-md opacity-50"
          aria-hidden="true"
        >
          {children}
        </span>
      )}
    </Component>
  );
});

TheatricalText.displayName = "TheatricalText";
