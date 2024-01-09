import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { General } from 'untitledui-js';

import { cn } from '../lib/utils';

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, onCheckedChange, ...props }, ref) => (
  <CheckboxPrimitive.Root
    onCheckedChange={onCheckedChange}
    ref={ref}
    className={cn(
      'group peer inline-flex h-[16px] w-[16px] content-center items-center justify-center rounded border border-solid border-gray-300 bg-white hover:border-brand-600 hover:bg-brand-50 focus:border-brand-300 focus:shadow-color-focused disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-100 aria-checked:border-brand-600 aria-checked:bg-brand-50 aria-checked:p-[2px] aria-checked:disabled:border-gray-200 aria-checked:disabled:bg-gray-100',
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator>
      <General.Check
        className="shrink-0 stroke-brand-600 stroke-[3.34] group-disabled:stroke-gray-200"
        size="12"
      />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export default Checkbox;
