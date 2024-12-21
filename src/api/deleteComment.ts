import api from '@/_lib/fetcher';

type IResultType = {
  resultCode: number;
  resultMsg: string;
};

export default async function DeleteComment(commentId: number, token: string) {
  try {
    const data = await api.delete<IResultType>({
      endpoint: `/comment/${commentId}`,
      authorization: token,
    });

    if (data) {
      if (data.resultCode === 401) {
        throw new Error(JSON.stringify(data));
      }
      return data;
    }
  } catch (err) {
    console.log(err);
  }
}
