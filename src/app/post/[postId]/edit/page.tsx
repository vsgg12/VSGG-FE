'use client';

import getPostItem from '@/api/getPostItem';
import patchEditPost from '@/api/patchEditPost';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';

/* 수정 가능 항목
    1.제목
    2. 본문 내용
    3. 해시태그(삭제 및 추가 가능
    4. 동영상(기존 동영상 삭제 후 새로운 영상 첨부 가능
    5. 이미지(기존 이미지 삭제 후 새로운 이미지 첨부 가능
    6. 챔피언 티어 수정 가능
*/
function EditPost() {
  const { postId } = useParams<{ postId: string }>();
  const { isLogin, accessToken } = useAuthStore.getState();
  const router = useRouter();

  const {
    data: post
  } = useQuery<IGetPostItemType>({
    queryKey: ['POST_ITEM', postId],
    queryFn: async () => getPostItem(postId, isLogin ? accessToken : ''),
  });

  const usePatchEditPost = (authorization: string, postId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (body: IPatchEditPostRequestBodyType) =>
        patchEditPost(body, authorization, postId),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['POST_ITEM'],
        });
        router.back();
      },
      onError: (error) => {
        if (error.message === "VIDEO_REQUIRED") {
          alert("영상 첨부는 필수입니다!")
        }
      },
    });
  };

  return <div>EditPost</div>;
}

export default EditPost;
