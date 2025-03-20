type IIngameInfoRequestType = {
  championName: string;
  position: string;
  tier: string;
};

type IPostWriteType = {
  uploadVideos: File | undefined;
  thumbnailImage: File | undefined;
  postAddRequest: {
    title: string;
    type: string;
    hashtag: string[];
  };
  content: string;
  inGameInfoRequest: {
    championName: string;
    position: string;
    tier: string;
  }[];
  videoUrl: string;
  voteEndDate: string;
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
