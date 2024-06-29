import { create } from 'zustand';

interface ICommentStore {
  commentContent: string | null;
  setCommentContent: (comment: string | null) => void;
  parentId: number | null;
  setParentId: (id: number | null) => void;
  isCommentInProgress: boolean;
  setIsCommentInProgress: (state: boolean) => void;
}

const useCommentStore = create<ICommentStore>((set) => ({
  commentContent: null,
  setCommentContent: (comment: string | null) => set({ commentContent: comment }),
  parentId: null,
  setParentId: (id: number | null) => set({ parentId: id }),
  isCommentInProgress: false,
  setIsCommentInProgress: (state: boolean) => set({ isCommentInProgress: state }),
}));

export default useCommentStore;
