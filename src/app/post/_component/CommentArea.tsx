import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import PostCommentInput from './PostCommentInput';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import PostComment from '@/api/postComment';
import getComments from '@/api/getComments';
import useCommentStore from '../[postId]/store/useCommentStore';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'next/navigation';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import MoreModal from '@/components/modals/MoreModal';
import Icon_more from '../../../../public/svg/Icon_more.svg';
import Image from 'next/image';
import Comment from './Comment';

interface ICommentArea {
  setIsLoginModalOpen: Dispatch<SetStateAction<boolean>>;
}

function CommentArea({ setIsLoginModalOpen }: ICommentArea) {
  const { postId } = useParams();
  const id: string = postId as string;
  const queryClient = useQueryClient();
  const { accessToken, isLogin, user } = useAuthStore.getState();
  const commentMethods = useForm<{ commentContent: string }>();
  const [showReply, setShowReply] = useState<null | number>(null);
  const { isCommentInProgress, setIsCommentInProgress } = useCommentStore();
  const [isCommentMoreModalOpen, setIsCommentMoreModalOpen] = useState<number | null>(null);
  const replyRef = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const commentRef = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const [targetComment, setTargetComment] = useState<{ id: number | null; nickname: string }>({
    id: null,
    nickname: '',
  });
  const [newCommentId, setNewCommentId] = useState<number | null>(null);

  const { data: commentData } = useQuery({
    queryKey: ['COMMENTS'],
    queryFn: async () => getComments(id),
  });

  const { mutate: writeComment } = useMutation({
    mutationFn: async (data: string) => {
      const response = await PostComment(
        id,
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
      setTargetComment({ id: null, nickname: '' });
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
    }
  }, [newCommentId]);

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

  const handleOpenCommentMoreModal = (commentId: number) => {
    setIsCommentMoreModalOpen(isCommentMoreModalOpen === commentId ? null : commentId);
  };

  const handleOpenReplyMoreModal = (replyId: number) => {
    setIsCommentMoreModalOpen(isCommentMoreModalOpen === replyId ? null : replyId);
  };

  const handleWriteReply = (targetNickname: string, targetId: number, parentId: number) => {
    if (!isLogin) {
      setIsLoginModalOpen(true);
    } else {
      setTargetComment({ id: targetId, nickname: targetNickname });
      setShowReply(parentId);
    }
  };

  const handleOpenReply = (commentId: number) => {
    if (!isLogin) {
      setIsLoginModalOpen(true);
    } else if (showReply && showReply === commentId) {
      setShowReply(null);
      setIsCommentMoreModalOpen(null);
    } else {
      setShowReply(commentId);
      setIsCommentMoreModalOpen(null);
    }
  };

  const onCommentSubmit = (data: { commentContent: string }) => {
    if (isCommentInProgress) {
      return;
    }
    setIsCommentInProgress(true);
    writeComment(data.commentContent.trim());
  };

  return (
    <div className='p-content-rounded relative mb-11 h-[1000px] w-[420px] bg-white px-[20px] pb-[30px] '>
      <div className='bg-[#ffffff] pt-[30px]'>
        <div className='p-content-s-mb text-lg'>댓글</div>
        <div className='flex flex-row w-full'>
          <FormProvider {...commentMethods}>
            <form className='w-full' onSubmit={commentMethods.handleSubmit(onCommentSubmit)}>
              <PostCommentInput
                targetNickname={targetComment.nickname}
                setTargetComment={setTargetComment}
              />
            </form>
          </FormProvider>
        </div>
      </div>
      <div className='mt-[20px]'>
        {commentData?.comments.length === 0 ? (
          <div className='flex justify-center'>
            <div>아직 댓글이 없습니다.</div>
          </div>
        ) : (
          <div className='scroll overflow-hidden h-[770px] pl-[2px] w-full relative flex flex-col gap-[15px]'>
            {commentData &&
              commentData?.comments.map((comment: IGetCommentItemType, index) => (
                <div key={index} className='relative text-[13px]'>
                  <div
                    className='relative flex justify-between'
                    ref={(el) => {
                      commentRef.current[comment.id] = el;
                    }}
                  >
                    <Comment
                      comment={comment}
                      handleReply={() => {
                        handleWriteReply(comment.member.nickname, comment.id, comment.id);
                      }}
                    />
                    {isCommentMoreModalOpen === comment.id && (
                      <div className='absolute translate-x-[295px]'>
                        <MoreModal
                          type={comment.member.nickname === user?.nickname ? 'owner' : 'user'}
                          where='comment'
                          setIsCommentMoreModalOpen={setIsCommentMoreModalOpen}
                          targetId={comment.id}
                        />
                      </div>
                    )}
                    <Image
                      src={Icon_more}
                      alt='more'
                      width={12}
                      height={12}
                      className='cursor-pointer flex self-start ml-[10px] mt-[2px]'
                      onClick={() => {
                        handleOpenCommentMoreModal(comment.id);
                      }}
                    />
                  </div>
                  {comment.children?.length !== 0 && (
                    <button
                      key={index}
                      type='button'
                      onClick={() => handleOpenReply(comment.id)}
                      className='my-[5px] text-[14px] font-medium text-[#8A1F21]'
                    >
                      {showReply === comment.id
                        ? '- 답글 숨기기'
                        : comment.children?.length !== 0 &&
                          `- 답글 보기 (${comment.children?.length})개`}
                    </button>
                  )}
                  {showReply === comment.id && (
                    <div className='pl-6'>
                      {comment.children?.map((reply: IGetCommentItemType, index: number) => (
                        <div
                          key={index}
                          className='flex justify-between relative mb-[20px]'
                          ref={(el) => {
                            replyRef.current[reply.id] = el;
                          }}
                        >
                          <Comment
                            comment={reply}
                            targetComment={targetComment}
                            handleReply={() =>
                              handleWriteReply(reply.member.nickname, reply.id, comment.id)
                            }
                          />
                          {isCommentMoreModalOpen === reply.id && (
                            <div className='absolute translate-x-[270px] '>
                              <MoreModal
                                type={reply.member.nickname === user?.nickname ? 'owner' : 'user'}
                                where='comment'
                                setIsCommentMoreModalOpen={setIsCommentMoreModalOpen}
                                targetId={reply.id}
                              />
                            </div>
                          )}
                          <Image
                            src={Icon_more}
                            alt='more'
                            width={12}
                            height={12}
                            className='cursor-pointer flex self-start ml-[5px] mt-[2px]'
                            onClick={() => {
                              handleOpenReplyMoreModal(reply.id);
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CommentArea;
