import api from '@/_lib/fetcher';

type IPatchResult = {
  resultCode: number;
  resultMsg: string;
};

export default async function patchEditPost(
  body: FormData,
  authorization: string,
  postId: string,
) {
  const data = await api.patch<FormData, IPatchResult>({
    endpoint: `/post/${postId}`,
    body,
    authorization,
  });
  return data;
}
