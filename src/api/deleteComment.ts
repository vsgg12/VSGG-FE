import api from '@/_lib/fetcher';

type IResultType = {
  resultCode: number;
  resultMsg: string;
};

export default async function DeleteComment(commentId: number, token: string) {
  const data = await api.delete<IResultType>({
    endpoint: `/comment/${commentId}`,
    authorization: token,
  });
  return data;
}
