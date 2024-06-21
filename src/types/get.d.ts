type GetPostListType = {
  resultCode: number;
  resultMsg: string;
  postDTO: GetPostDTOType[];
};

type GetPostDTOType = {
  id: number;
  title: string;
  content: string;
  thumbnailURL: string;
  viewCount: number;
  status: string;
  video: GetVideoType;
  memberDTO: GetMemberDTOType;
  createdAt: string;
  updatedAt: string;
  hashtagList: GetHashTagListType[];
  isVote: boolean;
};

type GetVideoType = {
  url: string;
  type: string;
};

type GetMemberDTOType = {
  token: string;
  email: string;
  nickname: string;
  age: string;
  gender: string;
  mobile: string;
  profileImage: string;
  tier: string;
  agreeAge: boolean;
  agreeTerms: boolean;
  agreePrivacy: boolean;
  agreePromotion: boolean;
};

type GetHashTagListType = {
  id: number;
  name: string;
};

type GetPostItemType = {
  resultCode: number;
  resultMsg: string;
  postDTO: GetPostDTOType[];
  inGameInfo: GetGameInfoType[];
};

type GetGameInfoType = {
  inGameInfoId: number;
  tier: string;
  position: string;
  championName: string;
};

type GetCommentListType = {
  resultCode: number;
  resultMsg: string;
  comments: GetCommentItemType[];
};

type GetCommentItemType = {
  id: number;
  content: string;
  member: GetMemberDTOType;
};

type GetVoteType = {
  ingameInfoId: number;
  ratio: number;
};

type GetAVGType = {
  championName: string;
  averageValue: number;
  position: string;
  tier: string;
};

type GetAlarmConfirmType = {
  createdDateTime: string;
  modifyDateTime: string;
  id: number;
  memberName: string;
  memberTier: string;
  alarmContents: string;
  alarmType: string;
};
