import { create } from 'zustand';

interface PostIdStore {
  voteResult: number[];
  setVoteResult: (voteResult: number[]) => void;
  postVoteResult: IVoteType[];
  setPostVoteResult: (postVote: IVoteType[]) => void;
  selectedChampIdx: number;
  setSelectedChampIdx: (idx: number) => void;
  isNotAbleSubmit: boolean;
  setIsNotAbleSubmit: (able: boolean) => void;
}

const usePostIdStore = create<PostIdStore>((set) => ({
  voteResult: [],
  setVoteResult: (vote: number[]) => set({ voteResult: vote }),
  postVoteResult: [],
  setPostVoteResult: (vote: IVoteType[]) => set({ postVoteResult: vote }),
  selectedChampIdx: 0,
  setSelectedChampIdx: (idx: number) => set({ selectedChampIdx: idx }),
  isNotAbleSubmit: true,
  setIsNotAbleSubmit: (state: boolean) => set({ isNotAbleSubmit: state }),
}));

export default usePostIdStore;
