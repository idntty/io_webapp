import { create } from 'zustand';
import { UserRegistrationFormSchemaType } from '../components/UserRegistrationForm';

export interface OnboardingState {
  identity?: 'personal' | 'authority';
  passphrase: string[];
  privateKey?: Buffer;
  publicKey?: Buffer;
  walletAddress?: Buffer;
  privateData?: UserRegistrationFormSchemaType;

  setIdentity: (identity: 'personal' | 'authority') => void;
  setPassphrase: (passphrase: string[]) => void;
  setPrivateKey: (privateKey: Buffer) => void;
  setPublicKey: (publicKey: Buffer) => void;
  setWalletAddress: (walletAddress: Buffer) => void;
  setFormData: (formData: UserRegistrationFormSchemaType) => void;
}

export const useOnboardingStore = create<OnboardingState>()((set) => ({
  identity: undefined,
  passphrase: [],
  privateKey: undefined,
  publicKey: undefined,
  walletAddress: undefined,
  privateData: undefined,
  setIdentity: (identity) => set({ identity }),
  setPassphrase: (passphrase) => set({ passphrase }),
  setPrivateKey: (privateKey) => set({ privateKey }),
  setPublicKey: (publicKey) => set({ publicKey }),
  setWalletAddress: (walletAddress) => set({ walletAddress }),
  setFormData: (formData) => set({ privateData: formData }),
}));
