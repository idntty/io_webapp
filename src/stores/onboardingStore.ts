import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  UserRegistrationFormPersonalSchemaType,
  UserRegistrationFormAuthoritySchemaType,
} from '../components/onboarding/UserRegistrationForm';

export interface OnboardingState {
  identity?: 'personal' | 'authority';
  passphrase: string[];
  privateKey?: Buffer;
  publicKey?: Buffer;
  walletAddress?: string;
  privateData?:
    | UserRegistrationFormPersonalSchemaType
    | UserRegistrationFormAuthoritySchemaType;
  isAuthenticated: boolean;

  // FIXME: Remove later
  encryptedMessage?: string;
  setEncryptedMessage: (encryptedMessage: string) => void;

  setIdentity: (identity: 'personal' | 'authority') => void;
  setPassphrase: (passphrase: string[]) => void;
  setPrivateKey: (privateKey: Buffer) => void;
  setPublicKey: (publicKey: Buffer) => void;
  setWalletAddress: (walletAddress: string) => void;
  setPrivateData: (
    privateData:
      | UserRegistrationFormPersonalSchemaType
      | UserRegistrationFormAuthoritySchemaType,
  ) => void;
  updatePrivateData<
    T extends
      | UserRegistrationFormPersonalSchemaType
      | UserRegistrationFormAuthoritySchemaType,
    K extends keyof T,
  >(
    this: void,
    key: K,
    value: T[K],
  ): void;
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
      updatePrivateData: (key, value) =>
        set((state) => {
          console.log('state', state);
          if (state.privateData) {
            return {
              privateData: {
                ...state.privateData,
                [key]: value,
              },
            };
          }
          return {
            privateData: {
              fullName: '', // FIXME: Figure out a way to not use this trick
              [key]: value,
            },
          };
        }),
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
    }),
    {
      name: 'onboardingStore',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ identity: state.identity }),
    },
  ),
);
