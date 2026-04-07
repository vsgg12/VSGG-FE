import api from '@/_lib/fetcher';

interface IGetMyPostListsProps {
  token: string;
  size: string;
  page: string;
}

export default async function getMyPostLists({ token, size, page }: IGetMyPostListsProps) {
  const data = await api.get<IGetMyPostsType>({
    endpoint: `/mypage/post?size=${size}&page=${page}`,
    authorization: token,
  });
  return data;
}
