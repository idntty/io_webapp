import { useState } from 'react';
import { Link } from 'react-router-dom';

import IdentityRadioGroup from '../components/IdentityRadioGroup';
import TextAndSupportingText from '../components/onboarding/TextAndSupportingText';
import Button from '../components/button';
import Header from '../components/onboarding/Header';
import LoginPrompt from '../components/onboarding/LoginPrompt';
import { Users, Education } from 'untitledui-js';
import Footer from '../components/onboarding/Footer';
import { useOnboardingStore } from '../stores/onboardingStore';

export default function IdentitySelection() {
  const [isIdentitySelected, setIsIdentitySelected] = useState(false);
  const setIdentity = useOnboardingStore((state) => state.setIdentity);

  return (
    <div className="flex h-screen flex-shrink-0 flex-grow basis-0 flex-col items-center justify-between self-stretch overflow-hidden bg-white text-gray-900">
      <Header />
      <main className="flex flex-col items-center justify-between self-stretch bg-white">
        <div className="flex flex-col items-center justify-start gap-[32px] self-stretch px-[32px]">
          <TextAndSupportingText
            text="Choose your identity"
            supportingText="Personal for individuals or Authority for organizations. Tailor your digital identity to suit your needs."
            align="center"
          />
          <div className="flex flex-col items-center justify-start gap-[24px]">
            <IdentityRadioGroup
              onValueChange={(value) => {
                setIsIdentitySelected(true);
                setIdentity(value as 'personal' | 'authority');
              }}
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
            {/* FIXME: Fix hardcoded width and having to use has-[:disabled]:*/}
            <Link
              to="/passphrase"
              className="has-[:disabled]:pointer-events-none"
            >
              <Button
                size="lg"
                className="w-[360px]"
                disabled={!isIdentitySelected}
              >
                Continue
              </Button>
            </Link>
          </div>
          <LoginPrompt />
        </div>
      </main>
      <Footer />
    </div>
  );
}
