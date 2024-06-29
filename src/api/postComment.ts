import api from '@/_lib/fetcher';

interface IPostComment {
  CommentAddRequest: {
    parentId: number | null;
    content: string | null;
  };
}

export default async function PostComment(postId: string, body: IPostComment, token: string) {
  const data = await api.post({
    endpoint: `/post/${postId}/comment`,
    body,
    authorization: token,
  });
  return data;
}
