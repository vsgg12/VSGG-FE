import api from '@/_lib/fetcher';

type IPostResult = {
  resultCode: number;
  resultMsg: string;
  data: { postId: number; likeCount: number };
};

export default async function postPostLike(postId: number, authorization: string) {
  const data = await api.post<IPostWriteType, IPostResult>({
    endpoint: `/api/post/${postId}/like`,
    authorization,
  });

  return data;
}
