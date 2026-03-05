import React, { useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import useCommentStore from '../../../store/useCommentStore';
import Icon_comment from '../../../../../../../public/svg/postItem/chatbox.svg';
import Image from 'next/image';
import getComments from '@/api/comment/getComments';
import postComment from '@/api/comment/postComment';
import CommentInput from './CommentInput';
import CommentBox from './CommentBox';

interface Props {
  id: number;
}

function CommentArea({ id }: Props) {
  const queryClient = useQueryClient();
  const { accessToken } = useAuthStore();
  const commentMethods = useForm<{ commentContent: string }>();
  const { isCommentInProgress, setIsCommentInProgress } = useCommentStore();
  const replyRef = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const commentRef = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const [targetComment, setTargetComment] = useState<{ id: number | null; nickname: string }>({
    id: null,
    nickname: '',
  });
  const [newCommentId, setNewCommentId] = useState<number | null>(null);
  const { getValues } = commentMethods;

  const { data: commentData } = useQuery({
    queryKey: ['COMMENTS'],
    queryFn: async () => getComments(String(id)),
  });

  const { mutate: writeComment } = useMutation({
    mutationFn: async (data: string) => {
      const response = await postComment(
        String(id),
        { parentId: targetComment.id, content: data },
        accessToken,
      );
      return response.commentId;
    },
    onSuccess: async (commentId) => {
      await queryClient.invalidateQueries({ queryKey: ['COMMENTS'] });
      setNewCommentId(commentId);
      setIsCommentInProgress(false);
      commentMethods.reset();
    },
    onError: (error) => console.error(error.message),
  });

  useEffect(() => {
    if (newCommentId) {
      if (targetComment.id) {
        handleReplyScroll(newCommentId);
        setNewCommentId(null);
      } else {
        handleCommentScroll(newCommentId);
        setNewCommentId(null);
      }
      setTargetComment({ id: null, nickname: '' });
    }
  }, [newCommentId, targetComment.id]);

  const handleReplyScroll = (id: number) => {
    if (replyRef.current[id]) {
      replyRef.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      console.log(replyRef.current);
    }
  };

  const handleCommentScroll = (id: number) => {
    if (commentRef.current[id]) {
      commentRef.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      console.log(commentRef.current);
    }
  };

  const onCommentSubmit = (data: { commentContent: string }) => {
    console.log(data);
    if (isCommentInProgress) {
      return;
    }
    setIsCommentInProgress(true);

    if (targetComment) {
      const commentValue = getValues('commentContent');
      if (commentValue?.startsWith(`@${targetComment.nickname}`)) {
        if (commentValue.includes(`@${targetComment.nickname}`)) {
          const cleanedComment = commentValue.replace(`@${targetComment.nickname}`, '').trim();
          writeComment(cleanedComment);
          return;
        }
      }
    }
    writeComment(data.commentContent.trim());
  };

  return (
    <div className='w-[452px] flex flex-col gap-[10px]'>
      <div className='flex gap-[6px] mb-[10px]'>
        <Image src={Icon_comment} width={20} height={20} alt='chatBox' />
        <div className='flex text-[14px] text-[#666666] font-semibold gap-[2px]'>
          <p>댓글</p>
          <p>
            {commentData && commentData?.comments.length > 999
              ? '999+'
              : commentData?.comments.length}
          </p>
        </div>
      </div>
      <FormProvider {...commentMethods}>
        <form className='w-full' onSubmit={commentMethods.handleSubmit(onCommentSubmit)}>
          <CommentInput targetNickname={targetComment.nickname} />
        </form>
      </FormProvider>
      <CommentBox commentData={commentData!} />
    </div>
  );
}

export default CommentArea;
