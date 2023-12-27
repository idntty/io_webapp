import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../lib/utils';

const badgeVariants = cva(
  'inline-flex justify-center items-center rounded-2xl font-medium text-center',
  {
    variants: {
      variant: {
        default: 'bg-brand-50 text-brand-700',
        secondary: 'bg-gray-100 text-gray-700',
      },
      size: {
        sm: 'px-[8px] py-[2px] text-xs/4',
        md: 'px-[10px] py-[2px] text-sm',
        lg: 'px-[12px] py-[4px] text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm',
    },
  },
);

export type BadgeProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof badgeVariants>;

export default function Badge({
  className,
  variant,
  size,
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}
