'use client';

import { useEffect } from 'react';
import { Mail01, User01, BriefCase01 } from 'untitledui-js';

import Badge from '../components/badge';
import Button from '../components/button/button';
import Input from '../components/input';
import IdentityRadioGroup from '../components/onboarding/IdentityRadioGroup';
import Widget from '../components/app/grid/Widget';
import EncryptedWidget from '../components/app/grid/EncryptedWidget';
import Checkbox from '../components/checkbox';
import Divider from '../components/divider';

import { getClient } from '../lib/apiClient';
import { generateKeysAndAddress } from '../lib/crypto';

const PHRASE =
  'march unfold dizzy lyrics soap print notable brief address another begin evolve note open artist prison clerk twelve fetch course rather corn next cushion';

export default function ComponentsTesting() {
  useEffect(() => {
    const run = async () => {
      const client = await getClient();

      const { privateKey, publicKey } = await generateKeysAndAddress(PHRASE);

      const tx = await client.transaction.create(
        {
          module: 'token',
          command: 'transfer',
          fee: 1000000n,
          senderPublicKey: publicKey.toString('hex'),
          params: {
            tokenID: 'abcdef0100000000',
            amount: 1000000000n,
            recipientAddress: 'lsktt8b7dm3kjzjpj2fa7exww34j4ma4h5pz4y7gh',
            data: 'hello',
          },
        },
        privateKey.toString('hex'),
      );

      await client.transaction.send(tx);
    };

    run().catch(console.error);
  });

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
