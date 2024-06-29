import postRefresh from '@/api/postRefresh';
import { getStoredLoginState, useAuthStore } from '@/app/login/store/useAuthStore';
import refreshTokenExpired from './refreshTokenExpired';

interface IFetchOptions {
  endpoint: string;
  body?: any;
  method?: string;
  authorization?: string;
  id?: string;
}

interface IGetOptions {
  endpoint: string;
  authorization?: string;
}

interface IPostOptions {
  endpoint: string;
  body?: any;
  authorization?: string;
}

interface IDeleteOptions {
  endpoint: string;
  authorization: string;
}

const _fetch = async ({ method, endpoint, body, authorization }: IFetchOptions) => {
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

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_PROXY_URL}${endpoint}`, requestOptions);

    if (!res.ok) {
      if (res.status === 401) {
        const { refreshToken } = getStoredLoginState();
        if (refreshToken) {
          const newToken = await postRefresh(refreshToken);
          if (newToken) {
            useAuthStore.setState({
              isLogin: true,
              accessToken: newToken.tokens.accessToken,
              refreshToken: refreshToken,
            });
            headers.Authorization = 'Bearer ' + newToken.tokens.accessToken;
            const retryRequestOptions: RequestInit = {
              ...requestOptions,
              headers,
            };
            const retryRes = await fetch(
              `${process.env.NEXT_PUBLIC_PROXY_URL}${endpoint}`,
              retryRequestOptions,
            );
            if (!retryRes.ok) {
              const retryErrorData = await retryRes.json();
              throw new Error(retryErrorData.message);
            }
            return await retryRes.json();
          } else {
            // refreshToken 만료시
            refreshTokenExpired();
            throw new Error('Session expired. Please log in again.');
          }
        }
      }
      const errorData = await res.json();
      throw new Error(errorData.message);
    }

    return await res.json();
  } catch (error) {
    throw error;
  }
};

const _get = async ({ endpoint, authorization }: IGetOptions) => {
  return _fetch({ method: 'GET', endpoint, authorization });
};

const _post = async ({ endpoint, body, authorization }: IPostOptions) => {
  return _fetch({ method: 'POST', endpoint, body, authorization });
};

const _patch = async ({ endpoint, body, authorization }: IPostOptions) => {
  return _fetch({ method: 'PATCH', endpoint, body, authorization });
};

const _put = async ({ endpoint, body, authorization }: IPostOptions) => {
  return _fetch({ method: 'PUT', endpoint, body, authorization });
};

const _delete = async ({ endpoint, authorization }: IDeleteOptions) => {
  return _fetch({ method: 'DELETE', authorization, endpoint });
};

const api = {
  get: _get,
  post: _post,
  patch: _patch,
  put: _put,
  delete: _delete,
};

export default api;
