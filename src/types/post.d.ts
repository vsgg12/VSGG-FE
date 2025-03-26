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
  type: "LINK" | "FILE";
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
