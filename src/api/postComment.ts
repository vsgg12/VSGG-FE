import api from '@/_lib/fetcher';

interface IPostComment {
  CommentAddRequest: {
    parentId: number | null;
    content: string;
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
