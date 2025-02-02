// 메인 페이지
type IGetPostListType = {
  resultCode: number;
  resultMsg: string;
  postDTO: IGetPostDTOType[];
};

type IGetPostDTOType = {
  id: number;
  title: string;
  content: string;
  thumbnailURL: string;
  viewCount: number;
  status: string | 'PROGRESS' | 'FINISHED';
  video: IGetVideoType;
  memberDTO: IGetMemberDTOType;
  createdAt: string;
  updatedAt: string;
  hashtagList: IHashTagListType[];
  inGameInfoList: IGetInGameInfoType[];
  isVote: boolean;
  isDeleted: 'TRUE' | 'FALSE';
  daysUntilEnd: number;
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

// 게시물 상세 조회 페이지
type IGetPostItemType = {
  resultCode: number;
  resultMsg: string;
  postDTO: IGetPostDTOType;
};

// 댓글 조회 (게시물 상세 조회 페이지)
type IGetCommentListType = {
  resultCode: number;
  resultMsg: string;
  comments: IGetCommentItemType[];
};

type IGetCommentItemType = {
  id: number;
  content: string;
  member: IGetMemberDTOType;
  createdDateTime: string;
  parentMemberNickname: string | null;
  children?: IGetCommentItemType[];
};

type IGetVoteType = {
  championName: string;
  votedRatio: number;
  position: string;
  tier: string;
};

type IGetInGameInfoType = {
  averageRatio: number | null;
  championName: string;
  inGameInfoId: number;
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
  createdDateTime: string;
};

type IGetMyPostsType = {
  pageInfo: IGetPageInfo;
  postList: IGetMyPostItemsType[];
};

type IGetPageInfo = {
  size: nunmber;
  page: number;
  totalPageNum: number;
};

type IGetMyPostItemsType = {
  id: number;
  title: string;
  commentNum: number;
  voteStatus: string;
  createdDate: string;
};

type IGetMyPageType = {
  resultCode: number;
  resultMsg: string;
  memberProfileDTO: IMemperProfileDTOType;
};

type IMemperProfileDTOType = {
  id: number;
  nickName: string;
  point: number;
  joinedResult: number;
  nextJoinedResult: number;
  predicateResult: number;
  nextPredicateResult: number;
  tier: string;
  nextTier: string;
  profileUrl: string;
};

type IGetMyJudgeType = {
  pageInfo: IGetPageInfo;
  postList: IVotedPostItem[];
};

type IVotedPostItem = {
  id: number;
  title: string;
  authorNickname: string;
  voteStatus: string;
  myVoteResult: string | null;
  createdDate: string;
  authorTier: string;
};
