import { forwardRef, type InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export interface RadioGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  options: { value: string; label: string }[];
  name: string;
  onValueChange: (value: string) => void;
  value?: string;
}

export const RadioGroup = forwardRef<HTMLFieldSetElement, RadioGroupProps>(
  ({ className, options, name, onValueChange, value, ...props }, ref) => {
    return (
      <fieldset ref={ref} className={twMerge('flex flex-wrap gap-4', className)} {...props}>
        {options?.map((option) => (
          <div key={option.value} className="flex items-center gap-2">
            <input
              type="radio"
              id={`${name}-${option.value}`}
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onValueChange(e.target.value)}
              className="size-4 border-border text-primary-500 focus:ring-primary-500"
            />
            <label htmlFor={`${name}-${option.value}`} className="text-sm font-medium">
              {option.label}
            </label>
          </div>
        ))}
      </fieldset>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';
