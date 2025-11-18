import type { HTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export const Card = ({ className, children, ...props }: CardProps) => {
  return (
    <div
      className={twMerge(
        'rounded-sm',
        'border',
        'border-border',
        'bg-background',
        'shadow-sm',
        'p-6',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
