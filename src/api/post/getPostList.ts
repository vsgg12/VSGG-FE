import api from '@/_lib/fetcher';

export default async function getPostList(
  orderBy: string,
  keyword: string,
  token: string,
  page: number,
): Promise<IGetPostListType> {
  return await api.get<IGetPostListType>({
    endpoint: `/post?orderby=${orderBy}&keyword=${keyword}&page=${page}`,
    authorization: token,
  });
}
