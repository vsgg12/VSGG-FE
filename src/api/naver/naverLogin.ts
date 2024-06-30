import api from '@/_lib/fetcher';

interface INaverLogin {
  code: string | null;
  state: string | null;
}

type IPostLoginType = {
  resultCode: number;
  resultMsg: string;
  email: string;
  profileImage: string;
  accessToken: string;
  refreshToken: string;
  nickname: string;
};

export default async function NaverLogin(body: INaverLogin) {
  const data = await api.post<INaverLogin, IPostLoginType>({ endpoint: `/oauth/signin`, body });
  return data;
}
