import * as React from 'react';
import * as RadioGroup from '@radix-ui/react-radio-group';
// import * as Label from '@radix-ui/react-label';
import * as UntitledUI from 'untitledui-js';

import { cn } from '../lib/utils';

export interface IdentityRadioGroupProps {
  className?: string;
}

const IdentityRadioGroup: React.FC<IdentityRadioGroupProps> = ({
  className,
}) => {
  return (
    <RadioGroup.Root
      className={cn('flex items-start justify-center gap-[24px]', className)}
    >
      <RadioGroup.Item
        value="personal"
        id="personal"
        className="group flex w-[343px] items-start gap-[4px] rounded-lg border border-solid border-gray-200 bg-white p-[16px] text-base hover:border-brand-300 focus:border-brand-300 focus:shadow-color-focused disabled:bg-gray-50 aria-checked:border-brand-300 aria-checked:bg-brand-50 hover:aria-checked:border-brand-500"
      >
        <div className="flex flex-shrink-0 flex-grow basis-0 items-start gap-[16px] text-left">
          <UntitledUI.Users.User01 size="32" />
          <div className="flex flex-shrink-0 flex-grow basis-0 flex-col items-start gap-[2px]">
            <label
              className="self-stretch font-medium text-gray-700 group-aria-checked:text-brand-800 disabled:group-aria-checked:text-gray-700"
              htmlFor="personal"
            >
              Personal
            </label>
            <div className="self-stretch font-normal text-gray-500 group-aria-checked:text-brand-600 group-aria-checked:group-disabled:text-gray-500">
              Personal data is private and securely encrypted. It is only
              accessible with your consent.
            </div>
          </div>
        </div>
        {/* TODO: Refactor checkbox to a separate component */}
        <div className="flex h-[20px] w-[20px] flex-shrink-0 items-center justify-center rounded-[10px] border border-solid border-gray-300 bg-white group-hover:border-brand-600 group-hover:bg-brand-50 group-focus:border-brand-300 group-disabled:border-gray-200 group-disabled:bg-gray-100 group-aria-checked:border-brand-600 group-aria-checked:bg-brand-600 group-aria-checked:p-[3px]">
          <RadioGroup.Indicator>
            <UntitledUI.General.Check
              size="14"
              className="flex-shrink-0 stroke-white stroke-2"
            />
          </RadioGroup.Indicator>
        </div>
      </RadioGroup.Item>
    </RadioGroup.Root>
  );
};

export default IdentityRadioGroup;
