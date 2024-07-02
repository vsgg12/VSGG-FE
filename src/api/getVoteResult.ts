import api from '@/_lib/fetcher';

interface IGetVoteResultType {
  resultCode: number;
  resultMsg: string;
  postId: number;
  results: IGetVoteType[];
}

export default async function GetVoteResult(postId: string, token: string) {
  const data = await api.get<IGetVoteResultType>({
    endpoint: `/post/${postId}/result`,
    authorization: token,
  });

  return data;
}
