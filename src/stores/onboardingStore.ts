import { create } from 'zustand';
import { UserRegistrationFormSchemaType } from '../components/UserRegistrationForm';

export interface OnboardingState {
  identity?: 'personal' | 'authority';
  passphrase?: string[];
  formData?: UserRegistrationFormSchemaType;

  setIdentity: (identity: 'personal' | 'authority') => void;
  setPassphrase: (passphrase: string[]) => void;
  setFormData: (formData: UserRegistrationFormSchemaType) => void;
}

export const useOnboardingStore = create<OnboardingState>()((set) => ({
  identity: undefined,
  passphrase: undefined,
  formData: undefined,
  setIdentity: (identity) => set({ identity }),
  setPassphrase: (passphrase) => set({ passphrase }),
  setFormData: (formData) => set({ formData }),
}));
