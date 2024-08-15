import { ArrowUpRight, PencilLine } from 'untitledui-js';
import * as React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Avatar, AvatarImage, AvatarFallback } from '../avatar';
import Badge from '../badge';
import { TabsList, TabsTrigger } from '../tabs';
import { generateSVGAvatar } from '../../lib/avatar';

const getTabs = (tabsType: 'primary' | 'badges' | 'profile') => {
  switch (tabsType) {
    case 'primary':
    case 'badges':
    default:
      return (
        <>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="synced">Synced</TabsTrigger>
          <TabsTrigger value="validated">Validated</TabsTrigger>
          <TabsTrigger value="shared">Shared</TabsTrigger>
        </>
      );
    case 'profile':
      return (
        <>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </>
      );
  }
};

export interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  onToggleEditClick?: () => void;
  onShareClick?: () => void;
  tabsType: 'primary' | 'badges' | 'profile';
}

const Header: React.FC<HeaderProps> = ({
  onToggleEditClick,
  onShareClick,
  tabsType,
}) => {
  const router = useRouter();

  const [publicKey, setPublicKey] = React.useState<string | null>(null);

  useEffect(() => {
    const localStoragePublicKey = localStorage.getItem('publicKey');
    setPublicKey(localStoragePublicKey);
  }, []);

  return (
    <header className="flex justify-between self-stretch px-[300px] py-[20px]">
      <img className="h-[32px] w-[88.961px]" alt="Logo" src="/logo.svg" />
      <TabsList>{getTabs(tabsType)}</TabsList>
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
        <button onClick={() => router.push('/profile')}>
          <Badge variant="secondary" size="sm" className="p-0">
            <Avatar>
              <AvatarImage
                src={publicKey ? generateSVGAvatar(publicKey) : ''}
                className=""
              />
              <AvatarFallback>{''}</AvatarFallback>
            </Avatar>
          </Badge>
        </button>
      </div>
    </header>
  );
};

export default Header;
