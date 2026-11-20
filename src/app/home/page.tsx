import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { headers } from 'next/headers';
import getPostListServer from '@/api/post/getPostList.server';
import HomeClient from './HomeClient';

/**
 * 홈 페이지 (서버 컴포넌트)
 * - 첫 페이지 게시글 목록을 서버에서 미리 받아 React Query 캐시에 채워 넣음
 * - 클라이언트(HomeClient)는 같은 queryKey로 캐시를 바로 사용하므로 첫 목록 요청을 기다리지 않음
 * - 토큰이 localStorage에 있어 서버는 비로그인 기준으로 조회 (liked / isVote는 비어 있을 수 있음)
 * - User-Agent로 모바일 여부를 추측해 첫 렌더링에 사용 (클라이언트에서 실제 화면 크기로 보정)
 */
export default async function HomePage() {
  const queryClient = new QueryClient();

  // prefetch는 실패해도 throw하지 않음 → 실패 시 클라이언트에서 기존처럼 다시 요청
  await queryClient.prefetchInfiniteQuery({
    // HomeClient의 queryKey(['POST_LIST', activeButton, keyword])의 초기값과 정확히 같아야 함
    queryKey: ['POST_LIST', 'createdatetime', ''],
    queryFn: ({ pageParam }) => getPostListServer('createdatetime', pageParam as number),
    initialPageParam: 0,
  });

  const userAgent = headers().get('user-agent') ?? '';
  const isMobileUA = /Mobi|Android|iPhone|iPod/i.test(userAgent);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomeClient isMobileUA={isMobileUA} />
    </HydrationBoundary>
  );
}
