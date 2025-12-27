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
  videoType: "LINK" | "FILE" | null;
  inGameInfoRequests: {
    championName: string;
    position: string;
    tier: string;
  }[];
  // 백엔드에 보낼때는 https://www.youtube.com/embed/${videoId}로 보내야함
  videoLink: string;
  voteEndDate: string; // YYYYMMDD
}

export interface IWriteField {
  selectedMethod: '파일 첨부' | '유튜브 링크' | null;
  postRequestData: PostAddRequestType;
  thumbnail: Blob | undefined;
  isLoading: boolean;
  uploadVideos: File | undefined;
  isSelectJudgeTypeScreenShow: boolean;
  content: string;
  videoId: string; // 유투브 영상 iframe 렌더링을 위한 비디오 ID
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
      videoType: null,
      videoLink: "",
      voteEndDate: "",
      inGameInfoRequests: [],
    },
    thumbnail: undefined,
    isLoading: false,
    isSelectJudgeTypeScreenShow: false,
    content: "",
    videoId: "",
    uploadVideos: undefined,

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
        state.uploadVideos = undefined;
        state.videoId = "";
      })
  })),
);
