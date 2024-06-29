import api from '@/_lib/fetcher';
import { getStoredLoginState } from '@/app/login/store/useAuthStore';

export default async function postToken() {
  const { refreshToken } = getStoredLoginState();
  const data = await api.post({ endpoint: '/users/token/refresh', body: refreshToken });
  return data;
}
