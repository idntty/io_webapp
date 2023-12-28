import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from '@radix-ui/react-slot';

import { cn } from '../lib/utils';

const buttonVariants = cva(
  'inline-flex justify-center items-center rounded-lg font-semibold text-center border border-solid gap-[8px] disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: [
          'border-brand-600 bg-brand-600 text-white shadow-primary',
          'hover:border-brand-700 hover:bg-brand-700',
          'focus:shadow-color-focused',
          'disabled:border-brand-200 disabled:bg-brand-200',
        ],
        'secondary-color': [
          'border-brand-50 bg-brand-50 text-brand-700 shadow-primary',
          'hover:border-brand-100 hover:bg-brand-100',
          'focus:shadow-color-focused',
          'disabled:border-brand-25 disabled:bg-brand-25 disabled:text-brand-300',
        ],
        'secondary-gray': [
          'border-gray-300 bg-white text-gray-700 shadow-primary',
          'hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800',
          'focus:shadow-gray-focused',
          'disabled:border-gray-200 disabled:text-gray-300',
        ],
      },
      size: {
        sm: 'text-sm',
        md: 'text-sm',
        lg: 'text-base',
        xl: 'text-base',
        '2xl': 'text-lg',
      },
      shape: {
        rectangle: '',
        square: '',
      },
    },
    compoundVariants: [
      {
        size: 'sm',
        shape: 'square',
        class: 'p-[8px]',
      },
      {
        size: 'md',
        shape: 'square',
        class: 'p-[10px]',
      },
      {
        size: 'lg',
        shape: 'square',
        class: 'p-[12px]',
      },
      {
        size: 'xl',
        shape: 'square',
        class: 'p-[14px]',
      },
      {
        size: '2xl',
        shape: 'square',
        class: 'p-[16px]',
      },
      {
        size: 'sm',
        shape: 'rectangle',
        class: 'px-[14px] py-[8px]',
      },
      {
        size: 'md',
        shape: 'rectangle',
        class: 'px-[16px] py-[10px]',
      },
      {
        size: 'lg',
        shape: 'rectangle',
        class: 'px-[18px] py-[10px]',
      },
      {
        size: 'xl',
        shape: 'rectangle',
        class: 'px-[20px] py-[12px]',
      },
      {
        size: '2xl',
        shape: 'rectangle',
        class: 'px-[28px] py-[16px]',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'sm',
      shape: 'rectangle',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, shape, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, shape, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export default Button;
