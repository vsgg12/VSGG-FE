import { createSetDataImmer, Setter } from '@/store/zustandTypes';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export type TempItemType = {
  id: number;
  title: string;
  updatedAt: string;
  judgeType: '과실' | '주장';
};

export interface ITempField {
  list: TempItemType[];
  selectedTempId: number | null;
  tempNum: number;
  tempModalOpen: boolean;
  loadTempDetailModalOpen: boolean;
  deleteTempItemModalOpen: boolean;
}

interface ITempState extends ITempField {
  setData: Setter<ITempField>;
  fetchAllTempList: () => Promise<void>;
  deleteTempItem: (id: number) => void;
}

export const useTempStore = create<ITempState>()(
  immer((set) => ({
    list: [],
    selectedTempId: null,
    tempNum: 0,
    tempModalOpen: false,
    loadTempDetailModalOpen: false,
    deleteTempItemModalOpen: false,

    setData: createSetDataImmer<ITempField>(set),

    fetchAllTempList: async () => {
      // 임시저장 목록 불러오는 api 호출
      // 일단 임시로 목데이터 세팅
      set((state) => {
        state.list = [
          {
            id: 1,
            title: '일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십',
            updatedAt: '2025-09-30T10:49:41.877407',
            judgeType: '과실',
          },
          {
            id: 2,
            title: '일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십',
            updatedAt: '2025-10-29T15:21:41.877407',
            judgeType: '주장',
          },
        ];
        state.tempNum = state.list.length;
      });
    },

    deleteTempItem: (id: number) => {
      // 임시저장 항목 삭제 api 호출 후 다시 전체 목록 fetch
      // 일단 임시로 filter
      set((state) => {
        state.list = state.list.filter((item) => item.id !== id);
      });
    },
  })),
);
