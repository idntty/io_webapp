import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { General, Users } from 'untitledui-js';

import { cn, calculateAge } from '../../../lib/utils';
import type { GridItemContent } from '../../../types/grid';
import WidgetIcon from './WidgetIcon';
import WidgetDelete from './WidgetDelete';
import WidgetEdit from './WidgetEdit';

const widgetVariants = cva(
  '@container group relative flex justify-center items-center shrink-0 rounded-[40px] border-solid bg-gray-25 font-widget',
  {
    variants: {
      state: {
        default: 'border border-brand-200 hover:border-orange-500',
        edit: 'border-[5px] border-orange-500',
      },
      type: {
        name: '',
        bio: '',
        age: '',
        badge: '',
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
        return (
          <div
            className={cn(
              widgetVariants({ type, size, state }),
              'select-none' && isEditable,
              className,
            )}
            ref={ref}
            {...props}
          >
            <WidgetIcon
              Icon={Users.User01}
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
      case 'bio':
        return (
          <div
            className={cn(
              widgetVariants({ type, size, state }),
              'select-none' && isEditable,
              className,
            )}
            ref={ref}
            {...props}
          >
            <WidgetIcon
              Icon={General.Bookmark}
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
              'select-none' && isEditable,
              className,
            )}
            ref={ref}
            {...props}
          >
            <WidgetIcon
              Icon={General.HeartRounded}
              strokeClassName="stroke-gray-900 group-hover:stroke-orange-500"
            />
            {isEditable && onDeleteClick && (
              <WidgetDelete onDeleteClick={onDeleteClick} />
            )}
            <div className="text-center text-7xl/[90px] font-bold -tracking-[1.44px] text-gray-900">
              {value instanceof Date ? calculateAge(value) : value ?? ''}
            </div>
            <div className="text-center text-2xl font-normal text-gray-900">
              years old
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
