import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Arrow, General } from 'untitledui-js';

import { cn } from '../lib/utils';

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      'group flex h-[44px] w-full shrink-0 items-center justify-between gap-[8px] self-stretch rounded-lg border border-solid border-gray-300 bg-white px-[14px] py-[10px] text-base text-gray-900 shadow-primary placeholder:text-gray-500 focus:border-brand-300 focus:shadow-color-focused disabled:cursor-not-allowed [&>span]:line-clamp-1',
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <Arrow.ChevronDown
        size="20"
        className="hidden stroke-gray-500 group-data-[state=closed]:block"
      />
    </SelectPrimitive.Icon>
    <SelectPrimitive.Icon asChild>
      <Arrow.ChevronUp
        size="20"
        className="hidden stroke-gray-500 group-data-[state=open]:block"
      />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        'shadow-select relative z-50 max-h-[320px] overflow-hidden rounded-lg border bg-white text-base text-gray-900 data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className,
      )}
      position="popper"
      {...props}
    >
      <SelectPrimitive.Viewport
        className={cn(
          'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] p-[8px]',
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex w-full cursor-default select-none items-center justify-between gap-[8px] px-[14px] py-[10px] text-base text-gray-900 outline-none focus:bg-gray-50 data-[disabled]:pointer-events-none',
      className,
    )}
    {...props}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    <span className="flex items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <General.Check size="20" className="stroke-brand-600" />
      </SelectPrimitive.ItemIndicator>
    </span>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
};
