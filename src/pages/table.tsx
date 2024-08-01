'use client';

import { useEffect, useState } from 'react';
import { format as formatDate } from 'date-fns';
import * as React from 'react';

import { NotificationTable } from '../components/table/notification/NotificationTable';
import { notificationColumns } from '../components/table/notification/notificationColumns';

export default function Table() {
  const [data, setData] = useState<
    { user: string; sharedDate: string; sharedLabels: string[] }[]
  >([]);

  useEffect(() => {
    setData(
      Array.from({ length: 100 }).map(() => ({
        user: Array.from(crypto.getRandomValues(new Uint8Array(32)))
          .map((b) => b.toString(36).padStart(2, '0'))
          .join('')
          .slice(0, 64),
        sharedDate: formatDate(
          new Date(2024, 8, Math.floor(Math.random() * 30) + 1),
          'dd.MM.yyyy',
        ),
        sharedLabels: [
          'Full name',
          'Date of Birth',
          'Bio',
          'Nationality',
          'Email',
          'Phone',
        ]
          .sort(() => Math.random() - 0.5)
          .slice(0, Math.floor(Math.random() * 4) + 1),
      })),
    );
  }, []);
  return (
    <div className="container mx-auto py-10">
      <NotificationTable columns={notificationColumns} data={data} />
    </div>
  );
}
