// 메인 페이지
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
  inGameInfoList: GetGameInfoType[];
  isVote: boolean;
  inGameInfoList: GetGameInfoType[];
};

type GetVideoType = {
  url: string;
  type: string;
};

type GetMemberDTOType = {
  token: string | null;
  email: string;
  nickname: string;
  age: string;
  gender: string;
  mobile: string;
  profileImage: string | null;
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

type GetGameInfoType = {
  inGameInfoId: number;
  tier: string;
  position: string;
  championName: string;
};

// 게시물 상세 조회 페이지
type GetPostItemType = {
  resultCode: number;
  resultMsg: string;
  postDTO: GetPostDTOType;
};

// 댓글 조회 (게시물 상세 조회 페이지)
type GetCommentListType = {
  resultCode: number;
  resultMsg: string;
  comments: GetCommentItemType[];
};

// 수정해야함
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

// 알람 확인
type GetAlarmConfirmType = {
  createdDateTime: string;
  modifyDateTime: string;
  id: number;
  memberName: string;
  memberTier: string;
  alarmContents: string;
  alarmType: string;
};
