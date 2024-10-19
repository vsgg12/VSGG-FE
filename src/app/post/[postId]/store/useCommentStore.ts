import { create } from 'zustand';

interface ICommentStore {
  parentId: number | null;
  setParentId: (id: number | null) => void;
  isCommentInProgress: boolean;
  setIsCommentInProgress: (state: boolean) => void;
  isReplying: boolean;
  setIsReplying: (replying: boolean) => void;
}

const useCommentStore = create<ICommentStore>((set) => ({
  parentId: null,
  setParentId: (id: number | null) => set({ parentId: id }),
  isCommentInProgress: false,
  setIsCommentInProgress: (state: boolean) => set({ isCommentInProgress: state }),
  isReplying: false,
  setIsReplying: (replying: boolean) => set({ isReplying: replying }),
}));

export default useCommentStore;
