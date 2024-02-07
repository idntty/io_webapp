import * as React from 'react';
import { Communication } from 'untitledui-js';

// make this have className prop

const Footer: React.FC<React.ComponentPropsWithoutRef<'footer'>> = () => {
  return (
    <footer className="flex h-[60px] shrink-0 items-center justify-between self-stretch px-[300px] py-[20px]">
      <div className="text-sm text-gray-500">© Untitled UI 2077</div>
      <div className="flex items-center gap-[8px]">
        <Communication.Mail01 size="16" className="stroke-gray-500" />
        <div className="text-sm text-gray-500">help@untitledui.com</div>
      </div>
    </footer>
  );
};

export default Footer;
