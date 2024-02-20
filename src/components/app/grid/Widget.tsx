import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Shapes } from 'untitledui-js';

import { cn } from '../../../lib/utils';
import WidgetIcon from './WidgetIcon';
import WidgetDelete from './WidgetDelete';
import WidgetEdit from './WidgetEdit';

const widgetVariants = cva(
  '@container group relative flex justify-center items-center shrink-0 rounded-[40px] border-solid bg-gray-25 font-widget',
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
    VariantProps<typeof widgetVariants> {
  text?: string;
}

const Widget = React.forwardRef<HTMLDivElement, WidgetProps>(
  ({ className, variant, size, text, ...props }, ref) => {
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
            <WidgetIcon
              Icon={Shapes.Cube01}
              strokeClassName="stroke-gray-900 group-hover:stroke-orange-500"
            />
            <WidgetDelete />
            <div className="text-center text-6xl font-bold -tracking-[0.2px] text-gray-900">
              {text ?? placeholderTextBySize[size]}
            </div>
            <WidgetEdit />
          </div>
        );
    }
  },
);
Widget.displayName = 'Widget';

export default Widget;