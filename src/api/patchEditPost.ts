import api from '@/_lib/fetcher';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type IPatchResult = {
  resultCode: number;
  resultMsg: string;
};

export default async function patchEditPost(
  body: IPatchEditPostRequestBodyType,
  authorization: string,
  postId: string,
) {
  const data = await api.patch<IPatchEditPostRequestBodyType, IPatchResult>({
    endpoint: `/post/${postId}`,
    body,
    authorization,
  });
  return data;
}
