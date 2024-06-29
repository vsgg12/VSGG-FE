import postRefresh from '@/api/postRefresh';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();
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
        // 토큰 만료시
        try {
          const refreshRes = await postRefresh();
          if (refreshRes) {
            // 재발급받은 토큰 다시 저장
            useAuthStore.setState({
              isLogin: true,
              accessToken: refreshRes.tokens.accessToken,
              refreshToken: refreshRes.tokens.refreshToken,
            });
          }
        } catch (error) {
          console.log(error);
          // refreshToken도 만료되면
          useAuthStore.setState({ isLogin: false, accessToken: '', refreshToken: '' });
          localStorage.clear();
          router.push('/login');
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
