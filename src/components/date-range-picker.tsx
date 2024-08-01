'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'untitledui-js';
import { DateRange } from 'react-day-picker';

import { cn } from '../lib/utils';
import Button from './button/button';
import { Calendar } from './calendar';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

export interface DatePickerWithRangeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
}

export const DatePickerWithRange: React.FC<DatePickerWithRangeProps> = ({
  className,
  date,
  setDate,
}) => {
  return (
    <div className={cn('flex gap-[12px]', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'secondary-gray'}
            size="md"
            className={cn(
              'w-[300px] justify-start text-left font-normal',
              !date && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
      <Button
        variant="destructive"
        size="md"
        onClick={() => setDate(undefined)}
      >
        Reset
      </Button>
    </div>
  );
};
