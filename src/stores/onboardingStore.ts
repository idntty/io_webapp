import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { UserRegistrationFormSchemaType } from '../components/onboarding/UserRegistrationForm';

export interface OnboardingState {
  identity?: 'personal' | 'authority';
  passphrase: string[];
  privateKey?: Buffer;
  publicKey?: Buffer;
  walletAddress?: string;
  privateData?: UserRegistrationFormSchemaType;
  isAuthenticated: boolean;

  // FIXME: Remove later
  encryptedMessage?: string;
  setEncryptedMessage: (encryptedMessage: string) => void;

  setIdentity: (identity: 'personal' | 'authority') => void;
  setPassphrase: (passphrase: string[]) => void;
  setPrivateKey: (privateKey: Buffer) => void;
  setPublicKey: (publicKey: Buffer) => void;
  setWalletAddress: (walletAddress: string) => void;
  setPrivateData: (privateData: UserRegistrationFormSchemaType) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
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
    }),
    {
      name: 'onboardingStore',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ identity: state.identity }),
    },
  ),
);
