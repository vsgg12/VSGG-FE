'use client';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import { ApiError, fetchCore } from '@/_lib/fetchCore';

interface IFetchOptions<T = unknown> {
  endpoint: string;
  body?: T;
  method?: string;
  authorization?: string;
  id?: string;
}

interface IGetOptions {
  endpoint: string;
  authorization?: string;
}

interface IPostOptions<T = unknown> {
  endpoint: string;
  body?: T;
  authorization?: string;
}

interface IDeleteOptions {
  endpoint: string;
  authorization: string;
}

const postRefresh = async (refreshToken: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_PROXY_URL}/users/token/refresh`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken: `Bearer ${refreshToken}` }),
  });

  if (!response.ok) {
    useAuthStore.setState({ isLogin: false, accessToken: '', refreshToken: '' });
    window.location.reload();
    // window.location.href = `${window.location.origin}/login`;
    throw new Error('Failed to refresh token');
  }

  const data = await response.json();
  return data;
};

const _fetch = async <T = unknown, R = unknown>({
  method,
  endpoint,
  body,
  authorization,
}: IFetchOptions<T>): Promise<R> => {
  const request = (token?: string) =>
    fetchCore<R, T>({ method, endpoint, body, authorization: token, credentials: 'include' });

  try {
    return await request(authorization);
  } catch (error) {
    // 401이 아닌 에러는 그대로 전달
    if (!(error instanceof ApiError) || error.status !== 401) {
      throw error;
    }

    const { refreshToken } = useAuthStore.getState();

    // 로컬에 refreshToken이 없을경우
    if (!refreshToken) {
      useAuthStore.setState({ isLogin: false, accessToken: '', refreshToken: '' });
      window.location.reload();
      throw new Error('Session expired. Please log in again.');
    }

    let newToken: IPostRefreshType;
    try {
      newToken = await postRefresh(refreshToken);
    } catch (err) {
      // 토큰 재발급 오류
      throw new Error('Session expired. Please log in again.');
    }

    if (newToken.resultCode !== 200) {
      throw error;
    }

    useAuthStore.setState({
      isLogin: true,
      accessToken: newToken.tokens.accessToken,
      refreshToken: newToken.tokens.refreshToken,
    });

    // 새 토큰으로 재요청
    try {
      return await request(newToken.tokens.accessToken);
    } catch (err) {
      throw new Error('Session expired. Please log in again.');
    }
  }
};

// T: 요청 body의 타입,
// R: 응답 body의 타입

const _get = async <R = unknown>({ endpoint, authorization }: IGetOptions): Promise<R> => {
  return _fetch<never, R>({ method: 'GET', endpoint, authorization });
};

const _post = async <T = unknown, R = unknown>({
  endpoint,
  body,
  authorization,
}: IPostOptions<T>): Promise<R> => {
  return _fetch<T, R>({ method: 'POST', endpoint, body, authorization });
};

const _patch = async <T = unknown, R = unknown>({
  endpoint,
  body,
  authorization,
}: IPostOptions<T>): Promise<R> => {
  return _fetch<T, R>({ method: 'PATCH', endpoint, body, authorization });
};

const _put = async <T = unknown, R = unknown>({
  endpoint,
  body,
  authorization,
}: IPostOptions<T>): Promise<R> => {
  return _fetch<T, R>({ method: 'PUT', endpoint, body, authorization });
};

const _delete = async <R = unknown>({ endpoint, authorization }: IDeleteOptions): Promise<R> => {
  return _fetch<never, R>({ method: 'DELETE', authorization, endpoint });
};

const api = {
  get: _get,
  post: _post,
  patch: _patch,
  put: _put,
  delete: _delete,
};

export default api;
