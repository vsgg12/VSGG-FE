import api from '@/_lib/fetcher';

export default async function postRefresh(body: string) {
  const data = await api.post<string, IPostRefreshType>({
    endpoint: '/users/token/refresh',
    body,
  });
  return data;
}
