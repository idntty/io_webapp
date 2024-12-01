'use client';

// import { useEffect } from 'react';
import { Mail01, User01, BriefCase01 } from 'untitledui-js';
import GitHubCalendar, { type Activity } from 'react-github-calendar';

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
    <div className="flex w-full flex-col items-center justify-center gap-10">
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
      <div className="h-[24px] w-[24px]">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 98 96"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
            fill="#24292f"
          />
        </svg>
      </div>
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
  );
}
