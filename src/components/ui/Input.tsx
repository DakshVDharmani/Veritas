import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, id, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    return (
      <div className="relative pt-5 mb-4">
        <input
          ref={ref}
          id={id}
          className={cn(
            "block w-full bg-transparent border-b border-forest-divider py-2 text-text-primary placeholder-transparent focus:outline-none transition-colors duration-300",
            "font-sans text-base",
            className
          )}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            setHasValue(!!e.target.value);
            props.onBlur?.(e);
          }}
          onChange={(e) => {
            setHasValue(!!e.target.value);
            props.onChange?.(e);
          }}
          {...props}
        />
        <label
          htmlFor={id}
          className={cn(
            "absolute left-0 transition-all duration-300 ease-institutional pointer-events-none uppercase tracking-wider",
            (isFocused || hasValue) 
              ? "top-0 text-[10px] text-accent font-semibold" 
              : "top-6 text-xs text-text-muted font-medium"
          )}
        >
          {label}
        </label>
        {/* Animated Border */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isFocused ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0.0, 0.2, 1] }}
          className="absolute bottom-0 left-0 w-full h-[1px] bg-accent origin-left"
        />
      </div>
    );
  }
);
