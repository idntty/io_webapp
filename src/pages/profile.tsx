'use client';

import { Coins03, Minimize01 } from 'untitledui-js';
import { useState, useEffect } from 'react';

import { Tabs, TabsContent } from '../components/tabs';
import Header from '../components/app/Header';
import Footer from '../components/app/Footer';
import MetricItem from '../components/metric-item';
import Button from '../components/button/button';
import Divider from '../components/divider';
import { default as NotificationsTable } from '../pages/table/notifications';
import { default as TransactionsTable } from '../pages/table/transactions';
import { default as BillingTable } from '../pages/table/billing';
import GetBalanceForm from '../components/app/forms/GetBalanceForm';

export default function Profile() {
  const [isGetBalanceFormOpen, setIsGetBalanceFormOpen] = useState(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);

  useEffect(() => {
    setPublicKey(localStorage.getItem('publicKey'));
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Tabs
        defaultValue="notifications"
        className="relative flex flex-grow flex-col justify-between overflow-auto bg-gray-50"
      >
        <Header tabsType="profile" />
        <TabsContent className="px-[300px]" value="notifications">
          <NotificationsTable />
        </TabsContent>
        <TabsContent className="px-[300px]" value="transactions">
          <TransactionsTable />
        </TabsContent>
        <TabsContent className="flex flex-col gap-0 px-[300px]" value="billing">
          <div className="flex items-center gap-[24px] self-stretch">
            <MetricItem title="Account balance" value="0" subvalue="idn" />
            <MetricItem title="Total transactions" value="46" />
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
                <GetBalanceForm publicKey={publicKey} />
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
