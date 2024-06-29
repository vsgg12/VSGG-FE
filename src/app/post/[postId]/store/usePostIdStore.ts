import { create } from 'zustand';

interface PostIdStore {
  voteResult: number[];
  setVoteResult: (voteResult: number[]) => void;
  selectedChampIdx: number;
  setSelectedChampIdx: (idx: number) => void;
}

const usePostIdStore = create<PostIdStore>((set) => ({
  voteResult: [],
  setVoteResult: (vote: number[]) => set({ voteResult: vote }),
  selectedChampIdx: 0,
  setSelectedChampIdx: (idx: number) => set({ selectedChampIdx: idx }),
}));

export default usePostIdStore;
