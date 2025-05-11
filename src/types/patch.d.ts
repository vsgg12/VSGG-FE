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
  inGameTierUpdateRequest? : IEditInGameInfoRequest[]
}

type IEditInGameInfoRequest = {
  inGameInfoId: string;
  tier: string;
};
