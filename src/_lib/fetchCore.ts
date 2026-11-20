/**
 * 서버/클라이언트 공통 fetch 함수
 * - 'use client'나 브라우저 전용 API(window, localStorage)에 의존하지 않으므로
 *   서버 컴포넌트, Route Handler, 클라이언트 어디서든 사용할 수 있음
 * - 토큰 재발급 같은 클라이언트 전용 로직은 `_lib/fetcher.ts`에서 이 함수를 감싸서 처리
 */

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export interface IFetchCoreOptions<T = unknown> extends Omit<RequestInit, 'body'> {
  endpoint: string;
  body?: T;
  authorization?: string;
}

// T: 요청 body의 타입,
// R: 응답 body의 타입
export async function fetchCore<R = unknown, T = unknown>({
  endpoint,
  body,
  authorization,
  headers: customHeaders,
  ...init
}: IFetchCoreOptions<T>): Promise<R> {
  const headers: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...(customHeaders as Record<string, string> | undefined),
  };

  if (authorization) {
    headers.Authorization = 'Bearer ' + authorization;
  }

  let requestBody: BodyInit | undefined;
  if (body instanceof FormData) {
    // FormData는 브라우저가 boundary를 포함한 Content-Type을 직접 설정해야 함
    delete headers['Content-Type'];
    requestBody = body;
  } else if (body !== undefined && body !== null) {
    requestBody = JSON.stringify(body);
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_PROXY_URL}${endpoint}`, {
    ...init,
    headers,
    body: requestBody,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new ApiError(
      errorData?.resultMsg ?? errorData?.message ?? `Request failed (status: ${res.status})`,
      res.status,
    );
  }

  return res.json();
}
