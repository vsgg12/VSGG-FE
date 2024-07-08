import api from '@/_lib/fetcher';

type IResultType = {
  resultCode: number;
  resultMsg: string;
};

interface IBodyType {
  voteList: IVoteType[];
}

export default async function PostVote(postId: string, body: IBodyType, token: string) {
  const data = await api.post<IBodyType, IResultType>({
    endpoint: `/post/${postId}/vote`,
    body,
    authorization: token,
  });
  return data;
}
