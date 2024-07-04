import api from '@/_lib/fetcher';

interface IRefreshToken {
  refreshToken: string;
}

interface IResponse {
  resultCode: number;
  resultMsg: string;
  tokens?: {
    accessToken: string;
    refreshToken: string;
  };
}

export default async function postRefresh(body: IRefreshToken) {
  const data = await api.post<IRefreshToken, IResponse>({
    endpoint: '/users/token/refresh',
    body,
  });
  return data;
}
