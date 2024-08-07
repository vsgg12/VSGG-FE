'use client';
import postRefresh from '@/api/postRefresh';
import RefreshTokenExpired from './refreshTokenExpired';
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
    console.log('retryCount : ', retryCount);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_PROXY_URL}${endpoint}`, requestOptions);
      console.log('원래 호출하려던 api 응답 res.status : ', res.status);
      if (!res.ok) {
        console.log('첫번째 try안의 첫번째 if문 진입 성공');
        if (res.status === 401) {
          console.log('첫번째 try안의 두번째 if문 진입 성공');
          const { refreshToken } = useAuthStore.getState();
          if (refreshToken) {
            console.log(
              '첫번째 try안의 첫번째 if문 진입, 로컬스토리지에 저장되어 있는 refreshToken이 빈문자열이 아닐경우',
            );
            try {
              console.log('두번째 try안 진입 성공, refreshToken으로 토큰 재발급받는 api 호출시작');
              const newToken: IPostRefreshType = await postRefresh(refreshToken);
              console.log(
                'refresh api 호출 후의 응답인 newToken.resultCode : ',
                newToken.resultCode,
              );
              if (newToken.resultCode === 200) {
                console.log('newToken.resultCode가 200일때 진입 성공');
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
                console.log('재요청하는 응답 데이터 retryRes :', retryRes);

                if (!retryRes.ok) {
                  console.log('retryRes가 ok가 아닐때');
                  const retryErrorData = await retryRes.json();
                  throw new Error(retryErrorData.message);
                }
                return await retryRes.json();
              }
            } catch (err) {
              console.log(
                '두번쨰 try문에 대한 catch문 진입 성공(refresh api에서 응답코드 200이 아닐경우), RefreshTokenExpired()함수 호출 전',
              );
              RefreshTokenExpired();
              throw new Error('Session expired. Please log in again.');
            }
          } else {
            console.log(
              'refreshToken값이 빈 문자열일때 또는 없을때 진입, RefreshTokenExpired()함수 호출 전',
            );
            RefreshTokenExpired();
            throw new Error('Session expired. Please log in again.');
          }
        }
        const errorData = await res.json();
        throw new Error(errorData.message);
      }
      return await res.json();
    } catch (error) {
      retryCount++;
      if (retryCount >= MAX_RETRY_COUNT) {
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
