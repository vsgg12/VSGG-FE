import api from '@/_lib/fetcher';

export default async function getSocialLogin(
  code: string,
  socialLoginType: 'google' | 'kakao' | 'naver',
) {
  const data = await api.get<IPostLoginType>({
    endpoint: `/auth/${socialLoginType}/callback?code=${code}`,
  });
  return data;
}
