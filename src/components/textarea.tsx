import * as React from 'react';
import { cn } from '../lib/utils';

export interface TextAreaProps
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <div
        className={cn(
          'flex w-full flex-col items-start gap-[6px] self-stretch',
          className,
        )}
      >
        {label && (
          <div className="text-sm font-medium text-gray-700">{label}</div>
        )}
        {/* FIXME: When should we focus a textarea field? */}
        {/* FIXME: Couldn't get tailwind has: to work */}
        {/* FIXME: Do something about hardcoded height */}
        <div className="flex items-center gap-[8px] self-stretch rounded-lg border border-solid border-gray-300 bg-white px-[14px] py-[10px] shadow-primary has-[:focus]:border-brand-300 has-[:disabled]:bg-gray-50 has-[:focus]:shadow-color-focused [&:has([aria-invalid='true'])]:border-error-300 [&:has([aria-invalid='true'])]:has-[:focus]:shadow-error-focused">
          <textarea
            ref={ref}
            className="h-[108px] flex-shrink-0 flex-grow basis-0 resize-none self-stretch text-base font-normal text-gray-900 outline-none placeholder:text-gray-500"
            {...props}
          />
        </div>
      </div>
    );
  },
);
TextArea.displayName = 'TextArea';

export default TextArea;
