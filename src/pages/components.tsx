'use client';

// import { useEffect } from 'react';
import { Mail01, User01, BriefCase01 } from 'untitledui-js';
import GitHubCalendar, { type Activity } from 'react-github-calendar';
import Script from 'next/script';

import Badge from '../components/badge';
import Button from '../components/button/button';
import Input from '../components/input';
import IdentityRadioGroup from '../components/onboarding/IdentityRadioGroup';
import Widget from '../components/app/grid/Widget';
import EncryptedWidget from '../components/app/grid/EncryptedWidget';
import Checkbox from '../components/checkbox';
import Divider from '../components/divider';

// import { getClient } from '../lib/apiClient';
// import { generateKeysAndAddress } from '../lib/crypto';

// const PHRASE =
//   'march unfold dizzy lyrics soap print notable brief address another begin evolve note open artist prison clerk twelve fetch course rather corn next cushion';

const selectLastMonths = (contributions: Activity[], months = 1) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  return contributions.filter((activity) => {
    const date = new Date(activity.date);
    const monthOfDay = date.getMonth();

    return (
      date.getFullYear() === currentYear &&
      monthOfDay > currentMonth - months &&
      monthOfDay <= currentMonth
    );
  });
};

export default function ComponentsTesting() {
  // useEffect(() => {
  //   const run = async () => {
  //     const client = await getClient();

  //     const { privateKey, publicKey } = await generateKeysAndAddress(PHRASE);

  //     const tx = await client.transaction.create(
  //       {
  //         module: 'token',
  //         command: 'transfer',
  //         fee: 1000000n,
  //         senderPublicKey: publicKey.toString('hex'),
  //         params: {
  //           tokenID: 'abcdef0100000000',
  //           amount: 1000000000n,
  //           recipientAddress: 'lsktt8b7dm3kjzjpj2fa7exww34j4ma4h5pz4y7gh',
  //           data: 'hello',
  //         },
  //       },
  //       privateKey.toString('hex'),
  //     );

  //     await client.transaction.send(tx);
  //   };

  //   run().catch(console.error);
  // });

  return (
    <>
      <Script
        src="https://platform.linkedin.com/badges/js/profile.js"
        strategy="lazyOnload"
      />
      <div className="flex w-full flex-col items-center justify-center gap-10">
        <div className="group relative flex h-[180px] w-[400px] shrink-0 flex-col items-center justify-center gap-2 overflow-hidden rounded-[40px] border border-solid border-brand-200 bg-gray-25 p-4 font-widget @container hover:border-orange-500">
          <img
            src="https://d1nyjrmwcoi38d.cloudfront.net/hobby/gaming.png"
            alt="Gaming"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="relative z-10 text-center font-sans text-4xl/[44px] font-bold -tracking-[0.72px] text-white">
            Gaming
          </div>
        </div>
        <Divider />
        <Button
          onClick={() => {
            const elements = document.querySelectorAll(
              'button, fieldset, optgroup, option, select, textarea, input',
            );
            elements.forEach((element) => {
              if (element !== document.activeElement) {
                element.toggleAttribute('disabled');
              }
            });
          }}
        >
          Disable all elements
        </Button>
        <Divider />
        <div
          className="badge-base LI-profile-badge"
          data-locale="en_US"
          data-size="medium"
          data-theme="light"
          data-type="VERTICAL"
          data-vanity="alex--danilov"
          data-version="v1"
        />
        <Divider />
        <GitHubCalendar
          username="jowerfwernhoo"
          colorScheme="light"
          hideColorLegend
          hideMonthLabels
          hideTotalCount
          transformData={selectLastMonths}
        />
        <Divider />
        {/* Labels (primary) */}
        <div className="flex w-full items-center justify-center gap-4">
          <Badge>Label</Badge>
          <Badge size="md">Label</Badge>
          <Badge size="lg">Label</Badge>
        </div>
        {/* Labels (secondary) */}
        <div className="flex w-full items-center justify-center gap-4">
          <Badge variant="secondary">Label</Badge>
          <Badge variant="secondary" size="md">
            Label
          </Badge>
          <Badge variant="secondary" size="lg">
            Label
          </Badge>
        </div>
        <Divider />
        {/* Buttons (primary) */}
        <div className="flex w-full items-center justify-center gap-4">
          <Button>Button</Button>
          <Button size="md">Button</Button>
          <Button size="lg">Button</Button>
          <Button size="xl">Button</Button>
          <Button size="2xl">Button</Button>
          <Button shape="square">
            <div className="h-[20px] w-[20px]" />
          </Button>
          <Button shape="square" size="md">
            <div className="h-[20px] w-[20px]" />
          </Button>
          <Button shape="square" size="lg">
            <div className="h-[20px] w-[20px]" />
          </Button>
          <Button shape="square" size="xl">
            <div className="h-[20px] w-[20px]" />
          </Button>
          <Button shape="square" size="2xl">
            <div className="h-[20px] w-[20px]" />
          </Button>
        </div>
        {/* Buttons (secondary color) */}
        <div className="flex w-full items-center justify-center gap-4">
          <Button variant="secondary-color">Button</Button>
          <Button variant="secondary-color" size="md">
            Button
          </Button>
          <Button variant="secondary-color" size="lg">
            Button
          </Button>
          <Button variant="secondary-color" size="xl">
            Button
          </Button>
          <Button variant="secondary-color" size="2xl">
            Button
          </Button>
          <Button shape="square" variant="secondary-color">
            <div className="h-[20px] w-[20px]" />
          </Button>
          <Button shape="square" variant="secondary-color" size="md">
            <div className="h-[20px] w-[20px]" />
          </Button>
          <Button shape="square" variant="secondary-color" size="lg">
            <div className="h-[20px] w-[20px]" />
          </Button>
          <Button shape="square" variant="secondary-color" size="xl">
            <div className="h-[20px] w-[20px]" />
          </Button>
          <Button shape="square" variant="secondary-color" size="2xl">
            <div className="h-[20px] w-[20px]" />
          </Button>
        </div>
        {/* Buttons (secondary gray) */}
        <div className="flex w-full items-center justify-center gap-4">
          <Button variant="secondary-gray">Button</Button>
          <Button variant="secondary-gray" size="md">
            Button
          </Button>
          <Button variant="secondary-gray" size="lg">
            Button
          </Button>
          <Button variant="secondary-gray" size="xl">
            Button
          </Button>
          <Button variant="secondary-gray" size="2xl">
            Button
          </Button>
          <Button shape="square" variant="secondary-gray">
            <div className="h-[20px] w-[20px]" />
          </Button>
          <Button shape="square" variant="secondary-gray" size="md">
            <div className="h-[20px] w-[20px]" />
          </Button>
          <Button shape="square" variant="secondary-gray" size="lg">
            <div className="h-[20px] w-[20px]" />
          </Button>
          <Button shape="square" variant="secondary-gray" size="xl">
            <div className="h-[20px] w-[20px]" />
          </Button>
          <Button shape="square" variant="secondary-gray" size="2xl">
            <div className="h-[20px] w-[20px]" />
          </Button>
        </div>
        <Divider />
        {/* Inputs */}
        <div className="flex w-full items-center justify-center gap-4">
          <Input
            withHelpIcon
            placeholder="Placeholder"
            Icon={Mail01}
            className="w-[360px]"
          />
        </div>
        <Divider />
        {/* Checkbox */}
        <div className="flex w-full items-center justify-center gap-4">
          <Checkbox />
        </div>
        {/* Radio group */}
        <IdentityRadioGroup
          variants={[
            {
              type: 'personal',
              title: 'Personal',
              description:
                'Personal data is private and securely encrypted. It is only accessible with your consent.',
              Icon: User01,
            },
            {
              type: 'authority',
              title: 'Authority',
              description:
                'All data is public and accessible to everyone. Used by companies & communities.',
              Icon: BriefCase01,
            },
          ]}
        />
        <Divider />
        {/* Widget */}
        <div className="flex w-full items-center justify-center gap-4">
          <Widget size="tiny" value="1x1" />
          <Widget size="long" value="2x1" />
          <Widget size="tall" value="1x2" />
          <Widget size="large" value="2x2" />
        </div>
        <div className="flex w-full items-center justify-center gap-4">
          <EncryptedWidget size="tiny" />
          <EncryptedWidget size="long" />
          <EncryptedWidget size="tall" />
          <EncryptedWidget size="large" />
        </div>
        <Divider />
      </div>
    </>
  );
}
