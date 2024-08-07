'use client';
import { useAuthStore } from '@/app/login/store/useAuthStore';

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

const MAX_RETRY_COUNT = 1;

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
    localStorage.clear();
    window.location.href = `${window.location.origin}/login`;
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
  const headers: HeadersInit = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  if (authorization) {
    headers.Authorization = 'Bearer ' + authorization;
  }

  const requestOptions: RequestInit = {
    method,
    headers,
    credentials: 'include',
  };

  if (body) {
    requestOptions.body = JSON.stringify(body);
  }

  let retryCount = 0;

  while (retryCount <= MAX_RETRY_COUNT) {
    console.log('retryCount:', retryCount);
    try {
      console.log('API 호출 endPoint : ', endpoint);
      const res = await fetch(`${process.env.NEXT_PUBLIC_PROXY_URL}${endpoint}`, requestOptions);
      console.log('API 응답 상태:', res.status);

      if (!res.ok) {
        console.log('응답 실패');
        if (res.status === 401) {
          console.log('401 Unauthorized 상태');
          const { refreshToken } = useAuthStore.getState();
          if (refreshToken) {
            console.log('refreshToken 존재');
            try {
              console.log('토큰 재발급 요청 시작');
              const newToken: IPostRefreshType = await postRefresh(refreshToken);
              console.log('토큰 재발급 응답:', newToken);

              if (newToken.resultCode === 200) {
                console.log('새 토큰 응답 성공');
                useAuthStore.setState({
                  isLogin: true,
                  accessToken: newToken.tokens.accessToken,
                  refreshToken: newToken.tokens.refreshToken,
                });
                headers.Authorization = 'Bearer ' + newToken.tokens.accessToken;

                // 새로운 요청 옵션을 생성하여 재시도
                const retryRequestOptions: RequestInit = {
                  method,
                  headers,
                  credentials: 'include',
                };

                if (body) {
                  retryRequestOptions.body = JSON.stringify(body);
                }

                // 재요청
                const retryRes = await fetch(
                  `${process.env.NEXT_PUBLIC_PROXY_URL}${endpoint}`,
                  retryRequestOptions,
                );
                console.log('재요청 응답:', retryRes);

                if (!retryRes.ok) {
                  console.log('재요청 실패');
                  const retryErrorData = await retryRes.json();
                  throw new Error(retryErrorData.message);
                }
                return await retryRes.json();
              } else {
                console.log('새 토큰 응답 실패');
                useAuthStore.setState({ isLogin: false, accessToken: '', refreshToken: '' });
                localStorage.clear();
                window.location.href = `${window.location.origin}/login`;
                throw new Error('Session expired. Please log in again.');
              }
            } catch (err) {
              console.log('토큰 재발급 오류 발생');
              useAuthStore.setState({ isLogin: false, accessToken: '', refreshToken: '' });
              localStorage.clear();
              window.location.href = `${window.location.origin}/login`;
              throw new Error('Session expired. Please log in again.');
            }
          } else {
            console.log('refreshToken 없음');
            useAuthStore.setState({ isLogin: false, accessToken: '', refreshToken: '' });
            localStorage.clear();
            window.location.href = `${window.location.origin}/login`;
            throw new Error('Session expired. Please log in again.');
          }
        }
        const errorData = await res.json();
        throw new Error(errorData.message);
      }
      return await res.json();
    } catch (error) {
      console.log('요청 오류 발생:', error);
      retryCount++;
      if (retryCount > MAX_RETRY_COUNT) {
        console.log('최대 재시도 횟수 초과');
        throw error;
      }
    }
  }

  throw new Error('Request failed after retry');
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
