import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import {
  Bookmark,
  HeartRounded,
  User01,
  Flag01,
  Phone,
  Mail01,
} from 'untitledui-js';
import lookup from 'country-code-lookup';
import Link from 'next/link';

import { cn, calculateAge, getFlagEmoji } from '../../../lib/utils';
import type { GridItemContent } from '../../../types/grid';
import WidgetIcon from './WidgetIcon';
import WidgetDelete from './WidgetDelete';
import WidgetEdit from './WidgetEdit';

const countryCodes = lookup.countries.map((country) => country.iso2);

const widgetVariants = cva(
  '@container group relative flex justify-center items-center shrink-0 rounded-[40px] border-solid bg-gray-25 font-widget',
  {
    variants: {
      state: {
        default: 'border border-brand-200 hover:border-orange-500',
        edit: 'border-[5px] border-orange-500',
        selected: 'border-[5px] border-pink-500',
      },
      type: {
        name: '',
        bio: '',
        age: '',
        phone: '',
        email: '',
        citizenship: '',
        location: '',
        badge: '',
        other: '',
        new: 'border-[5px] border-orange-500',
      },
      size: {
        tiny: 'w-[180px] h-[180px]',
        long: 'w-[180px] h-[400px]',
        tall: 'w-[400px] h-[180px]',
        large: 'w-[400px] h-[400px]',
      },
    },
    defaultVariants: {
      type: 'name',
      state: 'default',
      size: 'tiny',
    },
  },
);

export interface WidgetProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof widgetVariants> {
  value?: GridItemContent;
  isEditable?: boolean;
  onDeleteClick?: () => void;
  onEditClick?: () => void;
}

const expandCountryCode = (code: string, includeName: boolean) => {
  if (countryCodes.includes(code)) {
    return (
      getFlagEmoji(code) +
      (includeName ? ` ${lookup.byIso(code)?.country}` : '')
    );
  }
  return code;
};

const expandEmailPhone = (value: string, fullSize: boolean) => {
  if (value.includes('@')) {
    return (
      <Link className="no-underline" href={`mailto:${value}`}>
        {fullSize ? value : '✉️'}
      </Link>
    );
  }
  return (
    <Link className="no-underline" href={`tel:${value}`}>
      {fullSize ? value : '📞'}
    </Link>
  );
};

const Widget = React.forwardRef<HTMLDivElement, WidgetProps>(
  (
    {
      className,
      type,
      size,
      value,
      state,
      isEditable,
      onDeleteClick,
      onEditClick,
      ...props
    },
    ref,
  ) => {
    // FIXME: Needs a rewrite
    switch (type) {
      case 'name':
      case 'other':
        return (
          <div
            className={cn(
              widgetVariants({ type, size, state }),
              isEditable && 'select-none',
              className,
            )}
            ref={ref}
            {...props}
          >
            <WidgetIcon
              Icon={User01}
              strokeClassName="stroke-gray-900 group-hover:stroke-orange-500"
            />
            {isEditable && onDeleteClick && (
              <WidgetDelete onDeleteClick={onDeleteClick} />
            )}
            <div className="text-center text-3xl/[38px] font-bold -tracking-[0.2px] text-gray-900">
              {value?.toString() ?? ''}
            </div>
            {isEditable && onEditClick && (
              <WidgetEdit onEditClick={onEditClick} />
            )}
          </div>
        );
      case 'phone':
      case 'email':
        return (
          <div
            className={cn(
              widgetVariants({ type, size, state }),
              isEditable && 'select-none',
              className,
            )}
            ref={ref}
            {...props}
          >
            <WidgetIcon
              Icon={type === 'phone' ? Phone : Mail01}
              strokeClassName="stroke-gray-900 group-hover:stroke-orange-500"
            />
            {isEditable && onDeleteClick && (
              <WidgetDelete onDeleteClick={onDeleteClick} />
            )}
            <div className="text-center text-3xl/[38px] font-bold -tracking-[0.2px] text-gray-900">
              {expandEmailPhone(
                value?.toString() ?? '',
                size !== 'tiny' && size !== 'tall',
              )}
            </div>
            {isEditable && onEditClick && (
              <WidgetEdit onEditClick={onEditClick} />
            )}
          </div>
        );
      case 'bio':
        return (
          <div
            className={cn(
              widgetVariants({ type, size, state }),
              isEditable && 'select-none',
              className,
            )}
            ref={ref}
            {...props}
          >
            <WidgetIcon
              Icon={Bookmark}
              strokeClassName="stroke-gray-900 group-hover:stroke-orange-500"
            />
            {isEditable && onDeleteClick && (
              <WidgetDelete onDeleteClick={onDeleteClick} />
            )}
            <div className="text-center text-base font-medium -tracking-[0.2px] text-gray-900">
              {value?.toString() ?? ''}
            </div>
            {isEditable && onEditClick && (
              <WidgetEdit onEditClick={onEditClick} />
            )}
          </div>
        );
      case 'age':
        return (
          <div
            className={cn(
              'flex-col gap-[5px]',
              widgetVariants({ type, size, state }),
              isEditable && 'select-none',
              className,
            )}
            ref={ref}
            {...props}
          >
            <WidgetIcon
              Icon={HeartRounded}
              strokeClassName="stroke-gray-900 group-hover:stroke-orange-500"
            />
            {isEditable && onDeleteClick && (
              <WidgetDelete onDeleteClick={onDeleteClick} />
            )}
            <div className="text-center text-7xl/[90px] font-bold -tracking-[1.44px] text-gray-900">
              {/* If value is a Date, return calculateAge(value). If not, try to parse the date from date string and do the same. Otherwise, return the value (or '' if undefined) */}
              {value instanceof Date
                ? calculateAge(value)
                : value
                  ? calculateAge(new Date(value))
                  : (value?.toString() ?? '')}
            </div>
            <div className="text-center text-2xl font-normal text-gray-900">
              years old
            </div>
            {isEditable && onEditClick && (
              <WidgetEdit onEditClick={onEditClick} />
            )}
          </div>
        );
      case 'citizenship':
      case 'location':
        return (
          <div
            className={cn(
              widgetVariants({ type, size, state }),

              className,
            )}
            ref={ref}
            {...props}
          >
            <WidgetIcon
              Icon={Flag01}
              strokeClassName="stroke-gray-900 group-hover:stroke-orange-500"
            />
            {isEditable && onDeleteClick && (
              <WidgetDelete onDeleteClick={onDeleteClick} />
            )}
            <div className="text-center text-5xl/[38px] font-bold -tracking-[0.2px] text-gray-900">
              {expandCountryCode(
                value?.toString() ?? '',
                size !== 'tiny' && size !== 'tall',
              )}
            </div>
            {isEditable && onEditClick && (
              <WidgetEdit onEditClick={onEditClick} />
            )}
          </div>
        );
      case 'badge':
        return (
          <div
            className={cn(widgetVariants({ type, size, state }), className)}
            ref={ref}
            {...props}
          >
            {isEditable && onDeleteClick && (
              <WidgetDelete onDeleteClick={onDeleteClick} />
            )}
            <img
              src={value?.toString() ?? ''}
              alt="badge"
              className="object-cover"
            />
            {isEditable && onEditClick && (
              <WidgetEdit onEditClick={onEditClick} />
            )}
          </div>
        );
      case 'new':
        return (
          <div
            className={cn(widgetVariants({ type, size, state }), className)}
            ref={ref}
            {...props}
          >
            {onEditClick && (
              <button
                onClick={onEditClick}
                className="h-full w-full text-center text-7xl/[90px] font-normal -tracking-[1.44px] text-orange-500"
              >
                +
              </button>
            )}
          </div>
        );
    }
  },
);
Widget.displayName = 'Widget';

export default Widget;
