'use client';

import { Coins01 } from 'untitledui-js';

import { Tabs, TabsContent } from '../components/tabs';
import Header from '../components/app/Header';
import Footer from '../components/app/Footer';
import MetricItem from '../components/metric-item';
import Button from '../components/button/button';
import Divider from '../components/divider';
import { default as NotificationsTable } from '../pages/table/notifications';
import { default as TransactionsTable } from '../pages/table/transactions';
import { default as BillingTable } from '../pages/table/billing';

export default function Profile() {
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
            <Button variant="secondary-color" size="md">
              Get balance
              <Coins01 size="20" className="stroke-brand-700" />
            </Button>
            <Divider />
          </div>
          <BillingTable />
        </TabsContent>
      </Tabs>
      <Footer />
    </div>
  );
}
