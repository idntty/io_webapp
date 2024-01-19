import { useOnboardingStore } from '../stores/onboardingStore';

export default function IdentityPage() {
  const encryptedMessage = useOnboardingStore(
    (state) => state.encryptedMessage,
  );

  return (
    <div>
      <h2 className="p-1 text-xl font-bold">Saved to local storage</h2>
      <p className="break-all p-1">
        Encrypted mnemonic:{' '}
        <b>{window.localStorage.getItem('encryptedMnemonic')}</b>
      </p>
      {encryptedMessage && (
        <>
          <h2 className="p-1 text-xl font-bold">Sent to server</h2>
          <p className="break-all p-1">
            Encrypted message: <b>{encryptedMessage}</b> (also sent nonce)
          </p>
        </>
      )}
    </div>
  );
}
