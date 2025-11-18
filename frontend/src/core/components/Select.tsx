import { forwardRef, type SelectHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  placeholder?: string;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, placeholder, options, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={twMerge(
          'flex h-10 w-full items-center justify-between rounded-sm border border-input bg-background px-3 py-2 text-sm',
          'ring-offset-background',
          'focus-visible:outline-hidden focus-visible:ring-3 focus-visible:ring-ring',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }
);

Select.displayName = 'Select';
