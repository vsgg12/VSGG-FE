type IPatchEditPostRequestBodyType = {
  uploadVideos?: File;
  thumbnailImage?: File;
  postAddRequest?: {
    title?: string;
    type?: string;
    hashtag?: string[];
  };
  content?: string;
  inGameInfoRequest?: {
    inGameInfoId: string;
    tier: string;
  }[];
  videoUrl?: string;
  voteEndDate?: string;
};
