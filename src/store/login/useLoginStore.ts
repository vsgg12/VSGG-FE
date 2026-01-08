import { createSetDataImmer, Setter } from '@/store/zustandTypes';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export interface ILoginField {
  isLoginModalOpen: boolean;
}

interface ILoginState extends ILoginField {
  setData: Setter<ILoginField>;
  setIsLoginModalOpen: (isLoginModalOpen: boolean) => void;
}

export const useLoginStore = create<ILoginState>()(
  immer((set) => ({
    isLoginModalOpen: false,

    setData: createSetDataImmer<ILoginField>(set),
    setIsLoginModalOpen: (isLoginModalOpen: boolean) => set((state) => {
      state.isLoginModalOpen = isLoginModalOpen;
    }),
  }))
);
