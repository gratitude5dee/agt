
import React from 'react';
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card"; // Import CardContent without CardProps

interface StageCardProps extends React.ComponentPropsWithoutRef<typeof Card> {
  glowColor?: string;
  glassmorphism?: boolean;
  theatrical?: boolean;
}

export const StageCard = React.forwardRef<
  React.ElementRef<typeof Card>,
  StageCardProps
>(({ className, glowColor = "rgba(168,85,247,0.4)", glassmorphism = true, theatrical = true, children, ...props }, ref) => {
  return (
    <Card
      ref={ref}
      className={cn(
        "border overflow-hidden",
        theatrical && "stage-card transform transition-all duration-300",
        glassmorphism && "glass-effect",
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
