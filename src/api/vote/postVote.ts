import api from '@/_lib/fetcher';

type IResultType = {
  resultCode: number;
  resultMsg: string;
};

interface IChampionVoteBodyType {
  voteList: IVoteType[];
}

interface IClaimVoteBodyType {
  voteList: IClaimVoteType[];
}

export default async function PostVote(
  postId: string,
  body: IChampionVoteBodyType | IClaimVoteBodyType,
  token: string,
) {
  const data = await api.post<IChampionVoteBodyType | IClaimVoteBodyType, IResultType>({
    endpoint: `/post/${postId}/vote`,
    body,
    authorization: token,
  });
  return data;
}
