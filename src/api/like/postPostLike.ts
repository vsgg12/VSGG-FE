import api from '@/_lib/fetcher';

type IPostResult = {
  resultCode: number;
  resultMsg: string;
  postLikeDTO: { postId: number; likeCount: number };
};

export default async function postPostLike(authorization: string, postId: number) {
  const data = await api.post<IPostWriteType, IPostResult>({
    endpoint: `/post/${postId}/like`,
    authorization,
  });

  return data;
}
