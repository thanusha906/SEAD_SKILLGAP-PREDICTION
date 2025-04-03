
import React, { useState, useEffect, CSSProperties } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedTransitionProps {
  children: React.ReactNode;
  className?: string;
  show?: boolean;
  animation?: 'fade' | 'slide' | 'scale';
  duration?: number;
  style?: CSSProperties;
}

const AnimatedTransition: React.FC<AnimatedTransitionProps> = ({ 
  children, 
  className,
  show = true,
  animation = 'fade',
  duration = 400,
  style,
}) => {
  const [render, setRender] = useState(show);
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    if (show) {
      setRender(true);
    } else {
      // If hiding, wait for animation to complete before unmounting
      setTimeout(() => setRender(false), duration);
    }
  }, [show, duration]);

  useEffect(() => {
    if (show) {
      if (animation === 'fade') setAnimationClass('animate-fade-in');
      else if (animation === 'slide') setAnimationClass('animate-slide-in');
      else if (animation === 'scale') setAnimationClass('animate-scale-in');
    } else {
      if (animation === 'fade') setAnimationClass('animate-fade-out');
      else if (animation === 'slide') setAnimationClass('opacity-0 translate-y-4');
      else if (animation === 'scale') setAnimationClass('opacity-0 scale-95');
    }
  }, [show, animation]);

  if (!render) return null;

  return (
    <div 
      className={cn(
        animationClass,
        className
      )}
      style={{ 
        animationDuration: `${duration}ms`,
        transition: `opacity ${duration}ms, transform ${duration}ms`,
        ...style
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedTransition;
