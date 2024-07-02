import { create } from 'zustand';

interface ISearchStore {
  keyword: string;
  setKeyword: (word: string) => void;
}

const useSearchStore = create<ISearchStore>((set) => ({
  keyword: '',
  setKeyword: (word: string) => set({ keyword: word }),
}));

export default useSearchStore;
