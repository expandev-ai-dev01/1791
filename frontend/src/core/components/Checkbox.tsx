import { forwardRef, type InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        type="checkbox"
        ref={ref}
        className={twMerge(
          'size-4 shrink-0 rounded-sm border border-primary-500 ring-offset-background',
          'focus-visible:outline-hidden focus-visible:ring-3 focus-visible:ring-ring',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'data-[state=checked]:bg-primary-500 data-[state=checked]:text-white',
          className
        )}
        {...props}
      />
    );
  }
);

Checkbox.displayName = 'Checkbox';
