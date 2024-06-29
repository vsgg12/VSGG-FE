import api from '@/_lib/fetcher';

interface INaverLogin {
  code: string | null;
  state: string | null;
}

export default async function NaverLogin(body: INaverLogin) {
  const data = await api.post({ endpoint: `/oauth/signin`, body });
  return data;
}
