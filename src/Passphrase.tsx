import { Arrow, General } from 'untitledui-js';
import { Link } from 'react-router-dom';

import Header from './components/onboarding/Header';
import TextAndSupportingText from './components/onboarding/TextAndSupportingText';
import Badge from './components/badge';
import Button from './components/button';
import Checkbox from './components/checkbox';
import Footer from './components/onboarding/Footer';
import LoginPrompt from './components/onboarding/LoginPrompt';

export default function Passphrase() {
  const passphraseWords = [
    'sniff',
    'trap',
    'frog',
    'camera',
    'lamp',
    'same',
    'trap',
    'biology',
    'nephew',
    'office',
    'snap',
    'vendor',
  ];
  const actionIcons = [Arrow.RefreshCW02, General.Copy01, General.Edit05];

  return (
    <div className="box-border flex h-screen w-screen flex-row items-center self-stretch overflow-hidden bg-white text-base text-black">
      <div className="flex flex-shrink-0 flex-grow basis-0 flex-col items-center justify-between self-stretch">
        <Header />
        <main className="flex flex-col items-center self-stretch px-[32px]">
          <div className="flex w-[360px] flex-col items-center gap-[32px]">
            <TextAndSupportingText
              text="Craft your passphrase"
              supportingText="Generate a unique pass phrase. This secret code will be the guardian of your digital identity, ensuring it remains exclusively yours."
              align="left"
            />
            <div className="flex flex-col items-center gap-[24px] self-stretch rounded-xl">
              {/* TODO: Maybe extract as a Divider component? */}
              <div className="h-[1px] self-stretch bg-gray-200" />
              <div className="flex flex-wrap content-center items-center justify-center gap-[20px] self-stretch">
                {passphraseWords.map((word, index) => (
                  <Badge key={index}>{word}</Badge>
                ))}
              </div>
              <div className="flex items-center justify-center gap-[16px] self-stretch">
                {actionIcons.map((Icon, index) => (
                  <Button
                    key={index}
                    size="lg"
                    variant="secondary-gray"
                    shape="square"
                  >
                    <Icon className="stroke-gray-700" />
                  </Button>
                ))}
              </div>
              <div className="flex flex-col items-start gap-[16px] self-stretch">
                {/* TODO: Maybe extract as a Divider component? */}
                <div className="flex items-center gap-[8px] self-stretch">
                  <div className="h-[1px] flex-shrink-0 flex-grow basis-0 bg-gray-200" />
                  <div className="text-center text-sm font-normal text-gray-500">
                    Your Key to Security
                  </div>
                  <div className="h-[1px] flex-shrink-0 flex-grow basis-0 bg-gray-200" />
                </div>
                <div className="flex items-center justify-between self-stretch">
                  <div className="flex items-center gap-[8px]">
                    <Checkbox id="passphraseSaved" />
                    <label
                      htmlFor="passphraseSaved"
                      className="text-sm font-medium text-gray-700 peer-disabled:text-gray-300"
                    >
                      I have saved my passphrase
                    </label>
                  </div>
                  <a
                    className="text-sm font-semibold text-brand-700 no-underline"
                    href="google.com"
                  >
                    Download
                  </a>
                </div>
                {/* FIXME: Fix hardcoded width and having to use has-[:disabled]:*/}
                <Link
                  to="/private-data"
                  className="has-[:disabled]:pointer-events-none"
                >
                  <Button size="lg" className="w-[360px]">
                    Define my digital self
                  </Button>
                </Link>
              </div>
            </div>
            <LoginPrompt />
          </div>
        </main>
        <Footer />
      </div>
      <div className="hidden shrink-0 grow basis-0 flex-col items-center justify-between self-stretch bg-gray-50 md:flex"></div>
    </div>
  );
}
