import Link from 'next/link';

export default function LoginPrompt() {
  return (
    <div className="flex gap-[4px] text-sm">
      <div className="text-gray-500">Already have an account?</div>
      <Link
        className="font-semibold text-brand-700 no-underline"
        href="/account/login-with-passkey"
      >
        Log in
      </Link>
    </div>
  );
}
