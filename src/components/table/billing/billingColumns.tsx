'use client';

import { ColumnDef } from '@tanstack/react-table';

import Badge from '../../badge';

export interface Billing {
  tx: string;
  sharedDate: string;
  blockHeight: number;
  type: 'processing' | 'transfer' | 'validated' | 'validation';
  price: string;
  link: string;
}

export const billingColumns: ColumnDef<Billing>[] = [
  {
    accessorKey: 'tx',
    header: 'TX ID',
    cell: ({ row }) => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      const tx = row.getValue('tx') as string;

      return (
        <div className="flex items-center gap-[12px]">
          {`${tx.slice(0, 4)} **** **** ${tx.slice(-4)}`}
        </div>
      );
    },
  },
  { accessorKey: 'sharedDate', header: 'Shared date' },
  { accessorKey: 'blockHeight', header: 'Block height' },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      const status = row.getValue('status') as
        | 'processing'
        | 'transfer'
        | 'validated'
        | 'validation';

      return (
        <Badge
          size="md"
          variant={
            status === 'processing'
              ? 'secondary'
              : status === 'validated' || status === 'transfer'
                ? 'success'
                : 'error'
          }
          withDot
        >
          {status}
        </Badge>
      );
    },
  },
  { accessorKey: 'price', header: 'TX price' },
  {
    accessorKey: 'link',
    header: '',
    cell: ({ row }) => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      const link = row.getValue('link') as string;

      return <div className="flex items-center gap-[8px]"></div>;
    },
  },
];
