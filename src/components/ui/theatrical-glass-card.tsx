
import React from 'react';
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const glassCardVariants = cva(
  "relative overflow-hidden backdrop-blur-md border transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-gray-900/40 border-gray-800/30 text-gray-200",
        primary: "bg-indigo-900/30 border-indigo-600/30 text-white",
        secondary: "bg-gray-900/50 border-gray-700/40 text-gray-100",
        accent: "bg-black/50 border-purple-500/30 text-white",
      },
      size: {
        default: "p-6",
        sm: "p-4",
        lg: "p-8",
      },
      glow: {
        none: "",
        subtle: "shadow-[0_0_15px_rgba(108,92,231,0.15)]",
        medium: "shadow-[0_0_25px_rgba(108,92,231,0.25)]",
        intense: "shadow-[0_0_35px_rgba(108,92,231,0.4)]",
      },
      hover: {
        none: "",
        raise: "hover:-translate-y-1 hover:shadow-[0_0_35px_rgba(108,92,231,0.5)]",
        glow: "hover:shadow-[0_0_35px_rgba(108,92,231,0.5)]",
        scale: "hover:scale-[1.02]",
        full: "hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(108,92,231,0.5)]",
      },
      animation: {
        none: "",
        pulse: "animate-pulse",
        float: "animate-float",
      },
      radius: {
        default: "rounded-lg",
        md: "rounded-md",
        lg: "rounded-xl",
        full: "rounded-full",
      },
      gradient: {
        none: "",
        subtle: "bg-gradient-to-br from-gray-900/70 to-gray-800/50",
        primary: "bg-gradient-to-br from-indigo-900/40 to-purple-900/30",
        vibrant: "bg-gradient-to-br from-indigo-600/20 to-purple-600/10",
        accent: "bg-gradient-to-br from-blue-900/30 via-indigo-900/20 to-purple-900/30",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      glow: "subtle",
      hover: "none",
      animation: "none",
      radius: "default",
      gradient: "none",
    },
  }
);

export interface TheatricalGlassCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glassCardVariants> {
  innerGlow?: boolean;
  beams?: boolean;
  noise?: boolean;
  threed?: boolean;
}

export const TheatricalGlassCard = React.forwardRef<
  HTMLDivElement,
  TheatricalGlassCardProps
>(({
  className,
  variant,
  size,
  glow,
  hover,
  animation,
  radius,
  gradient,
  innerGlow = false,
  beams = false,
  noise = false,
  threed = false,
  children,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        glassCardVariants({ 
          variant, 
          size, 
          glow, 
          hover, 
          animation, 
          radius, 
          gradient 
        }),
        innerGlow && "before:content-[''] before:absolute before:inset-0 before:rounded-lg before:p-0.5 before:bg-gradient-to-br before:from-indigo-500/20 before:to-purple-500/20",
        noise && "after:content-[''] after:absolute after:inset-0 after:opacity-[0.03] after:pointer-events-none after:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]",
        threed && "transform perspective-[1000px] hover:rotate-x-1 hover:rotate-y-1 transition-transform",
        className
      )}
      {...props}
    >
      {beams && (
        <>
          <div className="absolute top-0 -left-20 w-[60px] h-full rotate-[20deg] bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent transform -translate-x-full animate-[beam_5s_ease-in-out_infinite_alternate]" />
          <div className="absolute top-0 -right-20 w-[60px] h-full rotate-[-20deg] bg-gradient-to-b from-transparent via-purple-500/5 to-transparent transform translate-x-full animate-[beam_7s_ease-in-out_infinite_alternate-reverse]" />
        </>
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
});

TheatricalGlassCard.displayName = "TheatricalGlassCard";
