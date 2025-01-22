import api from '@/_lib/fetcher';

interface IPostComment {
  parentId: number | null;
  content: string | null;
}

type IResultType = {
  resultCode: number;
  resultMsg: string;
};

export default async function PostComment(postId: string, body: IPostComment, token: string) {
  const data = await api.post<IPostComment, IResultType>({
    endpoint: `/post/${postId}/comment`,
    body,
    authorization: token,
  });
  return data;
}
