import { General, Arrow } from 'untitledui-js';
import * as React from 'react';

import Badge from '../badge';

export interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  onAddClick?: () => void;
  type: 'primary' | 'badges';
}

const tabs = {
  primary: ['All', 'Synced', 'Validated', 'Shared'],
  badges: ['Badges', 'Collections'],
};

const Header: React.FC<HeaderProps> = ({ onAddClick, type }) => {
  return (
    <header className="flex justify-between self-stretch px-[300px] py-[20px]">
      <img className="h-[32px] w-[88.961px]" alt="Logo" src="/logo.svg" />
      <div className="flex justify-center gap-[12px] rounded-2xl bg-gray-50 pb-[4px] pl-[4px] pr-[12px] pt-[4px] mix-blend-multiply">
        <div className="flex items-center justify-center rounded-2xl bg-white px-[10px] py-[2px] text-center text-sm font-medium text-gray-700">
          {tabs[type][0]}
        </div>
        <div className="text-sm font-medium text-gray-700">
          {tabs[type].slice(1).join('\t')}
        </div>
      </div>
      <div className="flex items-center justify-center gap-[10px] px-0 py-[2px]">
        <button onClick={onAddClick}>
          <Badge variant="secondary" size="lg">
            <General.Plus size="12" className="stroke-gray-500" />
          </Badge>
        </button>
        <Badge variant="secondary" size="lg">
          <Arrow.ArrowUpRight size="12" className="stroke-gray-500" />
        </Badge>
      </div>
    </header>
  );
};

export default Header;
