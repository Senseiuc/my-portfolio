import React from 'react';

interface LogoProps {
  className?: string;
  animate?: boolean;
}

export default function Logo({ className = "w-12 h-12", animate = true }: LogoProps) {
  return (
    <svg 
      viewBox="0 0 200 200" 
      className={`${className} transition-all duration-500`}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Glowing Orange Filter */}
        <filter id="orange-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        
        {/* Gradient for High-tech Accent */}
        <linearGradient id="orange-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>
      </defs>

      {/* Rotating High-tech Hexagon / Octagon Ring */}
      <polygon 
        points="100,10 163,37 190,100 163,163 100,190 37,163 10,100 37,37" 
        stroke="url(#orange-grad)" 
        strokeWidth="2.5" 
        strokeDasharray="12 8"
        className={animate ? "animate-[spin_20s_linear_infinite]" : ""}
        style={{ transformOrigin: '100px 100px', opacity: 0.7 }}
      />

      {/* Outer Glow Circle */}
      <circle 
        cx="100" 
        cy="100" 
        r="75" 
        stroke="#ea580c" 
        strokeWidth="1" 
        strokeDasharray="4 6" 
        className={animate ? "animate-[spin_40s_linear_infinite_reverse]" : ""}
        style={{ transformOrigin: '100px 100px', opacity: 0.4 }}
      />

      {/* Stylized Cyber Sensei Mask Group */}
      <g filter="url(#orange-glow)">
        {/* Hair Topknot */}
        <path 
          d="M 92 45 C 92 25, 108 25, 108 45 Z" 
          fill="url(#orange-grad)" 
        />
        
        {/* Head Contour / Hair */}
        <path 
          d="M 70 75 C 70 45, 130 45, 130 75 C 130 90, 125 100, 120 105 L 100 122 L 80 105 C 75 100, 70 90, 70 75 Z" 
          fill="#070a13" 
          stroke="url(#orange-grad)" 
          strokeWidth="3.5" 
        />

        {/* Cyber Visor / Eyes (Pulsing) */}
        <path 
          d="M 80 75 L 120 75 L 115 88 L 85 88 Z" 
          fill="#f97316"
          className={animate ? "animate-pulse" : ""}
          style={{ animationDuration: '2s' }}
        />

        {/* Visor Core Glow Line */}
        <line 
          x1="87" 
          y1="81" 
          x2="113" 
          y2="81" 
          stroke="#fff" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
        />

        {/* Flowing Cyber Beard / Grill */}
        <path 
          d="M 85 108 L 100 135 L 115 108 L 110 115 L 100 120 L 90 115 Z" 
          fill="url(#orange-grad)" 
        />
        
        {/* Grill details */}
        <line x1="95" y1="113" x2="95" y2="120" stroke="#070a13" strokeWidth="1.5" />
        <line x1="100" y1="115" x2="100" y2="125" stroke="#070a13" strokeWidth="1.5" />
        <line x1="105" y1="113" x2="105" y2="120" stroke="#070a13" strokeWidth="1.5" />
      </g>
    </svg>
  );
}
