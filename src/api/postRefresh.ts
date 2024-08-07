import api from '@/_lib/fetcher';

export default async function postRefresh(refreshToken: string): Promise<IPostRefreshType> {
  return await api.post<{ refreshToken: string }, IPostRefreshType>({
    endpoint: '/users/token/refresh',
    body: { refreshToken: `Bearer ${refreshToken}` },
  });
}
