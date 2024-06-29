import { create } from 'zustand';

interface ICommentStore {
  commentContent: string;
  setCommentContent: (comment: string) => void;
  parentId: number | null;
  setParentId: (id: number | null) => void;
  isCommentInProgress: boolean;
  setIsCommentInProgress: (state: boolean) => void;
}

const useCommentStore = create<ICommentStore>((set) => ({
  commentContent: '',
  setCommentContent: (comment: string) => set({ commentContent: comment }),
  parentId: null,
  setParentId: (id: number | null) => set({ parentId: id }),
  isCommentInProgress: false,
  setIsCommentInProgress: (state: boolean) => set({ isCommentInProgress: state }),
}));

export default useCommentStore;
