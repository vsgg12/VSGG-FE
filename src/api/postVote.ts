import api from '@/_lib/fetcher';

type IResultType = {
  resultCode: number;
  resultMsg: string;
};

export default async function PostVote(postId: string, body: IVoteType[], token: string) {
  const data = await api.post<IVoteType[], IResultType>({
    endpoint: `/post/${postId}/vote`,
    body,
    authorization: token,
  });
  return data;
}
