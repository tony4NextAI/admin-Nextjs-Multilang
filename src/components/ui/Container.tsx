import React from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const containerSizes = {
  sm: 'max-w-2xl',
  md: 'max-w-4xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  full: 'max-w-full'
};

export const Container: React.FC<ContainerProps> = ({ 
  children, 
  className = '', 
  size = 'xl' 
}) => {
  return (
    <div className={cn(
      'mx-auto px-4 sm:px-6 lg:px-8',
      containerSizes[size],
      className
    )}>
      {children}
    </div>
  );
}; 