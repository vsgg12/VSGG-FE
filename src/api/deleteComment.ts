import api from '@/_lib/fetcher';

export default async function DeleteComment(commentId: number, token: string) {
  const data = await api.delete({
    endpoint: `/comment/${commentId}`,
    authorization: token,
  });
  return data;
}
