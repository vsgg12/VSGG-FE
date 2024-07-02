import api from '@/_lib/fetcher';

export default async function getPostItem(postId: string) {
  const data = await api.get<IGetPostItemType>({ endpoint: `/post/${postId}` });
  return data;
}
