'use client';

import * as React from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { ArrowLeft, ArrowRight } from 'untitledui-js';
import { DateRange } from 'react-day-picker';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../table';
import Button from '../../button/button';
import { DatePickerWithRange } from '../../date-range-picker';

import { Notification } from './billingColumns';

export interface NotificationTableProps {
  columns: ColumnDef<Notification>[];
  data: Notification[];
  dateRange: DateRange | undefined;
  setDateRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  initialDateRange: DateRange | undefined;
}

export function NotificationTable({
  columns,
  data,
  dateRange,
  setDateRange,
  initialDateRange,
}: NotificationTableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  const getCurrentPageLabel = () => {
    const page = table.getState().pagination.pageIndex + 1;
    return page > 3 && page < table.getPageCount() - 2
      ? '...'
      : page.toString();
  };

  const paginationButtonClassname =
    'flex h-[40px] w-[40px] items-center justify-center rounded-lg p-[12px] text-sm text-gray-500 aria-checked:bg-brand-50 aria-checked:text-brand-600';

  return (
    <div className="mx-[20px] flex flex-col gap-[24px]">
      <div className="flex gap-[12px] py-[12px]">
        <DatePickerWithRange
          date={dateRange ?? initialDateRange}
          setDate={setDateRange}
        />
      </div>
      <div className="rounded-lg border border-gray-200 bg-white shadow-table">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex w-full items-center justify-between self-stretch border-t border-solid border-gray-200 px-[24px] pb-[16px] pt-[12px] font-medium">
          <Button
            variant="secondary-gray"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ArrowLeft />
            Previous
          </Button>
          <RadioGroup.Root
            className="flex gap-[2px]"
            value={getCurrentPageLabel()}
            onValueChange={(value) => table.setPageIndex(parseInt(value) - 1)}
          >
            {table.getPageCount() <= 7
              ? [...Array(table.getPageCount()).keys()].map((page) => (
                  <RadioGroup.Item
                    key={page}
                    value={(page + 1).toString()}
                    className={paginationButtonClassname}
                  >
                    {page + 1}
                  </RadioGroup.Item>
                ))
              : [
                  ...Array.from({ length: 3 }, (_, i) => i),
                  '...',
                  ...Array.from(
                    { length: 3 },
                    (_, i) => i + table.getPageCount() - 3,
                  ),
                ].map((page) => {
                  if (page === '...') {
                    return (
                      <RadioGroup.Item
                        key={page}
                        value={(page + 1).toString()}
                        className={paginationButtonClassname}
                        disabled={true}
                      >
                        {page + 1}
                      </RadioGroup.Item>
                    );
                  }
                  return (
                    <RadioGroup.Item
                      key={page}
                      value={page.toString()}
                      className={paginationButtonClassname}
                    >
                      {page}
                    </RadioGroup.Item>
                  );
                })}
          </RadioGroup.Root>
          <Button
            variant="secondary-gray"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
            <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
