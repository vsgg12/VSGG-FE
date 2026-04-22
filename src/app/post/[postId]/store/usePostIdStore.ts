import { create } from 'zustand';

interface PostIdStore {
  voteResult: number[];
  setVoteResult: (voteResult: number[]) => void;
  votingGraph: number[];
  setVotingGraph: (graph: number[]) => void;
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
  votingGraph: Array(10).fill(-1),
  setVotingGraph: (graph: number[]) => set({ votingGraph: graph }),
  postVoteResult: [],
  setPostVoteResult: (vote: IVoteType[]) => set({ postVoteResult: vote }),
  selectedChampIdx: 0,
  setSelectedChampIdx: (idx: number) => set({ selectedChampIdx: idx }),
  isNotAbleSubmit: true,
  setIsNotAbleSubmit: (state: boolean) => set({ isNotAbleSubmit: state }),
}));

export default usePostIdStore;
