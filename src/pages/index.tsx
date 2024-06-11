import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    console.log('Checking auth and user status');

    const localStoragePublicKey = localStorage.getItem('publicKey');
    console.log('localStoragePublicKey:', localStoragePublicKey);

    if (!localStoragePublicKey) {
      void router.push('/account/type');
    } else {
      void router.push(`/${localStoragePublicKey}`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);
}
