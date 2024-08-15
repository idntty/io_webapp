'use client';

import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

import Badge from '../../badge';

export interface BillingEntry {
  txID: string;
  sharedDate: string;
  blockHeight: number;
  transactionType: 'Processing' | 'Transfer' | 'Validated' | 'Invalidated';
  price: string;
  viewLink: string;
}

export const billingColumns: ColumnDef<BillingEntry>[] = [
  {
    accessorKey: 'txID',
    header: 'TX ID',
    cell: ({ row }) => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      const txID = row.getValue('txID') as string;

      return (
        <div className="flex items-center gap-[12px]">
          {`${txID.slice(0, 4)} **** **** ${txID.slice(-4)}`}
        </div>
      );
    },
  },
  { accessorKey: 'sharedDate', header: 'Shared date' },
  { accessorKey: 'blockHeight', header: 'Block height' },
  {
    accessorKey: 'transactionType',
    header: 'Type',
    cell: ({ row }) => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      const transactionType = row.getValue('transactionType') as
        | 'Processing'
        | 'Transfer'
        | 'Validated'
        | 'Invalidated';

      return (
        <Badge
          size="md"
          variant={
            transactionType === 'Processing'
              ? 'secondary'
              : transactionType === 'Validated' ||
                  transactionType === 'Transfer'
                ? 'success'
                : 'error'
          }
          withDot
        >
          {transactionType}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      const price = row.getValue('price') as string;

      return <div>{price} idn</div>;
    },
  },
  {
    accessorKey: 'viewLink',
    header: 'View',
    cell: ({ row }) => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      const viewLink = row.getValue('viewLink') as string;

      return (
        <div className="flex items-center gap-[8px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="8"
            viewBox="0 0 8 8"
            className="fill-current text-success-700"
          >
            <circle cx="4" cy="4.00037" r="3" />
          </svg>
          <Link
            href={viewLink}
            className="text-sm font-semibold text-brand-700"
          >
            View
          </Link>
        </div>
      );
    },
  },
];
