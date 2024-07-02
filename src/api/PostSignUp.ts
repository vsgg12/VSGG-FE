import api from '@/_lib/fetcher';

interface IPostSignUp {
  email: string;
  profileImage: string | null;
  nickname: string;
  agrees: {
    agreeAge: boolean;
    agreeTerms: boolean;
    agreePrivacy: boolean;
    agreePromotion: boolean;
  };
}

type IPostSignUpType = {
  resultCode: number;
  resultMsg: string;
  accessToken: string;
  refreshToken: string;
};

export default async function PostSignUp(body: IPostSignUp) {
  const data = await api.post<IPostSignUp, IPostSignUpType>({
    endpoint: '/users/signup',
    body,
  });
  return data;
}
