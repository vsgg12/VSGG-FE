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
  resetPostVoteState: () => void;
}

const initialPostVoteState = {
  voteResult: [],
  setVoteResult: (vote: number[]) => set({ voteResult: vote }),
  votingGraph: Array(10).fill(-1),
  setVotingGraph: (graph: number[]) => set({ votingGraph: graph }),
  postVoteResult: [],
  selectedChampIdx: 0,
  isNotAbleSubmit: true,
};

const usePostIdStore = create<PostIdStore>((set) => ({
  ...initialPostVoteState,
  setVoteResult: (vote: number[]) => set({ voteResult: vote }),
  setVotingGraph: (graph: number[]) => set({ votingGraph: graph }),
  setPostVoteResult: (vote: IVoteType[]) => set({ postVoteResult: vote }),
  setSelectedChampIdx: (idx: number) => set({ selectedChampIdx: idx }),
  setIsNotAbleSubmit: (state: boolean) => set({ isNotAbleSubmit: state }),
  resetPostVoteState: () => set(initialPostVoteState),
}));

export default usePostIdStore;
