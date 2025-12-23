import { immer } from 'zustand/middleware/immer';
import { Setter, createSetDataImmer } from '../zustandTypes';
import { create } from 'zustand';

interface IWriteField {
  selectedMethod: '파일 첨부' | '유튜브 링크' | null;
  uploadedVideo: File | undefined;
  thumbnail: Blob | undefined;
  videoLink: string;
  isLoading: boolean;
  isSelectJudgeTypeScreenShow: boolean;
}

interface IWriteState extends IWriteField {
  setData: Setter<IWriteField>;

  clearAll: () => void;
}

export const useWriteStore = create<IWriteState>()(
  immer((set) => ({
    selectedMethod: null,
    uploadedVideo: undefined,
    thumbnail: undefined,
    videoLink: '',
    isLoading: false,
    isSelectJudgeTypeScreenShow: false,

    setData: createSetDataImmer<IWriteField>(set),

    clearAll: () =>
      set((state) => {
        state.isLoading = false;
        state.isSelectJudgeTypeScreenShow = false;
        state.selectedMethod = null;
        state.thumbnail = undefined;
        state.uploadedVideo = undefined;
        state.videoLink = "";
      })
  })),
);
