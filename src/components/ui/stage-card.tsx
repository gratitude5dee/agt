
import React from 'react';
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface StageCardProps extends React.ComponentPropsWithoutRef<typeof Card> {
  glowColor?: string;
  glassmorphism?: boolean;
  theatrical?: boolean;
  nameplate?: boolean;
  border?: "default" | "highlight" | "gold" | "red" | "blue";
  depth?: "flat" | "raised" | "deep";
}

export const StageCard = React.forwardRef<
  React.ElementRef<typeof Card>,
  StageCardProps
>(({ 
    className, 
    glowColor = "rgba(168,85,247,0.4)", 
    glassmorphism = true, 
    theatrical = true, 
    nameplate = false, 
    border = "default",
    depth = "raised",
    children, 
    ...props 
  }, ref) => {
  const borderClasses = {
    default: "border-gray-800/50",
    highlight: "border-white/30",
    gold: "border-yellow-500/50",
    red: "border-red-500/50",
    blue: "border-blue-500/50"
  };
  
  const depthClasses = {
    flat: "shadow-none",
    raised: "shadow-lg",
    deep: "shadow-xl"
  };

  return (
    <Card
      ref={ref}
      className={cn(
        "border overflow-hidden",
        theatrical && "stage-card transform transition-all duration-300",
        glassmorphism && "glass-effect",
        nameplate && "judge-nameplate nameplate-shine",
        borderClasses[border],
        depthClasses[depth],
        className
      )}
      style={{
        boxShadow: `0 8px 32px ${glowColor}`
      }}
      {...props}
    >
      {children}
    </Card>
  );
});

StageCard.displayName = "StageCard";

export const StageCardContent = React.forwardRef<
  React.ElementRef<typeof CardContent>,
  React.ComponentPropsWithoutRef<typeof CardContent>
>(({ className, ...props }, ref) => (
  <CardContent ref={ref} className={cn("p-4", className)} {...props} />
));

StageCardContent.displayName = "StageCardContent";
