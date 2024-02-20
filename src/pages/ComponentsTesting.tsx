import Badge from '../components/badge';
import Button from '../components/button/button';
import Input from '../components/input';
import IdentityRadioGroup from '../components/onboarding/IdentityRadioGroup';
import Widget from '../components/app/grid/Widget';
import EncryptedWidget from '../components/app/grid/EncryptedWidget';
import Checkbox from '../components/checkbox';
import Divider from '../components/divider';

import { Communication, Users, Education } from 'untitledui-js';

export default function ComponentsTesting() {
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
          Icon={Communication.Mail01}
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
            Icon: Users.User01,
          },
          {
            type: 'authority',
            title: 'Authority',
            description:
              'All data is public and accessible to everyone. Used by companies & communities.',
            Icon: Education.BriefCase01,
          },
        ]}
      />
      <Divider />
      {/* Widget */}
      <div className="flex w-full items-center justify-center gap-4">
        <Widget size="tiny" variant="placeholder" />
        <Widget size="long" variant="placeholder" />
        <Widget size="tall" variant="placeholder" />
        <Widget size="large" variant="placeholder" />
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
