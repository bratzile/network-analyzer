import React from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const GradientText: React.FC<Props> = ({ children, className = '' }) => {
  return (
    <span className={`bg-gradient-to-r from-pink-400 to-pink-500 bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  );
};