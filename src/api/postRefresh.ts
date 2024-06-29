import api from '@/_lib/fetcher';

interface IPostRefresh {
  refreshToken: string;
}

export default async function postRefresh(refreshToken: IPostRefresh) {
  const data = await api.post({ endpoint: '/users/token/refresh', body: refreshToken });
  return data;
}
