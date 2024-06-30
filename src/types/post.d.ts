type IIngameInfoRequestType = {
  champion: string;
  position: string;
  tier: string;
};

type IPostWriteType = {
  uploadVideos: File;
  thumbnailImage: File;
  postAddRequest: IIngameInfoRequestType[];
  InGameInfoRequest: {
    championName: string;
    position: string;
    tier: string;
  }[];
  videoUrl: string;
};

type IVoteType = {
  ingameInfoId: number;
  ratio: number;
};
