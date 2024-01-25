import { create } from 'zustand';
import { UserRegistrationFormSchemaType } from '../components/onboarding/UserRegistrationForm';

export interface OnboardingState {
  identity?: 'personal' | 'authority';
  passphrase: string[];
  privateKey?: Buffer;
  publicKey?: Buffer;
  walletAddress?: Buffer;
  privateData?: UserRegistrationFormSchemaType;
  isAuthenticated: boolean;

  // FIXME: Remove later
  encryptedMessage?: string;
  setEncryptedMessage: (encryptedMessage: string) => void;

  setIdentity: (identity: 'personal' | 'authority') => void;
  setPassphrase: (passphrase: string[]) => void;
  setPrivateKey: (privateKey: Buffer) => void;
  setPublicKey: (publicKey: Buffer) => void;
  setWalletAddress: (walletAddress: Buffer) => void;
  setPrivateData: (privateData: UserRegistrationFormSchemaType) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const useOnboardingStore = create<OnboardingState>()((set) => ({
  identity: undefined,
  passphrase: [],
  privateKey: undefined,
  publicKey: undefined,
  walletAddress: undefined,
  privateData: undefined,
  isAuthenticated: false,

  // FIXME: Remove later
  encryptedMessage: undefined,
  setEncryptedMessage: (encryptedMessage) => set({ encryptedMessage }),

  setIdentity: (identity) => set({ identity }),
  setPassphrase: (passphrase) => set({ passphrase }),
  setPrivateKey: (privateKey) => set({ privateKey }),
  setPublicKey: (publicKey) => set({ publicKey }),
  setWalletAddress: (walletAddress) => set({ walletAddress }),
  setPrivateData: (privateData) => set({ privateData }),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
}));
