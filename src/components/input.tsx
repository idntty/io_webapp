import * as React from 'react';
// import { cva, type VariantProps } from 'class-variance-authority';
import * as UntitledUI from 'untitledui-js';

import { cn } from '../lib/utils';

// const inputVariants = cva();

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  supportingMessage?: string;
  Icon?: React.ComponentType<UntitledUI.SVGComponentProps>;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, supportingMessage, Icon, ...props }, ref) => {
    return (
      <div
        className={cn(
          'flex w-[320px] flex-col items-start gap-[6px] self-stretch',
          className,
        )}
      >
        {/* Label */}
        {label && (
          <div className="text-sm font-medium text-gray-700">{label}</div>
        )}
        {/* Input field */}
        <div className="flex items-center gap-[8px] self-stretch rounded-lg border border-solid border-gray-300 bg-white px-[14px] py-[10px] shadow-primary">
          <div className="flex flex-shrink-0 flex-grow basis-0 items-center gap-[8px]">
            {Icon && <Icon size="20" className={'stroke-gray-500'} />}
            <input
              type={type}
              ref={ref}
              className="text-base font-normal text-gray-900 placeholder:text-gray-500"
              {...props}
            />
          </div>
          <UntitledUI.General.HelpCircle
            size="16"
            className={'stroke-gray-400'}
          />
        </div>
        {/* Supporing (hint/error) message */}
        {supportingMessage && (
          <div className="self-stretch text-sm text-gray-500">
            {supportingMessage}
          </div>
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';

export default Input;
