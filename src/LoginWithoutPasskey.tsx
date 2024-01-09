import { General } from 'untitledui-js';
import { Link } from 'react-router-dom';

import Header from './components/onboarding/Header';
import Footer from './components/onboarding/Footer';
import TextAndSupportingText from './components/onboarding/TextAndSupportingText';
import Checkbox from './components/checkbox';
import Button from './components/button';

export default function LoginWithoutPasskey() {
  return (
    <div className="box-border flex h-screen w-screen flex-row overflow-hidden bg-white text-base">
      <div className="flex shrink-0 grow basis-0 flex-col items-center justify-between self-stretch">
        <Header />
        <main className="flex flex-col items-start self-stretch px-[32px]">
          <div className="flex w-[360px] flex-col items-center gap-[32px]">
            <TextAndSupportingText
              text="Access Your Digital ID"
              supportingText="Sign in effortlessly to reclaim control of your digital identity with private key, encrypted in local storage. Your secure space awaits."
            />
            <div className="flex flex-col items-center gap-[24px] self-stretch">
              <div className="flex flex-col items-start gap-[16px] self-stretch">
                {/* TODO: Maybe extract checkbox with text to a component? */}
                <div className="flex items-center gap-[8px]">
                  <Checkbox id="encrypt" />
                  <label
                    htmlFor="encrypt"
                    className="text-sm font-medium text-gray-700 peer-disabled:text-gray-300"
                  >
                    Encrypt and save it locally
                  </label>
                </div>
                {/* FIXME: Fix hardcoded width and having to use has-[:disabled]:*/}
                <Link
                  to="/identity-page"
                  className="has-[:disabled]:pointer-events-none"
                >
                  <Button size="lg" className="w-[360px]">
                    <General.Copy01 className="stroke-current" size="20" />
                    Paste and login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
      <div className="hidden w-[960px] self-stretch bg-gray-50 md:flex"></div>
    </div>
  );
}
