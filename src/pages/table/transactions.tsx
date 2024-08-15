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

// {
//   "id": 23,
//   "tx_id": "461163aaeee76856da3ac194bfb3ae071624d5fb625bd5048f3dfd20ffa21756",
//   "block_height": 81740,
//   "price": "145000",
//   "public_key": "d831474ffb14200762f733d0010a3217c46a53a39ec17946df8c3b4be4b95d5e",
//   "for_public_key": null,
//   "type": "setFeature",
//   "data": "{\"features\":[{\"label\":\"test\",\"value\":\"test\"}]}",
//   "timestamp": "2024-09-05T02:36:52.000Z"
// }
interface TransactionResponse {
  id: number;
  tx_id: string;
  public_key: string;
  for_public_key: string;
  type: 'setFeature';
  data: string;
  block_height: number;
  price: string;
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

    console.log(data);
    const formattedData: Transaction[] = data.map((transaction) => ({
      user: transaction.public_key,
      blockHeight: transaction.block_height,
      status: 'Validated',
      sharedDate: format(new Date(transaction.timestamp), 'dd.MM.yyyy'),
      // "data": "{\"features\":[{\"label\":\"test\",\"value\":\"test\"}]}"
      sharedLabels: (
        JSON.parse(transaction.data) as {
          features: { label: string; value: string }[];
        }
      ).features.map((feature) => feature.label),
      // sharedLabels: ['Email', 'Phone', 'Name', 'Bio']
      //   .sort(() => 0.5 - Math.random())
      //   .slice(0, Math.floor(Math.random() * 4 + 1)),
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
    queryKey: ['transactions', dateRange],
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
