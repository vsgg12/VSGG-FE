import { immer } from 'zustand/middleware/immer';
import { Setter, createSetDataImmer } from '../zustandTypes';
import { create } from 'zustand';

export type InGameInfoRequestType = {
  championName: string;
  tier: string;
  position: string;
}

export type PostAddRequestType = {
  title: string;
  type: "LINK" | "FILE" | null;
  videoType: "LINK" | "FILE" | null;
  inGameInfoRequests: {
    championName: string;
    position: string;
    tier: string;
  }[];
  videoLink: string | null;
  voteEndDate: string;
}

interface IWriteField {
  selectedMethod: '파일 첨부' | '유튜브 링크' | null;
  postRequestData: PostAddRequestType;
  thumbnail: Blob | undefined;
  isLoading: boolean;
  uploadVideos: File | undefined;
  isSelectJudgeTypeScreenShow: boolean;
  content: string;
}

interface IWriteState extends IWriteField {
  setData: Setter<IWriteField>;
  setInGameInfoRequestData: <K extends keyof InGameInfoRequestType>(
  index: number,
    key: K,
  value: InGameInfoRequestType[K]
  ) => void;
  setPostRequestData: <K extends keyof PostAddRequestType>(
    key: K,
  value: PostAddRequestType[K]
) => void;
  clearAll: () => void;
}

export const useWriteStore = create<IWriteState>()(
  immer((set) => ({
    selectedMethod: null,
    postRequestData: {
      title: "",
      type: null,
      videoType: null,
      videoLink: null,
      voteEndDate: "",
      inGameInfoRequests:[],
    },
    thumbnail: undefined,
    isLoading: false,
    isSelectJudgeTypeScreenShow: false,
    content: "",

    setData: createSetDataImmer<IWriteField>(set),

    setInGameInfoRequestData: (index, key, value) =>
  set((state) => {
    state.postRequestData.inGameInfoRequests[index][key] = value;
  }),

  setPostRequestData: (key, value) => 
    set((state) => {
      state.postRequestData[key] = value
    }),

    clearAll: () =>
      set((state) => {
        state.isLoading = false;
        state.isSelectJudgeTypeScreenShow = false;
        state.selectedMethod = null;
        state.thumbnail = undefined;
        state.content="";
        state.postRequestData = {
          title: '',
          type: null,
          videoType: null,
          videoLink: null,
          voteEndDate: '',
          inGameInfoRequests: [],
        };
      })
  })),
);
