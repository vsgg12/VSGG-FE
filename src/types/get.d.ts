// 메인 페이지
type IGetPostListType = {
  resultCode: number;
  resultMsg: string;
  postDTO: GetPostDTOType[];
};

type IGetPostDTOType = {
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
  hashtagList: IHashTagListType[];
  inGameInfoList: IGetGameInfoType[];
  isVote: boolean;
};

type IGetVideoType = {
  url: string;
  type: string;
};

type IGetMemberDTOType = {
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

type IHashTagListType = {
  id: number;
  name: string;
};

type IGetGameInfoType = {
  inGameInfoId: number;
  tier: string;
  position: string;
  championName: string;
};

// 게시물 상세 조회 페이지
type IGetPostItemType = {
  resultCode: number;
  resultMsg: string;
  postDTO: GetPostDTOType;
};

// 댓글 조회 (게시물 상세 조회 페이지)
type IGetCommentListType = {
  resultCode: number;
  resultMsg: string;
  comments: GetCommentItemType[];
};

interface ICommentType {
  id: number;
  content: string;
  member: GetMemberDTOType;
}

type IGetCommentItemType = {
  id: number;
  content: string;
  member: GetMemberDTOType;
  children?: ICommentType[];
};

type IGetVoteType = {
  ingameInfoId: number;
  ratio: number;
};

type IGetAVGType = {
  championName: string;
  averageValue: number;
  position: string;
  tier: string;
};

// 알람 확인
type IGetAlarmConfirmType = {
  resultCode: number;
  resultMsg: string;
  alarmList: IAlarmsType[];
};

type IAlarmsType = {
  alarmId: number;
  alarmContents: string;
  postId: number;
  commentContent: string;
  alarmType: 'POST' | 'COMMENT';
  isRead: boolean;
  createDateTime: string;
};
