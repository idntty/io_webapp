export default function LoginPrompt() {
  return (
    <div className="flex gap-[4px] text-sm">
      <div className="text-gray-500">Already have an account?</div>
      <a
        className="font-semibold text-brand-700 no-underline"
        href="/login-with-passkey"
      >
        Log in
      </a>
    </div>
  );
}
