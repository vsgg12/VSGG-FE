import { create } from 'zustand';

interface HomeState {
  activeButton: string;
  setActiveButton: (value: string) => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (value: boolean) => void;
  isListed: boolean;
  setIsListed: (value: boolean) => void;
  postIndex: number;
  setPostIndex: (index: number) => void;
  visiblePosts: IGetPostDTOType[];
  setVisiblePosts: (posts: IGetPostDTOType[]) => void;
  existData: IGetPostDTOType[];
  setExistData: (data: IGetPostDTOType[]) => void;
  toggleLoginModal: () => void;
  toggleListed: () => void;
}

export const useHomeStore = create<HomeState>((set) => ({
  activeButton: 'createdatetime',
  setActiveButton: (value) => set({ activeButton: value }),
  isLoginModalOpen: false,
  setIsLoginModalOpen: (value) => set({ isLoginModalOpen: value }),
  isListed: false,
  setIsListed: (value) => set({ isListed: value }),
  postIndex: 5,
  visiblePosts: [] as IGetPostDTOType[],
  setVisiblePosts: (posts) => set({ visiblePosts: posts }),
  existData: [],
  toggleLoginModal: () => set((state) => ({ isLoginModalOpen: !state.isLoginModalOpen })),
  toggleListed: () => set((state) => ({ isListed: !state.isListed })),
  setPostIndex: (index) => set({ postIndex: index }),
  setExistData: (data) => set({ existData: data }),
}));
