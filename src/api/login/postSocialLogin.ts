import api from '@/_lib/fetcher';

export default async function postSocialLogin(
  body: IPostLoginRequestType,
  socialLoginType: 'google' | 'kakao' | 'naver',
) {
  const data = await api.post<IPostLoginRequestType, IPostLoginType>({
    endpoint: `/auth/${socialLoginType}/callback`,
    body,
  });
  return data;
}
