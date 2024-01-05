import IdentityRadioGroup from './components/IdentityRadioGroup';
import TextAndSupportingText from './components/onboarding/TextAndSupportingText';
import Button from './components/button';
import Header from './components/onboarding/Header';
import LoginPrompt from './components/onboarding/LoginPrompt';
import * as UntitledUI from 'untitledui-js';
import Footer from './components/onboarding/Footer';

export default function App() {
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
              variants={[
                {
                  type: 'personal',
                  title: 'Personal',
                  description:
                    'Personal data is private and securely encrypted. It is only accessible with your consent.',
                  Icon: UntitledUI.Users.User01,
                },
                {
                  type: 'authority',
                  title: 'Authority',
                  description:
                    'All data is public and accessible to everyone. Used by companies & communities.',
                  Icon: UntitledUI.Education.BriefCase01,
                },
              ]}
            />
            {/* FIXME: Fix hardcoded width */}
            <Button asChild size="lg" className="w-[360px]">
              <a href="/passphrase">Continue</a>
            </Button>
          </div>
          <LoginPrompt />
        </div>
      </main>
      <Footer />
    </div>
  );
}
