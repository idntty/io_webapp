'use client';

import { General } from 'untitledui-js';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Header from '../components/onboarding/Header';
import Footer from '../components/onboarding/Footer';
import TextAndSupportingText from '../components/onboarding/TextAndSupportingText';
import Checkbox from '../components/checkbox';
import Button from '../components/button/button';
import { generateKeysAndAdress } from '../lib/crypto';
import { useOnboardingStore } from '../stores/onboardingStore';
import { registerWithPasskey } from '../lib/passkeys';
import { saveMnemonic, toPrivateKeyObject, createJWT } from '../lib/crypto';

export default function LoginWithoutPasskey() {
  const router = useRouter();

  const setPassphrase = useOnboardingStore((state) => state.setPassphrase);
  const setPrivateKey = useOnboardingStore((state) => state.setPrivateKey);
  const setPublicKey = useOnboardingStore((state) => state.setPublicKey);
  const setWalletAddress = useOnboardingStore(
    (state) => state.setWalletAddress,
  );
  const [doEncrypt, setDoEncrypt] = useState(false);

  const login = async () => {
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

      localStorage.setItem('publicKey', publicKey.toString('hex'));

      const jwt = await createJWT(
        await toPrivateKeyObject(privateKey),
        publicKey.toString('hex'),
        {},
      );

      localStorage.setItem('jwt', jwt);

      sessionStorage.setItem('privateKey', privateKey.toString('hex'));

      if (doEncrypt) {
        const response = await registerWithPasskey(publicKey);
        const webAuthnPublicKey = response.webAuthnPublicKey;
        if (!webAuthnPublicKey) {
          throw new Error('WebAuthn public key was not generated');
        }
        await saveMnemonic(passphrase.split(' '), webAuthnPublicKey);
      }
      router.push(`/${publicKey.toString('hex')}`);
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
                  <Checkbox
                    id="encrypt"
                    onCheckedChange={(checked) =>
                      setDoEncrypt(checked == 'indeterminate' ? false : checked)
                    }
                  />
                  <label
                    htmlFor="encrypt"
                    className="text-sm font-medium text-gray-700 peer-disabled:text-gray-300"
                  >
                    Encrypt and save it locally
                  </label>
                </div>
                {/* FIXME: Fix hardcoded width and having to use has-[:disabled]:*/}
                <Button
                  size="lg"
                  className="w-[360px] has-[:disabled]:pointer-events-none"
                  onClick={handleLogin}
                >
                  <General.Copy01 className="stroke-current" size="20" />
                  Paste and login
                </Button>
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
