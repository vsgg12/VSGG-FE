import api from '@/_lib/fetcher';

export default async function getPostList(orderBy: string, keyword: string, token: string) {
  const data = await api.get<IGetPostListType>({
    endpoint: `/post?orderby=${orderBy}&keyword=${keyword}`,
    authorization: token,
  });

  return data;
}
