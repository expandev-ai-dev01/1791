import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={twMerge(
          'flex min-h-[80px] w-full rounded-sm border border-input bg-background px-3 py-2 text-sm',
          'ring-offset-background',
          'placeholder:text-muted-foreground',
          'focus-visible:outline-hidden focus-visible:ring-3 focus-visible:ring-ring',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';
