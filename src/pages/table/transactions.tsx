'use client';

import { useState } from 'react';
import { format, parse, isBefore, isAfter } from 'date-fns';
import * as React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { DateRange } from 'react-day-picker';

import {
  Transaction,
  transactionColumns,
} from '../../components/table/transaction/transactionColumns';
import { TransactionTable } from '../../components/table/transaction/TransactionTable';

interface TransactionResponse {
  id: number;
  public_key: string;
  for_public_key: string;
  type: 'share';
  data: string;
  blockHeight: number;
  status: 'processing' | 'validated' | 'invalidated';
  timestamp: string;
}

export default function Table() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [initialDateRange, setInitialDateRange] = useState<
    DateRange | undefined
  >(undefined);
  const [initialFetchCompleted, setInitialFetchCompleted] = useState(false);

  const fetchTransactions = async (startDate?: Date, endDate?: Date) => {
    const params: { startDate?: number; endDate?: number; amount?: number } =
      {};

    if (!startDate) {
      params.amount = 25;
    } else {
      params.startDate = Math.floor(startDate.getTime() / 1000);
      if (!endDate) {
        params.endDate = Math.floor(new Date().getTime() / 1000);
      } else {
        params.endDate = Math.floor(endDate.getTime() / 1000);
      }
    }

    const { data } = await axios.get<TransactionResponse[]>(
      'https://api.idntty.io/get-transactions',
      { params, withCredentials: true },
    );
    const formattedData: Transaction[] = data.map((transaction) => ({
      user: transaction.public_key,
      blockHeight: transaction.blockHeight,
      status: transaction.status,
      sharedDate: format(new Date(transaction.timestamp), 'dd.MM.yyyy'),
      // sharedLabels: (JSON.parse(notification.data) as { features: string[] }).features,
      sharedLabels: ['Email', 'Phone', 'Name', 'Bio']
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 4 + 1)),
    }));

    if (!initialFetchCompleted && formattedData.length > 0) {
      const dates = formattedData.map((transaction) =>
        parse(transaction.sharedDate, 'dd.MM.yyyy', new Date()),
      );
      const startDate = dates.reduce((earliest, current) =>
        isBefore(current, earliest) ? current : earliest,
      );
      const endDate = dates.reduce((latest, current) =>
        isAfter(current, latest) ? current : latest,
      );
      setInitialDateRange({ from: startDate, to: endDate });
      setInitialFetchCompleted(true);
    }

    return formattedData;
  };

  const { data } = useQuery<Transaction[], Error>({
    queryKey: ['notifications', dateRange],
    queryFn: () => fetchTransactions(dateRange?.from, dateRange?.to),
  });

  return (
    <div className="container mx-auto py-10">
      <TransactionTable
        columns={transactionColumns}
        data={data ?? []}
        dateRange={dateRange}
        setDateRange={setDateRange}
        initialDateRange={initialDateRange}
      />
    </div>
  );
}
