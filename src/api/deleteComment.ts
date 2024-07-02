import api from '@/_lib/fetcher';

export default async function DeleteComment(postId: string, commentId: number, token: string) {
  const data = await api.delete({
    endpoint: `/post/${postId}/comment/${commentId}`,
    authorization: token,
  });
  return data;
}
