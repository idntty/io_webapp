import { Arrow, General, Alerts } from 'untitledui-js';
import { Link } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';

import Header from '../components/onboarding/Header';
import TextAndSupportingText from '../components/onboarding/TextAndSupportingText';
import Badge from '../components/badge';
import Button from '../components/button/button';
import Checkbox from '../components/checkbox';
import Footer from '../components/onboarding/Footer';
import LoginPrompt from '../components/onboarding/LoginPrompt';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from '../components/alert-dialog';

import { useOnboardingStore } from '../stores/onboardingStore';
import { generatePassphraseAndKeys } from '../lib/crypto';
import { createPDF } from '../lib/utils';
import Divider from '../components/divider';

export default function Passphrase() {
  const passphrase = useOnboardingStore((state) => state.passphrase);
  const setPassphrase = useOnboardingStore((state) => state.setPassphrase);

  const setPrivateKey = useOnboardingStore((state) => state.setPrivateKey);

  const publicKey = useOnboardingStore((state) => state.publicKey);
  const setPublicKey = useOnboardingStore((state) => state.setPublicKey);

  const walletAddress = useOnboardingStore((state) => state.walletAddress);
  const setWalletAddress = useOnboardingStore(
    (state) => state.setWalletAddress,
  );

  const [isPassphraseSaved, setIsPassphraseSaved] = useState(false);

  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

  const handleGenerate = useCallback(() => {
    generatePassphraseAndKeys().then(
      ({ passphrase, privateKey, publicKey, walletAddress }) => {
        setPassphrase(passphrase.split(' '));
        setPrivateKey(privateKey);
        setPublicKey(publicKey);
        setWalletAddress(walletAddress);
      },
      (err) => {
        console.error('Could not generate keys from passphrase: ', err);
      },
    );
  }, [setPassphrase, setPrivateKey, setPublicKey, setWalletAddress]);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(passphrase.join(' ')).then(
      () => {
        console.log('Copied the passphrase to clipboard');
      },
      (err) => {
        console.error('Could not copy the passphrase to clipboard: ', err);
      },
    );
  };

  const handlePasteClick = () => {
    navigator.clipboard.readText().then(
      (text) => {
        const words = text.split(' ');
        if (words.length !== 12) {
          console.error('Invalid passphrase');
          setIsAlertDialogOpen(true);
          return;
        }
        setPassphrase(words);
        console.log('Pasted the passphrase from clipboard');
      },
      (err) => {
        console.error('Could not paste the passphrase from clipboard: ', err);
      },
    );
  };

  const handleDownloadClick = () => {
    if (!passphrase || !publicKey || !walletAddress) {
      console.error("Can't generate a PDF: missing data");
      return;
    }
    createPDF(passphrase, publicKey, walletAddress).then(
      () => {
        console.log('Generated a PDF');
      },
      (err) => {
        console.error('Could not generate a PDF: ', err);
      },
    );
  };

  useEffect(() => {
    handleGenerate();
  }, [handleGenerate]);

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
              <Divider />
              <div className="flex flex-wrap content-center items-center justify-center gap-[20px] self-stretch">
                {passphrase.map((word, index) => (
                  <Badge key={index}>{word}</Badge>
                ))}
              </div>
              <div className="flex items-center justify-center gap-[16px] self-stretch">
                <Button
                  size="lg"
                  variant="secondary-gray"
                  shape="square"
                  onClick={handleGenerate}
                >
                  <Arrow.RefreshCW02 className="stroke-gray-700" />
                </Button>
                <Button
                  size="lg"
                  variant="secondary-gray"
                  shape="square"
                  // TODO: Add some kind of toast to indicate that the passphrase was copied or not
                  onClick={handleCopyClick}
                >
                  <General.Copy01 className="stroke-gray-700" />
                </Button>
                <Button
                  size="lg"
                  variant="secondary-gray"
                  shape="square"
                  onClick={handlePasteClick}
                >
                  <General.Edit05 className="stroke-gray-700" />
                </Button>
                <AlertDialog
                  open={isAlertDialogOpen}
                  onOpenChange={setIsAlertDialogOpen}
                >
                  <AlertDialogContent className="flex gap-[24px]">
                    <div className="flex h-[40px] w-[40px] items-center justify-center rounded-[20px] bg-warning-100 p-[10px]">
                      <Alerts.AlertTriangle
                        size="20"
                        className="flex-shrink-0 stroke-warning-600 stroke-2"
                      />
                    </div>
                    <div className="flex flex-shrink-0 flex-grow basis-0 flex-col gap-[32px]">
                      <div className="flex flex-col gap-[8px] self-stretch">
                        <AlertDialogTitle>Invalid passphrase</AlertDialogTitle>
                        <AlertDialogDescription>
                          It seems that the passphrase you tried to insert is
                          not correct. A correct passphrase should contain 12
                          words separated by a space.
                        </AlertDialogDescription>
                      </div>
                      <div className="flex items-center justify-end gap-[12px] self-stretch">
                        <div className="flex gap-[12px]">
                          <AlertDialogAction>OK</AlertDialogAction>
                        </div>
                      </div>
                    </div>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
              <div className="flex flex-col items-start gap-[16px] self-stretch">
                <div className="flex items-center gap-[8px] self-stretch">
                  <div className="h-[1px] flex-shrink-0 flex-grow basis-0 bg-gray-200" />
                  <div className="text-center text-sm font-normal text-gray-500">
                    Your Key to Security
                  </div>
                  {/* TODO: Maybe extract as a Divider component? */}
                  <div className="h-[1px] flex-shrink-0 flex-grow basis-0 bg-gray-200" />
                </div>
                <div className="flex items-center justify-between self-stretch">
                  <div className="flex items-center gap-[8px]">
                    <Checkbox
                      id="passphraseSaved"
                      onCheckedChange={(checked) =>
                        setIsPassphraseSaved(
                          checked == 'indeterminate' ? false : checked,
                        )
                      }
                    />
                    <label
                      htmlFor="passphraseSaved"
                      className="text-sm font-medium text-gray-700 peer-disabled:text-gray-300"
                    >
                      I have saved my passphrase
                    </label>
                  </div>
                  <button
                    className="text-sm font-semibold text-brand-700 no-underline"
                    onClick={handleDownloadClick}
                  >
                    Download
                  </button>
                </div>
                {/* FIXME: Fix hardcoded width and having to use has-[:disabled]:*/}
                <Link
                  to="/private-data"
                  className="has-[:disabled]:pointer-events-none"
                >
                  <Button
                    size="lg"
                    className="w-[360px]"
                    disabled={!isPassphraseSaved}
                  >
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
