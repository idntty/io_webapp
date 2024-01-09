import * as React from 'react';
import * as RadioGroup from '@radix-ui/react-radio-group';
// import * as Label from '@radix-ui/react-label';
import { type SVGComponentProps, General } from 'untitledui-js';

import { cn } from '../lib/utils';

export interface IdentityRadioGroupProps {
  className?: string;
  variants: {
    type: string;
    title: string;
    description: string;
    Icon: React.ComponentType<SVGComponentProps>;
  }[];
  onValueChange?: (value: string) => void;
}

const IdentityRadioGroup: React.FC<IdentityRadioGroupProps> = ({
  className,
  variants,
  onValueChange,
}) => {
  return (
    <RadioGroup.Root
      onValueChange={onValueChange}
      className={cn(
        'flex flex-col items-start justify-center gap-[24px] md:flex-row',
        className,
      )}
    >
      {variants.map(({ type, title, description, Icon }, index) => (
        <RadioGroup.Item
          key={index}
          value={type}
          id={type}
          className="group flex w-[343px] cursor-pointer items-start gap-[4px] rounded-lg border border-solid border-gray-200 bg-white p-[16px] text-base hover:border-brand-300 focus:border-brand-300 focus:shadow-color-focused disabled:cursor-not-allowed disabled:bg-gray-50 aria-checked:border-brand-300 aria-checked:bg-brand-50 aria-checked:hover:border-brand-500 aria-checked:disabled:border-gray-200 aria-checked:disabled:bg-gray-50"
        >
          <div className="flex flex-shrink-0 flex-grow basis-0 items-start gap-[16px] text-left">
            <div className="flex h-[32px] w-[32px] items-center justify-center">
              {/* FIXME: padding: 10px makes it too small for some reason, also shifted down */}
              <div className="flex h-[40px] w-[40px] flex-shrink-0 items-center justify-center rounded-[28px] border-[6px] border-solid border-brand-50 bg-brand-100 p-[15px] group-disabled:border-gray-50 group-disabled:bg-gray-100">
                <Icon
                  size="20"
                  // FIXME: stroke-width: 1.66667 looks too thin for some reason
                  className="flex-shrink-0 stroke-brand-600 stroke-2 group-disabled:stroke-gray-300"
                />
              </div>
            </div>
            <div className="flex flex-shrink-0 flex-grow basis-0 flex-col items-start gap-[2px]">
              <label
                className="self-stretch font-medium text-gray-700 group-aria-checked:text-brand-800 group-aria-checked:group-disabled:text-gray-700"
                htmlFor="personal"
              >
                {title}
              </label>
              <div className="self-stretch font-normal text-gray-500 group-aria-checked:text-brand-600 group-aria-checked:group-disabled:text-gray-500">
                {description}
              </div>
            </div>
          </div>
          {/* TODO: Maybe use Checkbox component here? */}
          <div className="flex h-[20px] w-[20px] flex-shrink-0 content-center items-center justify-center rounded-[10px] border border-solid border-gray-300 bg-white group-hover:border-brand-600 group-hover:bg-brand-50 group-focus:border-brand-300 group-disabled:border-gray-200 group-disabled:bg-gray-100 group-aria-checked:border-brand-600 group-aria-checked:bg-brand-600 group-aria-checked:p-[3px] group-aria-checked:group-disabled:border-gray-200 group-aria-checked:group-disabled:bg-gray-200">
            <RadioGroup.Indicator>
              <General.Check
                size="14"
                // FIXME: stroke-width: 2 looks too thin for some reason
                className="flex-shrink-0 stroke-white stroke-[3]"
              />
            </RadioGroup.Indicator>
          </div>
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  );
};

export default IdentityRadioGroup;
