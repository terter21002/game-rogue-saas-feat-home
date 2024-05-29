import { create } from 'zustand';

interface DonateStore {
  donate: boolean;
  setDonate(value: boolean): void;
}

export const useDonate = create<DonateStore>((set) => ({
  donate: false,
  setDonate(value) {
    set({ donate: value });
  },
}));
