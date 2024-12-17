'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Avatar, AvatarImage, AvatarFallback } from '../../avatar';
import Badge from '../../badge';
import { generateSVGAvatar } from '../../../lib/avatar';

export interface Notification {
  user: string;
  sharedDate: string;
  sharedLabels: string[];
}

export const notificationColumns: ColumnDef<Notification>[] = [
  {
    accessorKey: 'user',
    header: 'User',
    cell: ({ row }) => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      const address = row.getValue('user') as string;

      return (
        <div className="flex items-center gap-[12px]">
          <Avatar>
            <AvatarImage src={generateSVGAvatar(address)} />
            <AvatarFallback>{`${address.slice(0, 1)}..${address.slice(-1)}`}</AvatarFallback>
          </Avatar>
          {`${address.slice(0, 6)}****${address.slice(-3)}`}
        </div>
      );
    },
  },
  { accessorKey: 'sharedDate', header: 'Shared date' },
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
