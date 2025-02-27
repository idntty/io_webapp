'use client';

import { Coins03, Minimize01 } from 'untitledui-js';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { cryptography } from '@klayr/client/browser';
import { useRouter } from 'next/navigation';

import { Tabs, TabsContent } from '../components/tabs';
import Header from '../components/app/Header';
import Footer from '../components/app/Footer';
import MetricItem from '../components/metric-item';
import Button from '../components/button/button';
import Divider from '../components/divider';
import { default as NotificationsTable } from '../pages/table/notifications';
import { default as TransactionsTable } from '../pages/table/transactions';
import { default as BillingTable } from '../pages/table/billing';
import FaucetForm from '../components/app/forms/FaucetForm';

export default function Profile() {
  const [isGetBalanceFormOpen, setIsGetBalanceFormOpen] = useState(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [numberOfTransactions, setNumberOfTransactions] = useState<
    string | null
  >(null);

  const router = useRouter();

  const logout = () => {
    sessionStorage.removeItem('jwt');
    sessionStorage.removeItem('privateKey');
    router.push('/account/type');
  };

  useEffect(() => {
    if (!sessionStorage.getItem('privateKey')) {
      router.push('/');
    }
  }, [router]);

  useEffect(() => {
    const publicKey = localStorage.getItem('publicKey');
    if (!publicKey) {
      return;
    }
    setPublicKey(localStorage.getItem('publicKey'));

    const fetchTransactionsAndBalance = async () => {
      const { data: numberOfTransactions } = await axios.get<number>(
        'https://api.idntty.io/get-number-of-transactions',
        { params: { publicKey }, withCredentials: true },
      );
      const { data: balance } = await axios.get<{ availableBalance: string }>(
        'https://api.idntty.io/account/balance',
        {
          params: {
            address: cryptography.address.getKlayr32AddressFromPublicKey(
              Buffer.from(publicKey, 'hex'),
            ),
          },
          withCredentials: true,
        },
      );
      setBalance(balance.availableBalance);
      setNumberOfTransactions(numberOfTransactions.toString());
    };

    fetchTransactionsAndBalance().catch(console.error);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Tabs
        defaultValue="notifications"
        className="relative flex flex-grow flex-col justify-between overflow-auto bg-gray-50"
      >
        <Header tabsType="profile" />
        <TabsContent className="px-[300px]" value="notifications">
          <div className="flex flex-col gap-[20px] py-[25px]">
            <div className="flex gap-[16px]">
              <div className="flex shrink-0 grow basis-0 flex-col gap-[4px]">
                <div className="text-lg font-medium text-gray-900">
                  Notifications info
                </div>
                <div className="text-sm text-gray-500">
                  Control your notifications
                </div>
              </div>
              <div className="flex items-center gap-[12px]">
                <Button
                  variant="secondary-color"
                  size="md"
                  onClick={() => router.push('/')}
                >
                  Back to profile →
                </Button>
                <Button variant="destructive" size="md" onClick={logout}>
                  Logout
                </Button>
              </div>
            </div>
            <Divider />
          </div>
          <NotificationsTable />
        </TabsContent>
        <TabsContent className="px-[300px]" value="transactions">
          <div className="flex flex-col gap-[20px] py-[25px]">
            <div className="flex gap-[16px]">
              <div className="flex shrink-0 grow basis-0 flex-col gap-[4px]">
                <div className="text-lg font-medium text-gray-900">
                  Transactions info
                </div>
                <div className="text-sm text-gray-500">
                  Control your transactions
                </div>
              </div>
              <div className="flex items-center gap-[12px]">
                <Button
                  variant="secondary-color"
                  size="md"
                  onClick={() => router.push('/')}
                >
                  Back to profile →
                </Button>
                <Button variant="destructive" size="md" onClick={logout}>
                  Logout
                </Button>
              </div>
            </div>
            <Divider />
          </div>
          <TransactionsTable />
        </TabsContent>
        <TabsContent className="flex flex-col gap-0 px-[300px]" value="billing">
          <div className="flex flex-col gap-[20px] py-[25px]">
            <div className="flex gap-[16px]">
              <div className="flex shrink-0 grow basis-0 flex-col gap-[4px]">
                <div className="text-lg font-medium text-gray-900">
                  Billing info
                </div>
                <div className="text-sm text-gray-500">
                  Control your billing transactions
                </div>
              </div>
              <div className="flex items-center gap-[12px]">
                <Button
                  variant="secondary-color"
                  size="md"
                  onClick={() => router.push('/')}
                >
                  Back to profile →
                </Button>
                <Button variant="destructive" size="md" onClick={logout}>
                  Logout
                </Button>
              </div>
            </div>
            <Divider />
          </div>
          <div className="flex items-center gap-[24px] self-stretch">
            <MetricItem
              title="Account balance"
              value={balance ?? ''}
              subvalue="idn"
            />
            <MetricItem
              title="Total transactions"
              value={numberOfTransactions ?? '0'}
            />
          </div>
          <div className="flex h-[75px] shrink-0 items-center justify-center gap-[20px] self-stretch px-[300px] py-0">
            <Divider />
            <Button
              variant="secondary-color"
              size="md"
              onClick={() => setIsGetBalanceFormOpen((prev) => !prev)}
            >
              {!isGetBalanceFormOpen ? (
                <>
                  Get balance
                  <Coins03 size="20" className="stroke-brand-700" />
                </>
              ) : (
                <>
                  Cancel
                  <Minimize01 size="20" className="stroke-brand-700" />
                </>
              )}
            </Button>
            <Divider />
          </div>
          {isGetBalanceFormOpen && publicKey && (
            <div className="relative left-1/2 flex w-screen -translate-x-1/2 transform justify-center bg-white py-[20px]">
              <div className="w-[840px]">
                <FaucetForm publicKey={publicKey} />
              </div>
            </div>
          )}
          <BillingTable />
        </TabsContent>
      </Tabs>
      <Footer />
    </div>
  );
}
