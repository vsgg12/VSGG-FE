type IPatchEditPostRequestBodyType = {
  uploadVideos?: File;
  thumbnailImage?: File;
  postUpdateRequest?: IEditPostUpdateRequest;
  content?: string;
  videoUrl?: string;
};

type IEditPostUpdateRequest = {
  title?: string;
  type?: string;
  hashtag?: string[];
  videoLink?: string;
  InGameTierUpdateRequest? : IEditInGameInfoRequest[]
}

type IEditInGameInfoRequest = {
  inGameInfoId: string;
  tier: string;
};
