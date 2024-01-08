import Header from './components/onboarding/Header';
import Footer from './components/onboarding/Footer';
import TextAndSupportingText from './components/onboarding/TextAndSupportingText';
import Button from './components/button';
import { Security } from 'untitledui-js';

export default function CreateAccount() {
  return (
    <div className="box-border flex h-screen w-screen flex-row overflow-hidden bg-white text-base">
      <div className="flex shrink-0 grow basis-0 flex-col items-center justify-between self-stretch">
        <Header />
        <div className="flex flex-col items-start self-stretch px-[32px]">
          <div className="flex w-[360px] flex-col items-center gap-[32px]">
            <TextAndSupportingText
              text="Secure your data"
              supportingText="We will securely encrypt and store the key you just created. This key is stored locally in your browser. Each time we request it, you will know and agree to access it."
            />
            <div className="flex flex-col items-start gap-[16px] self-stretch">
              <Button asChild size="lg" className="w-full">
                <a href="/identity-page">
                  <Security.Shield01 className="stroke-current" size="20" />
                  Create my account
                </a>
              </Button>
              {/* TODO: Maybe extract as a Divider component? */}
              <div className="flex items-center gap-[8px] self-stretch">
                <div className="h-[1px] flex-shrink-0 flex-grow basis-0 bg-gray-200" />
                <div className="text-center text-sm font-normal text-gray-500">
                  Will enter the passphrase every time
                </div>
                <div className="h-[1px] flex-shrink-0 flex-grow basis-0 bg-gray-200" />
              </div>
              <Button
                asChild
                size="lg"
                variant="secondary-color"
                className="w-full"
              >
                <a href="/identity-page">Skip</a>
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      <div className="hidden w-[960px] self-stretch bg-gray-50 md:flex"></div>
    </div>
  );
}
