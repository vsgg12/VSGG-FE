type IPatchEditPostRequestBodyType = {
  uploadVideos: File | null;
  thumbnailImage: File | null;
  postUpdateRequest: IEditPostUpdateRequest | null;
  content: string | null;
  videoUrl: string | null;
};

type IEditPostUpdateRequest = {
  title: string | null;
  type: string | null;
  hashtag: string[] | null;
  videoLink: string | null;
  inGameTierUpdateRequest: IEditInGameInfoRequest[] | null;
}

type IEditInGameInfoRequest = {
  inGameInfoId: string;
  tier: string;
};
