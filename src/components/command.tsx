/* eslint-disable react/no-unknown-property */

import * as React from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { General } from 'untitledui-js';

import { cn } from '../lib/utils';

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      'flex h-full w-full flex-col overflow-hidden rounded-lg bg-white text-gray-900',
      className,
    )}
    {...props}
  />
));
Command.displayName = CommandPrimitive.displayName;

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div
    className="flex shrink-0 grow basis-0 items-center gap-[8px] self-stretch rounded-lg border border-solid border-gray-300 bg-white px-[14px] py-[10px] shadow-primary has-[:focus]:border-brand-300 has-[:disabled]:bg-gray-50 has-[:focus]:shadow-color-focused [&:has([aria-invalid='true'])]:border-error-300 [&:has([aria-invalid='true'])]:has-[:focus]:shadow-error-focused"
    cmdk-input-wrapper=""
  >
    <General.SearchMD size="20" className="stroke-gray-500" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        'shrink-0 grow basis-0 text-base font-normal text-gray-900 outline-none placeholder:text-gray-500 disabled:cursor-not-allowed',
        className,
      )}
      {...props}
    />
  </div>
));
CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="py-[10px] text-center text-base"
    {...props}
  />
));
CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn('overflow-hidden text-gray-900', className)}
    {...props}
  />
));
CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex w-full cursor-default select-none items-center justify-between gap-[8px] px-[14px] py-[10px] text-base outline-none focus:bg-gray-50 data-[disabled]:pointer-events-none',
      className,
    )}
    {...props}
  />
));
CommandItem.displayName = CommandPrimitive.Item.displayName;

export { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem };
