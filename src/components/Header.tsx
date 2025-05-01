
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const Header: React.FC = () => {
  const [isAnimated, setIsAnimated] = useState(false);
  
  useEffect(() => {
    setIsAnimated(true);
  }, []);
  
  return (
    <header className="mb-10 py-6">
      <div className="flex flex-col items-center relative">
        {/* Background elements */}
        <div 
          className="absolute top-0 left-0 w-full h-full -z-10 opacity-70 pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute top-4 left-10 w-12 h-12 bg-crazy-hotPink rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-2 right-20 w-8 h-8 bg-crazy-neonGreen rounded-full animate-float" style={{ animationDelay: '0.8s' }}></div>
          <div className="absolute top-10 right-10 w-16 h-16 bg-crazy-electricBlue rounded-full animate-float" style={{ animationDelay: '1.2s' }}></div>
        </div>
        
        <h1 
          className={cn(
            "text-5xl md:text-6xl lg:text-7xl font-crazy font-bold text-transparent bg-clip-text relative",
            "bg-gradient-to-r from-crazy-purple via-crazy-hotPink to-crazy-electricBlue",
            isAnimated ? "animate-scale-up" : "opacity-0",
          )}
        >
          CRAZY TASKS
        </h1>
        
        <div 
          className={cn(
            "mt-2 font-bold text-xl tracking-wider relative",
            isAnimated ? "animate-scale-up" : "opacity-0",
          )}
          style={{ animationDelay: '0.2s' }}
        >
          where productivity meets insanity
        </div>
        
        {/* Decorative elements */}
        <div className="mt-6 flex items-center gap-2">
          {['!', '@', '#', '$', '%', '&', '*'].map((char, index) => (
            <span 
              key={index}
              className={cn(
                "inline-block text-xl font-bold",
                "transform rotate-3 transition-all duration-300",
                "hover:animate-wiggle hover:scale-150 cursor-default",
              )}
              style={{ 
                animationDelay: `${index * 0.1}s`,
                color: index % 2 === 0 ? '#9b87f5' : '#FF1493',
              }}
            >
              {char}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
