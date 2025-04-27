// import api from '@/_lib/fetcher';

// export default async function postSocialLogin(
//   body: IPostLoginRequestType,
//   socialLoginType: 'google' | 'kakao' | 'naver',
// ) {
//   const data = await api.post<IPostLoginRequestType, IPostLoginType>({
//     endpoint: `/auth/${socialLoginType}/callback`,
//     body,
//   });
//   return data;
// }

export default async function postSocialLogin(
  body: IPostLoginRequestType,
  socialLoginType: 'google' | 'kakao' | 'naver',
) {
  const request = new Request(
    `${process.env.NEXT_PUBLIC_PROXY_URL}/auth/${socialLoginType}/callback`,
    {
      method: 'GET',
      body: JSON.stringify(body),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );
  try {
    const response = await fetch(request);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.resultMsg || 'Social login failed');
    }
    const data: IPostLoginType = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
