import { immer } from 'zustand/middleware/immer';
import { createSetDataImmer, Setter } from '../zustandTypes';
import { create } from 'zustand';

export const VOTE_END_TIME_OPTIONS = [
  { label: '1일', value: 1 },
  { label: '2일', value: 2 },
  { label: '4일', value: 4 },
  { label: '7일', value: 7 },
  { label: '14일', value: 14 },
  { label: '20일', value: 20 },
  { label: '30일', value: 30 },
];

export type ChampionType = {
  name: string;
  image: string;
};

export type InGameInfoRequestType = {
  championName: string;
  tier: string;
  position: string;
};

export type PostAddRequestType = {
  title: string;
  videoType: 'LINK' | 'FILE' | null;
  inGameInfoRequests: {
    inGameInfoId: number; // 백엔드로 보낼때는 이거 안보내야함
    championName: string;
    position: string;
    tier: string;
  }[];
  // 백엔드에 보낼때는 https://www.youtube.com/embed/${videoId}로 보내야함
  videoLink: string;
  voteEndDate: string; // YYYYMMDD
};

export interface IWriteField {
  selectedMethod: '파일 첨부' | '유튜브 링크' | null;
  postRequestData: PostAddRequestType;
  thumbnail: Blob | undefined;
  isLoading: boolean;
  uploadVideos: File | undefined;
  isSelectJudgeTypeScreenShow: boolean;
  content: string;
  videoId: string; // 유투브 영상 iframe 렌더링을 위한 비디오 ID
  allChampions: ChampionType[];
  errMsg: string;
}

interface IWriteState extends IWriteField {
  setData: Setter<IWriteField>;
  setInGameInfoRequestData: <K extends keyof InGameInfoRequestType>(
    index: number,
    key: K,
    value: InGameInfoRequestType[K],
  ) => void;
  setPostRequestData: <K extends keyof PostAddRequestType>(
    key: K,
    value: PostAddRequestType[K],
  ) => void;
  addInGameInfoRequestItem: () => void;
  removeInGameInfoRequestItem: (index: number) => void;
  clearAll: () => void;
  fetchAllChampions: () => Promise<void>;
}

export const useWriteStore = create<IWriteState>()(
  immer((set) => ({
    selectedMethod: null,
    postRequestData: {
      title: '',
      videoType: null,
      videoLink: '',
      voteEndDate: '',
      inGameInfoRequests: [
        {
          inGameInfoId: 0,
          championName: '',
          position: '',
          tier: '',
        },
        {
          inGameInfoId: 1,
          championName: '',
          position: '',
          tier: '',
        },
      ],
    },
    thumbnail: undefined,
    isLoading: false,
    isSelectJudgeTypeScreenShow: false,
    content: '',
    videoId: '',
    uploadVideos: undefined,
    allChampions: [],
    errMsg: '',

    setData: createSetDataImmer<IWriteField>(set),

    setInGameInfoRequestData: (index, key, value) =>
      set((state) => {
        state.postRequestData.inGameInfoRequests[index][key] = value;
      }),

    setPostRequestData: (key, value) =>
      set((state) => {
        state.postRequestData[key] = value;
      }),

    addInGameInfoRequestItem: () =>
      set((state) => {
        const nextId =
          state.postRequestData.inGameInfoRequests.length > 0
            ? Math.max(
                ...state.postRequestData.inGameInfoRequests.map((item) => item.inGameInfoId),
              ) + 1
            : 0;

        state.postRequestData.inGameInfoRequests.push({
          inGameInfoId: nextId,
          championName: '',
          position: '',
          tier: '',
        });
      }),

    removeInGameInfoRequestItem: (index: number) =>
      set((state) => {
        const list = state.postRequestData.inGameInfoRequests;

        // 최소 2개 유지
        if (list.length <= 2) return;

        list.splice(index, 1);
      }),

    clearAll: () =>
      set((state) => {
        state.isLoading = false;
        state.isSelectJudgeTypeScreenShow = false;
        state.selectedMethod = null;
        state.thumbnail = undefined;
        state.content = '';
        state.postRequestData = {
          title: '',
          videoType: null,
          videoLink: '',
          voteEndDate: '',
          inGameInfoRequests: [
            {
              inGameInfoId: 0,
              championName: '',
              position: '',
              tier: '',
            },
            {
              inGameInfoId: 1,
              championName: '',
              position: '',
              tier: '',
            },
          ],
        };
        state.uploadVideos = undefined;
        state.videoId = '';
      }),

    fetchAllChampions: async () => {
      try {
        const response = await fetch(
          'https://ddragon.leagueoflegends.com/cdn/15.24.1/data/ko_KR/champion.json',
        );

        const data = await response.json();

        const champions: ChampionType[] = Object.keys(data.data)
          .map((key) => {
            const champion = data.data[key];
            return {
              name: champion.name,
              image: `https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/${champion.image.full}`,
            };
          })
          .sort((a, b) => a.name.localeCompare(b.name, 'ko'));

        set((state) => {
          state.allChampions = champions;
        });
      } catch (error) {
        console.error('Error loading the champions:', error);
      }
    },
  })),
);
