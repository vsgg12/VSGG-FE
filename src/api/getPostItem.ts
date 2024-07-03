import api from '@/_lib/fetcher';

export default async function getPostItem(postId: string, token: string) {
  const data = await api.get<IGetPostItemType>({
    endpoint: `/post/${postId}`,
    authorization: token,
  });
  return data;
}
