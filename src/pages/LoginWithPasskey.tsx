import { Security, General } from 'untitledui-js';
import { Link } from 'react-router-dom';

import Button from '../components/button';
import Footer from '../components/onboarding/Footer';
import Header from '../components/onboarding/Header';
import TextAndSupportingText from '../components/onboarding/TextAndSupportingText';

export default function LoginWithPasskey() {
  return (
    <div className="box-border flex h-screen w-screen flex-row overflow-hidden bg-white text-base">
      <div className="flex shrink-0 grow basis-0 flex-col items-center justify-between self-stretch">
        <Header />
        <div className="flex flex-col items-start self-stretch px-[32px]">
          <div className="flex w-[360px] flex-col items-center gap-[32px]">
            <TextAndSupportingText
              text="Access Your Digital ID"
              supportingText="Sign in effortlessly to reclaim control of your digital identity with private key, encrypted in local storage. Your secure space awaits."
            />
            <div className="flex flex-col items-start gap-[16px] self-stretch">
              {/* FIXME: Fix hardcoded width and having to use has-[:disabled]:*/}
              <Link
                to="/identity-page"
                className="has-[:disabled]:pointer-events-none"
              >
                <Button size="lg" className="w-[360px]">
                  <Security.Shield01 className="stroke-current" size="20" />
                  Seamless Re-entry
                </Button>
              </Link>
              {/* TODO: Maybe extract as a Divider component? */}
              <div className="flex items-center gap-[8px] self-stretch">
                <div className="h-[1px] flex-shrink-0 flex-grow basis-0 bg-gray-200" />
                <div className="text-center text-sm font-normal text-gray-500">
                  or paste passphrase from buffer
                </div>
                <div className="h-[1px] flex-shrink-0 flex-grow basis-0 bg-gray-200" />
              </div>
              {/* FIXME: Fix hardcoded width and having to use has-[:disabled]:*/}
              <Link
                to="/identity-page"
                className="has-[:disabled]:pointer-events-none"
              >
                <Button
                  size="lg"
                  variant="secondary-color"
                  className="w-[360px]"
                >
                  <General.Copy01 className="stroke-current" size="20" />
                  Paste and login
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      <div className="hidden w-[960px] self-stretch bg-gray-50 md:flex"></div>
    </div>
  );
}
