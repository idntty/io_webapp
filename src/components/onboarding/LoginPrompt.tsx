import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function LoginPrompt() {
  const [loginPath, setLoginPath] = useState('/account/login-with-passkey');

  useEffect(() => {
    const publicKey = localStorage.getItem('publicKey');
    setLoginPath(
      publicKey
        ? '/account/login-with-passkey'
        : '/account/login-without-passkey',
    );
  }, []);

  return (
    <div className="flex gap-[4px] text-sm">
      <div className="text-gray-500">Already have an account?</div>
      <Link
        className="font-semibold text-brand-700 no-underline"
        href={loginPath}
      >
        Log in
      </Link>
    </div>
  );
}
