import 'server-only';
import { fetchCore } from '@/_lib/fetchCore';

/**
 * 서버 컴포넌트 전용 게시글 목록 조회 함수
 * - `_lib/fetcher.ts`는 클라이언트 전용(useAuthStore, window 사용)이라 공통 함수인 fetchCore를 사용
 * - 토큰이 localStorage에 있어 서버는 로그인 여부를 알 수 없으므로 비로그인 기준으로 조회
 *   (로그인 사용자의 liked / isVote 정보는 클라이언트에서 다시 받아와야 함)
 */
export default async function getPostListServer(
  orderBy: string,
  page = 0,
  keyword = '',
): Promise<IGetPostListType> {
  const query = new URLSearchParams({
    orderby: orderBy,
    keyword,
    page: String(page),
  });

  return fetchCore<IGetPostListType>({
    endpoint: `/post?${query.toString()}`,
    next: { revalidate: 30 }, // 30초 동안 서버 캐시 재사용
    signal: AbortSignal.timeout(5000), // API 서버가 응답하지 않을 때 페이지 렌더링이 멈추지 않도록 5초 제한
  });
}
