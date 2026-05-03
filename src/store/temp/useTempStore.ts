import { createSetDataImmer, Setter } from '@/store/zustandTypes';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { DeleteTemp, GetTempDetail, GetTempList, PostTempOrPost } from '@/api/write/temp/tempApi';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import { toast } from 'react-hot-toast';
import { IWriteField, useWriteStore } from '@/store/write/useWriteStore';
import { YOUTUBE_REGEX } from '@/constants/regex';
import htmlToEditorText from '@/utils/write/content/htmlToEditorText';
import { getFormattedDateAfterDays, getOriginalDaysDiff } from '@/utils/formatDate';

export type TempItemSummaryType = {
  id: number;
  title: string;
  savedAt: string;
  category: 'FAULT' | 'CHAMPION';
};

export interface ITempField {
  list: TempItemSummaryType[];
  selectedTempId: number | null;
  tempNum: number;
  tempModalOpen: boolean;
  loadTempDetailModalOpen: boolean;
  deleteTempItemModalOpen: boolean;
  isLoading: boolean;
}

interface ITempState extends ITempField {
  setData: Setter<ITempField>;

  createTemp: (body: FormData) => Promise<number>;
  getAllTempSummaryList: () => Promise<void>;
  getTempDetail: (postId: number) => Promise<string>;
  publishTemp: ({ body, postId }: { body: FormData; postId: string }) => Promise<number>;
  deleteTemp: (postId: number) => Promise<void>;
  updateTemp: ({ body, postId }: { body: FormData; postId: string }) => Promise<void>;
}

export const useTempStore = create<ITempState>()(
  immer((set, get) => ({
    list: [],
    selectedTempId: null,
    tempNum: 0,
    tempModalOpen: false,
    loadTempDetailModalOpen: false,
    deleteTempItemModalOpen: false,
    isLoading: false,

    setData: createSetDataImmer<ITempField>(set),

    createTemp: async (body) => {
      try {
        const token = useAuthStore.getState().accessToken;

        set({ isLoading: true });

        const postId = await PostTempOrPost({ body, token });

        await get().getAllTempSummaryList();
        toast.success('임시저장이 완료되었습니다.');
        return postId;
      } catch (error) {
        console.error('임시저장글 생성 실패:', error);
        toast.error('임시저장에 실패했습니다.');
        throw error;
      } finally {
        set({ isLoading: false });
      }
    },

    getAllTempSummaryList: async () => {
      try {
        const token = useAuthStore.getState().accessToken;

        set({ isLoading: true });

        const posts = await GetTempList(token);

        set({ list: posts, tempNum: posts.length });
      } catch (error) {
        console.error('임시저장 목록 조회 실패:', error);
        toast.error('임시저장 목록을 불러오는데 실패했습니다');
        throw error;
      } finally {
        set({ isLoading: false });
      }
    },

    getTempDetail: async (postId) => {
      try {
        const token = useAuthStore.getState().accessToken;

        set({ isLoading: true });

        const post: IPostWriteOrTempType = await GetTempDetail({ postId, token });

        const { uploadVideos, content, postAddRequest, thumbnailImage, id, savedAt } = post;
        const { title, videoType, videoLink, voteEndDate, category, inGameInfoRequests } =
          postAddRequest;
        const videoId = videoLink ? videoLink.match(YOUTUBE_REGEX)?.[4] : '';

        // 임시저장 당시 설정했던 일수 계산 (기본값 1)
        const diffDays = getOriginalDaysDiff(savedAt!, voteEndDate!);

        // '오늘'을 기준으로 계산된 일수(diffDays)만큼 더하여 새로운 마감일 생성
        const newVoteEndDate = getFormattedDateAfterDays(diffDays);

        const writeFormData: Partial<IWriteField> = {
          selectedMethod: videoType === 'FILE' ? '파일 첨부' : '유튜브 링크',
          postAddRequest: {
            title: title ?? '',
            videoType: videoType,
            inGameInfoRequests: inGameInfoRequests.map((item, idx) => ({
              inGameInfoId: item.inGameInfoId ?? idx,
              championName: item.championName ?? '',
              position: item.position ?? '',
              tier: item.tier ?? '',
              claim: item.claim ?? '',
            })),
            videoLink: videoLink ?? '',
            draft: true,
            category: category,
            voteEndDate: newVoteEndDate ?? '',
          },
          id: id ?? null,
          thumbnail: thumbnailImage ? new Blob([thumbnailImage], { type: 'image/jpeg' }) : null,
          isLoading: false,
          uploadVideos: uploadVideos,
          isSelectCategoryScreenShow: false,
          content: content ? htmlToEditorText(content) : '',
          videoId: videoId,
          errMsg: '',
        };

        set({ selectedTempId: postId, loadTempDetailModalOpen: false, tempModalOpen: false });
        useWriteStore.getState().updateWriteFields(writeFormData);
        toast.success('임시저장된 글을 불러왔습니다.');

        return category ?? '';
      } catch (error) {
        console.error('임시저장 상세 조회 실패:', error);
        toast.error('상세 정보를 불러오는데 실패했습니다.');
        throw error;
      } finally {
        set({ isLoading: false, loadTempDetailModalOpen: false, tempModalOpen: false });
      }
    },

    updateTemp: async ({ body, postId }) => {
      try {
        const token = useAuthStore.getState().accessToken;

        set({ isLoading: true });

        await PostTempOrPost({ body, postId, token });

        await get().getAllTempSummaryList();
        toast.success('임시 저장글 수정에 성공했습니다.');
      } catch (error) {
        console.error('임시저장 글 수정 실패:', error);
        toast.error('임시저장 글 수정에 실패했습니다.');
        throw error;
      } finally {
        set({ isLoading: false });
      }
    },

    publishTemp: async ({ postId, body }) => {
      try {
        const token = useAuthStore.getState().accessToken;
        set({ isLoading: true });

        const newPostId = await PostTempOrPost({ postId, token, body });

        await get().getAllTempSummaryList();
        toast.success('글 발행에 성공했습니다.');
        return newPostId;
      } catch (error) {
        console.error('임시저장 글 발행 실패:', error);
        toast.error('글 발행에 실패했습니다.');
        throw error;
      } finally {
        set({ isLoading: false });
      }
    },

    deleteTemp: async (postId) => {
      try {
        const token = useAuthStore.getState().accessToken;
        set({ isLoading: true });

        await DeleteTemp({ postId, token });

        await get().getAllTempSummaryList();
        set({ deleteTempItemModalOpen: false });
        toast.success('임시저장된 글이 삭제되었습니다.');
      } catch (error) {
        console.error('임시저장 글 삭제 실패:', error);
        toast.error('임시저장 글 삭제에 실패했습니다.');
        throw error;
      } finally {
        set({ isLoading: false });
      }
    },
  })),
);
