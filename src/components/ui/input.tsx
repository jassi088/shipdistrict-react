import * as React from 'react';

import cn from '@/utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-full w-full rounded-lg bg-white text-xs file:border-0 file:bg-transparent file:text-xs file:font-medium placeholder:text-input-placeholder focus-visible:outline-none disabled:opacity-70',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export { Input };
