import api from '@/_lib/fetcher';
import { TempItemSummaryType } from '@/store/temp/useTempStore';

// 임시 저장 글 생성 및 발행(게시글 작성도)
export type ICreatePostResponseType = {
  resultCode: number;
  resultMsg: string;
  postId: number;
};

// postId: true, draft: true -> 임시저장글 수정
// postId: true, draft: false -> 임시저장글 발행
// postId: false, draft: true -> 임시저장글 생성
// postId: false, draft: false -> 게시글 생성
export const PostTempOrPost = async ({
  body,
  token,
  postId,
}: {
  body: FormData;
  token: string;
  postId?: string;
}) => {
  const res: ICreatePostResponseType = await api.post({
    endpoint: postId ? `/post/postId=${postId}` : '/post',
    body,
    authorization: token,
  });

  return res.postId;
};

// 임시 저장 목록 조회
export type GetTempSummaryListResponseType = {
  resultCode: number;
  resultMsg: string;
  posts: TempItemSummaryType[];
};

export const GetTempList = async (token: string) => {
  const res: GetTempSummaryListResponseType = await api.get({
    endpoint: '/post/temp',
    authorization: token,
  });
  return res.posts;
};

// 임시 저장 상세 조회
export type GetTempDetailResponseType = {
  resultCode: number;
  resultMsg: string;
  post: IPostWriteOrTempType;
};

export const GetTempDetail = async ({ postId, token }: { postId: number; token: string }) => {
  const res: GetTempDetailResponseType = await api.get({
    endpoint: `/post/temp/${postId}`,
    authorization: token,
  });

  return res.post;
};

// 임시 저장 글 삭제
export const DeleteTemp = async ({ postId, token }: { postId: number; token: string }) => {
  return await api.delete({
    endpoint: `/post/temp/${postId}`,
    authorization: token,
  });
};
