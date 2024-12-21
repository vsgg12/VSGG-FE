import React, { Dispatch, SetStateAction, useState } from 'react';
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
  const [targetComment, setTargetComment] = useState<{ id: number | null; nickname: string }>({
    id: null,
    nickname: '',
  });

  const { data: commentData } = useQuery({
    queryKey: ['COMMENTS'],
    queryFn: async () => getComments(id),
  });

  const { mutate: writeComment } = useMutation({
    mutationFn: (data: string) =>
      PostComment(id, { parentId: targetComment.id, content: data }, accessToken),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['COMMENTS'] });
      setIsCommentInProgress(false);
      commentMethods.reset();
      setTargetComment({ id: null, nickname: '' });
    },
    onError: (error) => console.log(error),
  });

  const handleOpenCommentMoreModal = (commentId: number) => {
    setIsCommentMoreModalOpen(isCommentMoreModalOpen === commentId ? null : commentId);
  };

  const handleOpenReplyMoreModal = (replyId: number) => {
    setIsCommentMoreModalOpen(isCommentMoreModalOpen === replyId ? null : replyId);
  };

  const handleReply = (targetNickname: string, targetId: number, parentId: number) => {
    if (!isLogin) {
      setIsLoginModalOpen(true);
    }
    setTargetComment({ id: targetId, nickname: targetNickname });
    setShowReply(parentId);
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
    <div className='p-content-rounded relative mb-11 h-[1000px] w-[380px] bg-white px-[20px] pb-[30px] '>
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
          <div className='scroll overflow-hidden h-[770px] w-full relative flex flex-col gap-[15px]'>
            {commentData &&
              commentData?.comments.map((comment: IGetCommentItemType, index) => (
                <div key={index} className=' relative text-[13px]'>
                  <div className='relative flex justify-between'>
                    <Comment
                      comment={comment}
                      handleReply={() => {
                        handleReply(comment.member.nickname, comment.id, comment.id);
                      }}
                    />
                    {isCommentMoreModalOpen === comment.id && (
                      <div className='absolute translate-x-[255px]'>
                        <MoreModal
                          type={comment.member.nickname === user?.nickname ? 'owner' : 'user'}
                          where='comment'
                          handleReply={() =>
                            handleReply(comment.member.nickname, comment.id, comment.id)
                          }
                          setIsCommentMoreModalOpen={setIsCommentMoreModalOpen}
                          commentId={comment.id}
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
                    <div className='border-l-2 border-[#8A1F21] pl-6'>
                      {comment.children?.map((reply: IGetCommentItemType, index: number) => (
                        <div key={index} className='flex justify-between relative'>
                          <Comment
                            comment={reply}
                            targetComment={targetComment}
                            handleReply={() =>
                              handleReply(reply.member.nickname, reply.id, comment.id)
                            }
                          />
                          {isCommentMoreModalOpen === reply.id && (
                            <div className='absolute translate-x-[225px] '>
                              <MoreModal
                                type={reply.member.nickname === user?.nickname ? 'owner' : 'user'}
                                where='comment'
                                handleReply={() =>
                                  handleReply(comment.member.nickname, reply.id, comment.id)
                                }
                                setIsCommentMoreModalOpen={setIsCommentMoreModalOpen}
                                commentId={comment.id}
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
