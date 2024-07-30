import { ArrowUpRight, PencilLine } from 'untitledui-js';
import * as React from 'react';

import Badge from '../badge';
import { TabsList, TabsTrigger } from '../tabs';

export interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  onToggleEditClick?: () => void;
  onShareClick?: () => void;
  type: 'primary' | 'badges';
}

const Header: React.FC<HeaderProps> = ({ onToggleEditClick, onShareClick }) => {
  return (
    <header className="flex justify-between self-stretch px-[300px] py-[20px]">
      <img className="h-[32px] w-[88.961px]" alt="Logo" src="/logo.svg" />
      <TabsList>
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="synced">Synced</TabsTrigger>
        <TabsTrigger value="validated">Validated</TabsTrigger>
        <TabsTrigger value="shared">Shared</TabsTrigger>
      </TabsList>
      <div className="flex items-center justify-center gap-[10px] px-0 py-[2px]">
        <button onClick={onToggleEditClick}>
          <Badge variant="secondary" size="lg">
            <PencilLine size="12" className="stroke-gray-500" />
          </Badge>
        </button>
        <button onClick={onShareClick}>
          <Badge variant="secondary" size="lg">
            <ArrowUpRight size="12" className="stroke-gray-500" />
          </Badge>
        </button>
      </div>
    </header>
  );
};

export default Header;
