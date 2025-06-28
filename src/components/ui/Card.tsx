import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'outlined';
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

const cardVariants = {
  default: 'bg-white border border-gray-200 shadow-sm',
  elevated: 'bg-white shadow-lg border-0',
  outlined: 'bg-white border-2 border-gray-300 shadow-none'
};

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  variant = 'default' 
}) => {
  return (
    <div className={cn(
      'rounded-xl overflow-hidden',
      cardVariants[variant],
      className
    )}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<CardHeaderProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={cn(
      'px-6 py-4 border-b border-gray-200 bg-gray-50/50',
      className
    )}>
      {children}
    </div>
  );
};

export const CardBody: React.FC<CardBodyProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={cn('px-6 py-4', className)}>
      {children}
    </div>
  );
};

export const CardFooter: React.FC<CardFooterProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={cn(
      'px-6 py-4 border-t border-gray-200 bg-gray-50/50',
      className
    )}>
      {children}
    </div>
  );
}; 