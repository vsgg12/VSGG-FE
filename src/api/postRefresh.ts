import api from '@/_lib/fetcher';

interface IPostRefresh {
  refreshToken: string;
}

export default async function postRefresh(refreshToken: IPostRefresh) {
  const data = await api.post<IPostRefresh, IPostRefreshType>({
    endpoint: '/users/token/refresh',
    body: refreshToken,
  });
  return data;
}
