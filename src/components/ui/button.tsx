import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  glow = false,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all active:scale-[0.985] disabled:opacity-50';

  const variants = {
    primary: 'bg-[#C96A2B] text-white hover:bg-[#a8552a]',
    secondary: 'bg-[#B63A32] text-white hover:bg-[#8c2c26]',
    ghost: 'bg-transparent border border-[#C96A2B]/30 text-warm-800 hover:bg-[#C96A2B]/10 hover:text-warm-900 dark:text-white/80 dark:hover:bg-white/10',
  };

  const sizes = {
    sm: 'px-5 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        glow && 'shadow-lg shadow-[#C96A2B]/40',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
