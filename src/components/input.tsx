import * as React from 'react';
// import { cva, type VariantProps } from 'class-variance-authority';
import * as UntitledUI from 'untitledui-js';

import { cn } from '../lib/utils';

// const inputVariants = cva();

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  Icon?: React.ComponentType<UntitledUI.SVGComponentProps>;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, Icon, ...props }, ref) => {
    return (
      <div
        className={cn(
          'flex w-full flex-col items-start gap-[6px] self-stretch',
          className,
        )}
      >
        {/* Label */}
        {label && (
          <div className="text-sm font-medium text-gray-700">{label}</div>
        )}
        {/* Input field */}
        {/* FIXME: When should we focus an input field? */}
        {/* FIXME: Couldn't get tailwind has: to work */}
        <div className="[&:has([aria-invalid='true'])]:border-error-300 [&:has([aria-invalid='true'])]:has-[:focus]:shadow-error-focused flex items-center gap-[8px] self-stretch rounded-lg border border-solid border-gray-300 bg-white px-[14px] py-[10px] shadow-primary has-[:focus]:border-brand-300 has-[:disabled]:bg-gray-50 has-[:focus]:shadow-color-focused">
          <div className="flex flex-shrink-0 flex-grow basis-0 items-center gap-[8px]">
            {Icon && <Icon size="20" className="stroke-gray-500" />}
            <input
              type={type}
              ref={ref}
              className="flex-shrink-0 flex-grow basis-0 text-base font-normal text-gray-900 outline-none placeholder:text-gray-500"
              {...props}
            />
          </div>
          {props['aria-invalid'] ? (
            <UntitledUI.Alerts.AlertCircle
              size="16"
              className={'stroke-error-500'}
            />
          ) : (
            <UntitledUI.General.HelpCircle
              size="16"
              className={'stroke-gray-400'}
            />
          )}
        </div>
      </div>
    );
  },
);
Input.displayName = 'Input';

export default Input;
