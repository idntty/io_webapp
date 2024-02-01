import * as React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

const widgetVariants = cva(
  '@container flex justify-center items-center shrink-0 rounded-[40px] border-solid bg-gray-25 font-widget',
  {
    variants: {
      variant: {
        placeholder: '',
      },
      state: {
        default: 'border border-brand-200 hover:border-orange-500',
        edit: 'border-[5px] border-orange-500',
      },
      size: {
        tiny: 'w-[180px] h-[180px]',
        long: 'w-[180px] h-[400px]',
        tall: 'w-[400px] h-[180px]',
        large: 'w-[400px] h-[400px]',
      },
    },
    defaultVariants: {
      variant: 'placeholder',
      state: 'default',
      size: 'tiny',
    },
  },
);

const placeholderTextBySize = {
  tiny: '1x1',
  long: '1x2',
  tall: '2x1',
  large: '2x2',
};

export interface WidgetProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof widgetVariants> {}

const Widget = React.forwardRef<HTMLDivElement, WidgetProps>(
  ({ className, variant, size, ...props }, ref) => {
    // FIXME: Is there a better way to handle this?
    if (!size) {
      size = 'tiny';
    }
    switch (variant) {
      case 'placeholder':
        return (
          <div
            className={cn(widgetVariants({ variant, size }), className)}
            ref={ref}
            {...props}
          >
            <div className="text-center text-6xl font-bold -tracking-[0.2px]">
              {placeholderTextBySize[size]}
            </div>
          </div>
        );
    }
  },
);
Widget.displayName = 'Widget';

export default Widget;
