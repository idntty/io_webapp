'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Avatar, AvatarImage, AvatarFallback } from '../../avatar';
import Badge from '../../badge';
import { generateSVGAvatar } from '../../../lib/avatar';

export interface Transaction {
  user: string;
  sharedDate: string;
  blockHeight: number;
  status: 'Processing' | 'Validated' | 'Invalidated';
  sharedLabels: string[];
}

export const transactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'user',
    header: 'User',
    cell: ({ row }) => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      const publicKey = row.getValue('user') as string;

      return (
        <div className="flex items-center gap-[12px]">
          <Avatar>
            <AvatarImage src={generateSVGAvatar(publicKey)} />
            <AvatarFallback>{`${publicKey.slice(0, 1)}..${publicKey.slice(-1)}`}</AvatarFallback>
          </Avatar>
          {`${publicKey.slice(0, 4)} **** **** ${publicKey.slice(-4)}`}
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
        | 'Processing'
        | 'Validated'
        | 'Invalidated';

      return (
        <Badge
          size="md"
          variant={
            status === 'Processing'
              ? 'secondary'
              : status === 'Validated'
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
  {
    accessorKey: 'sharedLabels',
    header: 'Shared labels',
    cell: ({ row }) => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      const sharedLabels = row.getValue('sharedLabels') as string[];

      return (
        <div className="flex flex-wrap content-center items-center gap-[10px]">
          {sharedLabels.map((label) => (
            <Badge key={label} size="md" variant="secondary">
              {label}
            </Badge>
          ))}
        </div>
      );
    },
  },
];
