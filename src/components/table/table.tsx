import * as React from 'react';

import { cn } from '../../lib/utils';

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn('w-full caption-bottom text-sm', className)}
      {...props}
    />
  </div>
));
Table.displayName = 'Table';

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(
      '[&_tr]:border-b [&_tr]:border-solid [&_tr]:border-gray-200',
      className,
    )}
    {...props}
  />
));
TableHeader.displayName = 'TableHeader';

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn('[&_tr:last-child]:border-0', className)}
    {...props}
  />
));
TableBody.displayName = 'TableBody';

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      // 'data-[state=selected]:bg-???',
      'border-b border-solid border-gray-200 transition-colors hover:bg-gray-50',
      className,
    )}
    {...props}
  />
));
TableRow.displayName = 'TableRow';

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      // 'align-middle [&:has([role=checkbox])]:pr-0',
      'h-[44px] shrink-0 px-[24px] py-[12px] text-left text-xs/[18px] font-medium text-gray-500 hover:text-gray-700',
      className,
    )}
    {...props}
  />
));
TableHead.displayName = 'TableHead';

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      // 'align-middle [&:has([role=checkbox])]:pr-0',
      'h-[72px] px-[24px] py-[16px] text-gray-500',
      className,
    )}
    {...props}
  />
));
TableCell.displayName = 'TableCell';

export { Table, TableHeader, TableBody, TableHead, TableRow, TableCell };
