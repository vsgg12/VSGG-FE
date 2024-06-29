import api from '@/_lib/fetcher';

interface IPostComment {
  commentAddRequest: {
    parentId: number | null;
    content: string | null;
  };
}

export default async function PostComment(body: IPostComment, token: string) {
  const data = await api.post({
    endpoint: `/post/{postid}/comment`,
    body,
    authorization: token,
  });
  return data;
}
