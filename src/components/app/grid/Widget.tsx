import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import {
  Bookmark,
  HeartRounded,
  User01,
  Flag01,
  Phone,
  Mail01,
  Link01,
} from 'untitledui-js';
import lookup from 'country-code-lookup';
import Link from 'next/link';
import GitHubCalendar, { type Activity } from 'react-github-calendar';
import { SocialIcon } from 'react-social-icons';

import { cn, calculateAge, getFlagEmoji } from '../../../lib/utils';
import type { GridItemContent } from '../../../types/grid';
import WidgetIcon from './WidgetIcon';
import WidgetDelete from './WidgetDelete';
import WidgetEdit from './WidgetEdit';

const countryCodes = lookup.countries.map((country) => country.iso2);

const selectLastMonths = (contributions: Activity[], months: number) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  return contributions.filter((activity) => {
    const date = new Date(activity.date);
    const monthOfDay = date.getMonth();

    return (
      date.getFullYear() === currentYear &&
      monthOfDay > currentMonth - months &&
      monthOfDay <= currentMonth
    );
  });
};

const widgetVariants = cva(
  '@container group relative flex justify-center items-center shrink-0 rounded-[40px] border-solid bg-gray-25 font-widget',
  {
    variants: {
      state: {
        default: '',
        edit: 'border-[5px] border-orange-500',
        selected: 'border-[5px] border-pink-500',
      },
      type: {
        name: 'border border-brand-200 hover:border-orange-500',
        bio: 'border border-brand-200 hover:border-orange-500',
        age: 'border border-brand-200 hover:border-orange-500',
        phone: 'border border-brand-200 hover:border-orange-500',
        email: 'border border-brand-200 hover:border-orange-500',
        citizenship: 'border border-brand-200 hover:border-orange-500',
        location: 'border border-brand-200 hover:border-orange-500',
        github: 'border border-brand-200 hover:border-orange-500',
        linkedin: 'border border-brand-200 hover:border-orange-500',
        hobby: 'border border-brand-200 hover:border-orange-500',
        relationship: 'border border-brand-200 hover:border-orange-500',
        website: 'border border-brand-200 hover:border-orange-500',
        badge: 'hover:border hover:border-orange-500 overflow-hidden',
        other: 'border border-brand-200 hover:border-orange-500',
        new: 'border-[5px] border-orange-500',
      },
      size: {
        tiny: 'w-[180px] h-[180px]',
        long: 'w-[400px] h-[180px]',
        tall: 'w-[180px] h-[400px]',
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
      case 'website': {
        const url = value?.toString() ?? '';
        const displayUrl = url.replace(/^https?:\/\/(www\.)?/, '');
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
              Icon={Link01}
              strokeClassName="stroke-gray-900 group-hover:stroke-orange-500"
            />
            {isEditable && onDeleteClick && (
              <WidgetDelete onDeleteClick={onDeleteClick} />
            )}
            <div className="text-center text-3xl/[38px] font-bold -tracking-[0.2px] text-gray-900">
              <Link
                href={url.startsWith('http') ? url : `https://${url}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {size !== 'tiny' && size !== 'tall' ? displayUrl : '🔗'}
              </Link>
            </div>
            {isEditable && onEditClick && (
              <WidgetEdit onEditClick={onEditClick} />
            )}
          </div>
        );
      }
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
      case 'location': {
        const sizeParam =
          size === 'tiny'
            ? '180x180'
            : size === 'long'
              ? '400x180'
              : size === 'tall'
                ? '180x400'
                : '400x400';
        return (
          <div
            className={cn(
              widgetVariants({ type, size, state }),
              className,
              'overflow-hidden',
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
            <img
              src={`https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/${value?.toString()},10,0,50/${sizeParam}@2x?access_token=pk.eyJ1IjoiYWxleGFqYXgiLCJhIjoiY2xpNWRkZThmMXR1dzNwbXYxZjl0Y211OCJ9.NTosCJOTjWY3mjFtW1OaGw`}
              alt="Map"
              className="object-cover"
            />
            {isEditable && onEditClick && (
              <WidgetEdit onEditClick={onEditClick} />
            )}
          </div>
        );
      }
      case 'github': {
        const username = value?.toString() ?? '';
        return (
          <div
            className={cn(
              widgetVariants({ type, size, state }),
              'flex flex-col gap-2 p-4',
              isEditable && 'select-none',
              className,
            )}
            ref={ref}
            {...props}
          >
            {isEditable && onDeleteClick && (
              <WidgetDelete onDeleteClick={onDeleteClick} />
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SocialIcon network="github" className="h-[24px] w-[24px]" />
                <span className="font-medium text-gray-900">{username}</span>
              </div>
              <Link
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md px-2 py-1 text-sm font-medium text-gray-600 hover:bg-gray-100"
              >
                View Profile →
              </Link>
            </div>

            <GitHubCalendar
              username={username}
              colorScheme="light"
              hideColorLegend
              hideMonthLabels
              hideTotalCount
              transformData={(data) =>
                selectLastMonths(
                  data,
                  size === 'tiny' || size === 'tall' ? 1 : 4,
                )
              }
            />

            {isEditable && onEditClick && (
              <WidgetEdit onEditClick={onEditClick} />
            )}
          </div>
        );
      }
      case 'linkedin': {
        const username = value?.toString() ?? '';
        return (
          <div
            className={cn(
              widgetVariants({ type, size, state }),
              'bg-linkedin p-4 text-white',
              isEditable && 'select-none',
              className,
            )}
            ref={ref}
            {...props}
          >
            {isEditable && onDeleteClick && (
              <WidgetDelete onDeleteClick={onDeleteClick} />
            )}

            <Link
              href={`https://www.linkedin.com/in/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-white"
            >
              View LinkedIn profile ↗
            </Link>

            {isEditable && onEditClick && (
              <WidgetEdit onEditClick={onEditClick} />
            )}
          </div>
        );
      }
      case 'hobby':
        return (
          <div
            className={cn(
              widgetVariants({ type, size, state }),
              'relative flex flex-col gap-2 overflow-hidden p-4',
              isEditable && 'select-none',
              className,
            )}
            ref={ref}
            {...props}
          >
            <img
              src={`https://d1nyjrmwcoi38d.cloudfront.net/hobby/${(value?.toString() ?? 'default').toLowerCase()}.png`}
              alt={value?.toString() ?? ''}
              className="absolute inset-0 h-full w-full object-cover"
            />

            <WidgetIcon
              Icon={User01}
              strokeClassName="stroke-gray-900 group-hover:stroke-orange-500"
            />
            {isEditable && onDeleteClick && (
              <WidgetDelete onDeleteClick={onDeleteClick} />
            )}

            {(size === 'long' || size === 'large') && (
              <div className="relative z-10 text-center font-sans text-4xl/[44px] font-bold -tracking-[0.72px] text-white">
                {value?.toString() ?? ''}
              </div>
            )}

            {isEditable && onEditClick && (
              <WidgetEdit onEditClick={onEditClick} />
            )}
          </div>
        );
      case 'relationship': {
        const internalValue = {
          'Looking for Love': 'looking',
          default: 'default',
        }[value?.toString() ?? 'default'];
        return (
          <div
            className={cn(
              widgetVariants({ type, size, state }),
              'relative flex flex-col gap-2 overflow-hidden p-4',
              isEditable && 'select-none',
              className,
            )}
            ref={ref}
            {...props}
          >
            <img
              src={`https://d1nyjrmwcoi38d.cloudfront.net/relationship/${internalValue}.png`}
              alt={value?.toString() ?? ''}
              className="absolute inset-0 h-full w-full object-cover"
            />

            <WidgetIcon
              Icon={HeartRounded}
              strokeClassName="stroke-gray-900 group-hover:stroke-orange-500"
            />
            {isEditable && onDeleteClick && (
              <WidgetDelete onDeleteClick={onDeleteClick} />
            )}

            {(size === 'long' || size === 'large') && (
              <div className="relative z-10 text-center font-sans text-4xl/[44px] font-bold -tracking-[0.72px] text-white">
                {value?.toString() ?? ''}
              </div>
            )}

            {isEditable && onEditClick && (
              <WidgetEdit onEditClick={onEditClick} />
            )}
          </div>
        );
      }
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
