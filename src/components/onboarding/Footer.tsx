export default function Footer() {
  return (
    <footer className="box-border flex h-[60px] items-center justify-between px-[32px] py-[20px] text-center text-xs text-gray-400">
      <div>
        {`Copyright © Idntty 2023. All rights reserved. All other trademarks are the property of their respective owners. With any collaboration you accept the general `}
        <a
          className="text-inherit"
          href="https://idntty.io"
          target="_blank"
          rel="noreferrer"
        >
          terms
        </a>{' '}
        and conditions of iconwerk.
      </div>
    </footer>
  );
}
