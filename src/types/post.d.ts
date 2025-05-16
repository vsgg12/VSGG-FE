type IIngameInfoRequestType = {
  championName: string;
  position: string;
  tier: string;
};

type IPostWriteType = {
  uploadVideos?: File;
  thumbnailImage: File;
  content: string;
  postAddRequest: IPostAddRequestType;
};

type IPostAddRequestType = {
  title: string;
  type?: "LINK" | "FILE";
  videoType?: "LINK" | "FILE"
  hashtag: string[];
  inGameInfoRequests: {
    championName: string;
    position: string;
    tier: string;
  }[];
  videoLink?: string;
  voteEndDate: string;
}

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