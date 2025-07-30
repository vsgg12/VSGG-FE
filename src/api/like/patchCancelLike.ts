import api from '@/_lib/fetcher';

type IPostResult = {
  resultCode: number;
  resultMsg: string;
  data: { postId: number; likeCount: number };
};

export default async function patchCancelLike(authorization: string, postId: number) {
  const data = await api.patch<IPostWriteType, IPostResult>({
    endpoint: `/post/${postId}/unlike`,
    authorization,
  });

  return data;
}
