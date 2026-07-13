import React from 'react';

interface LogoProps {
  className?: string;
  animate?: boolean;
}

export default function Logo({ className = "w-12 h-12", animate = true }: LogoProps) {
  return (
    <div className={`relative ${className} flex items-center justify-center`}>
      {/* Soft ambient orange glow behind the transparent vector logo */}
      {animate && (
        <div 
          className="absolute inset-0 bg-orange-500/15 rounded-full blur-md opacity-70 animate-pulse pointer-events-none z-0" 
          style={{ animationDuration: '3s' }}
        />
      )}
      
      {/* Official transparent SVG logo */}
      <img 
        src="/My Brand Logo - senseiuc.svg" 
        alt="Senseiuc Brand Logo" 
        className={`w-full h-full object-contain relative z-10 ${animate ? 'hover:scale-105 transition-transform duration-300' : ''}`}
      />
    </div>
  );
}
