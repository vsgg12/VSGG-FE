import api from '@/_lib/fetcher';

export default async function PostVote(postId: string, body: IVoteType[], token: string) {
  const data = await api.post({ endpoint: `/post/${postId}/vote`, authorization: token });
  return data;
}
