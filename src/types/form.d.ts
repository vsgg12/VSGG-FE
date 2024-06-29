import ReactQuill, { Quill } from 'react-quill';

//회원가입 - 백엔드로 보내는 용
export interface ICreateMemberProps {
  token: string;
  email: string;
  nickname: string; //직접 작성
  age: string;
  gender: string;
  mobile: string;
  profileImage: string;
  agreeAge: boolean; //직접 동의
  agreeTerms: boolean; //직접 동의
  agreePrivacy: boolean; //직접 동의
  agreePromotion: boolean; //직접 동의
}

//게시글 작성 - form에서 입력된 데이터 받아오는 용
export interface ICreatePostFormProps {
  videoType: string;
  link: string;
  title: string;
  content: string;
  ingameInfo: [
    {
      champion: string;
      position: string;
      tier: string;
    },
  ];
}

interface inGameInfoRequests {
  position: string;
  tier: string;
  championName: string;
}

interface ICreatePostRequestProps {
  title: stirng;
  // content: string;
  type: string;
  hashtag: string[];
  ingameInfoRequests: inGameInfoRequests[];
  videoUrl: string;
}

//react-quill
export interface IWrappedComponent extends React.ComponentProps<typeof ReactQuill> {
  forwardedRef: LegacyRef<ReactQuill>;
}
