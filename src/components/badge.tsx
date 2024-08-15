import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../lib/utils';

const badgeVariants = cva(
  'inline-flex justify-center items-center rounded-2xl font-medium text-center gap-[6px]',
  {
    variants: {
      variant: {
        primary: 'bg-brand-50 text-brand-700',
        secondary: 'bg-gray-100 text-gray-700',
        success: 'bg-success-50 text-success-700',
        error: 'bg-error-50 text-error-700',
      },
      size: {
        sm: 'px-[8px] py-[2px] text-xs/4',
        md: 'px-[10px] py-[2px] text-sm',
        lg: 'px-[12px] py-[4px] text-sm',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'sm',
    },
  },
);

export type BadgeProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof badgeVariants> & {
    withDot?: boolean;
  };

const Badge: React.FC<BadgeProps> = ({
  className,
  variant,
  size,
  withDot = false,
  children,
  ...props
}) => {
  const dotColor = {
    primary: 'text-brand-700',
    secondary: 'text-gray-700',
    success: 'text-success-700',
    error: 'text-error-700',
  }[variant ?? 'primary'];

  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {withDot && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="8"
          height="8"
          viewBox="0 0 8 8"
          className={cn(dotColor, 'fill-current')}
        >
          <circle cx="4" cy="4.00037" r="3" />
        </svg>
      )}
      {children}
    </div>
  );
};

export default Badge;
