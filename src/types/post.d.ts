type IPostWriteType = {
  uploadVideos: File;
  thumbnailImage?: File;
  content: string;
  postAddRequest: IPostAddRequestType;
};

type IPostAddRequestType = {
  title: string;
  videoType: 'FILE' | 'LINK';
  inGameInfoRequests: IIngameInfoRequestType[];
  voteEndDate: string;
  videoLink: string;
  draft: boolean;
  category: 'FAULT' | 'CHAMPION';
};

type IPostWriteOrTempType = {
  id?: number;
  uploadVideos: File | null;
  thumbnailImage: File | null;
  content?: string;
  postAddRequest: IPostAddTempRequestType;
  savedAt?: string; //"2026.04.07 23:00"
};

type IPostAddTempRequestType = {
  title?: string;
  videoType: 'FILE' | 'LINK' | null;
  inGameInfoRequests: IIngameInfoRequestType[];
  voteEndDate?: string;
  videoLink?: string;
  draft?: boolean;
  category: 'FAULT' | 'CHAMPION' | null;
};

type IIngameInfoRequestType = {
  inGameInfoId?: number;
  championName: string;
  position: string;
  tier: string;
  claim?: string;
};

type IInGameInfoType = {
  inGameInfoId: number;
  championName: string;
  position: string;
  tier: string;
};

type IPostRefreshType = {
  resultCode: number;
  resultMsg: string;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
};
type IVoteType = {
  inGameInfoId: number;
  ratio: number;
};

// 로그인
type IPostLoginRequestType = {
  code: string | null;
  state?: string | null;
};

type IPostLoginType = {
  resultCode: number;
  resultMsg: string;
  email: string;
  profileImage: string;
  accessToken: string;
  refreshToken: string;
  nickname: string;
};
