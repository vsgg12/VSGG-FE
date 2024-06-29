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

export default async function PostSignUp(body: IPostSignUp) {
  const data = await api.post({
    endpoint: '/users/signup',
    body,
  });
  return data;
}
