export const post: GetPostDTOType[] = [
  {
    id: 1,
    title: '이건 title',
    content: '이건 content',
    thumbnailURL: '이건 thumbnailURL',
    viewCount: 1,
    status: '이건 status',
    video: {
      url: '이건 url',
      type: '이건 type',
    },
    memberDTO: {
      token: '이건 토큰',
      email: '이건 이메일',
      nickname: '이건 닉네임',
      age: '이건 나이',
      gender: '이건 성별',
      mobile: '이건 폰번호',
      profileImage: '이건 프로필 이미지',
      tier: '이건 티어',
      agreeAge: true,
      agreeTerms: true,
      agreePrivacy: true,
      agreePromotion: true,
    },
    createdAt: '이건 작성한 날짜',
    updatedAt: '이건 업데이트한 날짜',
    hashtagList: [
      {
        id: 0,
        name: '정재호',
      },
    ],
    isVote: true,
  },
];

export const commentData: GetCommentItemType[] = [
  {
    id: 0,
    content: '이건 내용',
    member: {
      token: '이건 토큰',
      email: '이건 이메일',
      nickname: '이건 닉네임',
      age: '이건 나이',
      gender: '이건 성별',
      mobile: '이건 폰번호',
      profileImage: '이건 프로필 이미지',
      tier: '이건 티어',
      agreeAge: true,
      agreeTerms: true,
      agreePrivacy: true,
      agreePromotion: true,
    },
  },
];
