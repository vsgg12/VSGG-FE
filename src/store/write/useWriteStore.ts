import { immer } from 'zustand/middleware/immer';
import { createSetDataImmer, Setter } from '../zustandTypes';
import { create } from 'zustand';
import { PostTempOrPost } from '@/api/write/temp/tempApi';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import { toast } from 'react-hot-toast';

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
  id: string; // 챔피언 영어 이름
  name: string; // 챔피언 한국 이름
  image: string; // 얼굴만 나온 이미지
  fullImage: string; // 전체 이미지
};

export type InGameInfoRequestType = {
  championName: string;
  tier: string;
  position: string;
  claim?: string;
};

export type InGameInfoItem = InGameInfoRequestType & {
  inGameInfoId: number;
};

export type PostAddRequestType = {
  title: string;
  videoType: 'LINK' | 'FILE' | null;
  inGameInfoRequests: InGameInfoItem[];
  // 백엔드에 보낼때는 https://www.youtube.com/embed/${videoId}로 보내야함
  videoLink: string;
  voteEndDate: string; // YYYYMMDD
  draft: boolean;
  category: 'FAULT' | 'CHAMPION' | null;
};

export interface IWriteField {
  id?: number | null;
  selectedMethod: '파일 첨부' | '유튜브 링크' | null;
  postAddRequest: PostAddRequestType;
  thumbnail: Blob | null;
  isLoading: boolean;
  uploadVideos: File | null;
  isSelectCategoryScreenShow: boolean;
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
  setPostAddRequest: <K extends keyof PostAddRequestType>(
    key: K,
    value: PostAddRequestType[K],
  ) => void;
  addInGameInfoRequestItem: () => void;
  removeInGameInfoRequestItem: (index: number) => void;
  clearAll: () => void;
  fetchAllChampions: () => Promise<void>;
  createNewPost: (body: FormData) => Promise<number>;
  updateWriteFields: (fields: Partial<IWriteField>) => void;
}

export const useWriteStore = create<IWriteState>()(
  immer((set) => ({
    selectedMethod: null,
    id: null,

    postAddRequest: {
      title: '',
      videoType: null,
      videoLink: '',
      voteEndDate: '',
      draft: false,
      category: null,
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
    thumbnail: null,
    isLoading: false,
    isSelectCategoryScreenShow: false,
    content: '',
    videoId: '',
    uploadVideos: null,
    allChampions: [],
    errMsg: '',

    setData: createSetDataImmer<IWriteField>(set),

    setInGameInfoRequestData: (index, key, value) =>
      set((state) => {
        const item = state.postAddRequest.inGameInfoRequests[index];
        (item as InGameInfoRequestType)[key] = value;
      }),

    setPostAddRequest: (key, value) =>
      set((state) => {
        state.postAddRequest[key] = value;
      }),

    addInGameInfoRequestItem: () =>
      set((state) => {
        const nextId =
          state.postAddRequest.inGameInfoRequests.length > 0
            ? Math.max(
                ...state.postAddRequest.inGameInfoRequests.map((item) => item.inGameInfoId),
              ) + 1
            : 0;

        state.postAddRequest.inGameInfoRequests.push({
          inGameInfoId: nextId,
          championName: '',
          position: '',
          tier: '',
        });
      }),

    removeInGameInfoRequestItem: (index: number) =>
      set((state) => {
        const list = state.postAddRequest.inGameInfoRequests;

        // 최소 2개 유지
        if (list.length <= 2) return;

        list.splice(index, 1);
      }),

    clearAll: () =>
      set((state) => {
        state.id = null;
        state.isLoading = false;
        state.isSelectCategoryScreenShow = false;
        state.selectedMethod = null;
        state.thumbnail = null;
        state.content = '';
        state.postAddRequest = {
          title: '',
          videoType: null,
          videoLink: '',
          voteEndDate: '',
          draft: false,
          category: null,
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
        state.uploadVideos = null;
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
              id: champion.id,
              name: champion.name,
              image: `https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/${champion.image.full}`,
              fullImage: `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`,
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

    createNewPost: async (body) => {
      try {
        const token = useAuthStore.getState().accessToken;
        set({ isLoading: true });

        const postId = await PostTempOrPost({ body, token });
        console.log('postId:', postId);

        toast.success('게시글 등록이 완료되었습니다.');

        return postId;
      } catch (error) {
        console.error('게시글 생성 실패:', error);
        toast.error('게시글 등록에 실패하였습니다.');
        throw error;
      } finally {
        set({ isLoading: false });
      }
    },

    updateWriteFields: (fields) =>
      set((state) => {
        Object.assign(state, fields);
      }),
  })),
);
