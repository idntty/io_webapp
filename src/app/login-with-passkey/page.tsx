'use client';

import { Security, General } from 'untitledui-js';
import { useRouter } from 'next/navigation';

import Button from '../../components/button/button';
import Footer from '../../components/onboarding/Footer';
import Header from '../../components/onboarding/Header';
import TextAndSupportingText from '../../components/onboarding/TextAndSupportingText';
import { UserRegistrationFormSchemaType } from '../../components/onboarding/UserRegistrationForm';
import {
  generateKeysAndAdress,
  loadMnemonic,
  convertKeys,
  decryptMessage,
} from '../../lib/crypto';
import { useOnboardingStore } from '../../stores/onboardingStore';
import { loginWithPasskey } from '../../lib/passkeys';
import { getMessageFromServer } from '../../lib/utils';

export default function LoginWithPasskey() {
  const router = useRouter();

  const setPassphrase = useOnboardingStore((state) => state.setPassphrase);
  const setPrivateKey = useOnboardingStore((state) => state.setPrivateKey);
  const setPublicKey = useOnboardingStore((state) => state.setPublicKey);
  const setWalletAddress = useOnboardingStore(
    (state) => state.setWalletAddress,
  );
  const setPrivateData = useOnboardingStore((state) => state.setPrivateData);

  const loginWithPassphrase = async () => {
    try {
      const passphrase = await navigator.clipboard.readText();
      if (passphrase.split(' ').length !== 12) {
        throw new Error('Passphrase is not 12 words long');
      }
      setPassphrase(passphrase.split(' '));
      console.log('Pasted the passphrase from clipboard');

      const { privateKey, publicKey, walletAddress } =
        await generateKeysAndAdress(passphrase);
      setPrivateKey(privateKey);
      setPublicKey(publicKey);
      setWalletAddress(walletAddress);

      router.push('/identity-page');
    } catch (error) {
      console.error(error);
    }
  };

  // FIXME: Likely bad
  const handleLoginWithPassphrase = () => {
    loginWithPassphrase().catch((error) => {
      console.error(error);
    });
  };

  const login = async () => {
    const localPublicKey = localStorage.getItem('publicKey');

    if (!localPublicKey) {
      throw new Error('Public key was not found');
    }

    try {
      const response = await loginWithPasskey(
        Buffer.from(localPublicKey, 'hex'),
      );
      const webAuthnPublicKey = response.webAuthnPublicKey;
      if (!webAuthnPublicKey) {
        throw new Error('Did not get webAuthnPublicKey from server');
      }
      const { phrase, publicKey, privateKey, walletAddress } =
        await loadMnemonic(webAuthnPublicKey);
      console.log(phrase.split(' '));
      setPassphrase(phrase.split(' '));
      setPrivateKey(privateKey);
      setPublicKey(publicKey);
      setWalletAddress(walletAddress);

      const { encryptedMessage, nonce } = await getMessageFromServer(publicKey);
      const { convertedPrivateKey } = await convertKeys(publicKey, privateKey);
      const decryptedMessage = await decryptMessage(
        encryptedMessage,
        nonce,
        convertedPrivateKey,
      );
      const privateData = JSON.parse(
        atob(decryptedMessage),
      ) as UserRegistrationFormSchemaType;
      setPrivateData(privateData);
      console.log('privateData', privateData);

      router.push('/identity-page');
    } catch (error) {
      console.error(error);
    }
  };

  // FIXME: Likely bad
  const handleLogin = () => {
    login().catch((error) => {
      console.error(error);
    });
  };

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
              <Button
                size="lg"
                className="w-[360px] has-[:disabled]:pointer-events-none"
                onClick={handleLogin}
              >
                <Security.Shield01 className="stroke-current" size="20" />
                Seamless Re-entry
              </Button>
              <div className="flex items-center gap-[8px] self-stretch">
                <div className="h-[1px] flex-shrink-0 flex-grow basis-0 bg-gray-200" />
                <div className="text-center text-sm font-normal text-gray-500">
                  or paste passphrase from buffer
                </div>
                {/* TODO: Maybe extract as a Divider component? */}
                <div className="h-[1px] flex-shrink-0 flex-grow basis-0 bg-gray-200" />
              </div>
              {/* FIXME: Fix hardcoded width and having to use has-[:disabled]:*/}
              <Button
                size="lg"
                variant="secondary-color"
                className="w-[360px] has-[:disabled]:pointer-events-none"
                onClick={handleLoginWithPassphrase}
              >
                <General.Copy01 className="stroke-current" size="20" />
                Paste and login
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
