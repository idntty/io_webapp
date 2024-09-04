'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Shield01 } from 'untitledui-js';
import { Buffer } from 'buffer';

import Header from '../../components/onboarding/Header';
import Footer from '../../components/onboarding/Footer';
import TextAndSupportingText from '../../components/onboarding/TextAndSupportingText';
import Button from '../../components/button/button';
import EncryptedWidget from '../../components/app/grid/EncryptedWidget';

import { Responsive, WidthProvider } from 'react-grid-layout';
const GridLayout = WidthProvider(Responsive);

import { useOnboardingStore } from '../../stores/onboardingStore';
import { registerWithPasskey } from '../../lib/passkeys';
import {
  saveMnemonic,
  convertKeys,
  encryptMessage,
  createJWT,
} from '../../lib/crypto';

import { useGridStore } from '../../stores/gridStores';
import { setAccountType } from '../../lib/apiClient';

export default function CreateAccount() {
  const router = useRouter();

  const publicKey = useOnboardingStore((state) => state.publicKey);
  const privateKey = useOnboardingStore((state) => state.privateKey);
  const passphrase = useOnboardingStore((state) => state.passphrase);
  const privateData = useOnboardingStore((state) => state.privateData);
  const identity = useOnboardingStore((state) => state.identity);

  const grid = useGridStore((state) => state.grid);
  const upperGridLayout = useGridStore((state) => state.upperGridLayout);

  // FIXME: Remove later
  const setEncryptedMessage = useOnboardingStore(
    (state) => state.setEncryptedMessage,
  );

  const createAccount = async () => {
    if (!publicKey) {
      throw new Error('Public key was not generated');
    }
    if (!privateKey) {
      throw new Error('Private key was not generated');
    }
    if (!passphrase) {
      throw new Error('Passphrase was not generated');
    }
    if (!privateData) {
      throw new Error('Private data was not generated');
    }
    if (!identity) {
      throw new Error('Identity was not set');
    }
    try {
      const response = await registerWithPasskey(
        publicKey,
        identity === 'authority',
      );
      const webAuthnPublicKey = response.webAuthnPublicKey;
      if (!webAuthnPublicKey) {
        throw new Error('WebAuthn public key was not generated');
      }
      await saveMnemonic(passphrase, webAuthnPublicKey);

      localStorage.setItem('publicKey', publicKey.toString('hex'));

      const jwt = await createJWT(
        // await toPrivateKeyObject(privateKey),
        privateKey,
        publicKey.toString('hex'),
        {},
      );

      sessionStorage.setItem('jwt', jwt);
      sessionStorage.setItem('privateKey', privateKey.toString('hex'));

      const { convertedPrivateKey } = await convertKeys(publicKey, privateKey);
      const { encryptedMessage, nonce } = await encryptMessage(
        convertedPrivateKey,
        btoa(JSON.stringify(privateData)),
      );

      await setAccountType(
        identity,
        privateKey.toString('hex'),
        publicKey.toString('hex'),
      );

      // FIXME: Remove later
      setEncryptedMessage(Buffer.from(encryptedMessage).toString('hex'));

      // FIXME: Do smth with the data, used to post to /message/send
      // await sendMessageToServer(encryptedMessage, nonce, publicKey);
      console.log('Encrypted message: ', encryptedMessage);
      console.log('Nonce: ', nonce);

      router.push(`/${publicKey.toString('hex')}`);
    } catch (error) {
      console.error(error);
    }
  };

  // FIXME: Likely bad
  const handleCreateAccount = () => {
    createAccount().catch((error) => {
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
              text="Secure your data"
              supportingText="We will securely encrypt and store the key you just created. This key is stored locally in your browser. Each time we request it, you will know and agree to access it."
            />
            <div className="flex flex-col items-start gap-[16px] self-stretch">
              {/* FIXME: Fix hardcoded width and having to use has-[:disabled]:*/}
              <Button
                size="lg"
                className="w-[360px]"
                onClick={handleCreateAccount}
              >
                <Shield01 className="stroke-current" size="20" />
                Create my account
              </Button>
              <div className="flex items-center gap-[8px] self-stretch">
                <div className="h-[1px] flex-shrink-0 flex-grow basis-0 bg-gray-200" />
                <div className="text-center text-sm font-normal text-gray-500">
                  Will enter the passphrase every time
                </div>
                {/* TODO: Maybe extract as a Divider component? */}
                <div className="h-[1px] flex-shrink-0 flex-grow basis-0 bg-gray-200" />
              </div>
              {/* FIXME: Fix hardcoded width and having to use has-[:disabled]:*/}
              <Link
                href={`/${publicKey?.toString('hex') ?? ''}`}
                className="has-[:disabled]:pointer-events-none"
              >
                <Button
                  size="lg"
                  variant="secondary-color"
                  className="w-[360px]"
                >
                  Skip
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      <div className="relative flex flex-grow flex-col justify-between overflow-auto bg-gray-50">
        <div className="relative mx-auto w-[482px] bg-gray-100 lg:w-[924px]">
          <GridLayout
            layouts={{
              lg: upperGridLayout,
              md: upperGridLayout,
            }}
            cols={{
              lg: 4,
              md: 2,
            }}
            breakpoints={{
              lg: 923,
              md: 0,
            }}
            margin={[40, 40]}
            compactType={'horizontal'}
            isResizable={false}
            isDraggable={false}
            isBounded={false}
            rowHeight={181}
            className="bg-gray-100"
          >
            {upperGridLayout.map((layout) => {
              return (
                <EncryptedWidget key={layout.i} size={grid[layout.i].size} />
              );
            })}
          </GridLayout>
        </div>
      </div>
    </div>
  );
}
