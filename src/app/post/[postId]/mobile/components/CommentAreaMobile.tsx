import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import PostComment from '@/api/postComment';
import getComments from '@/api/getComments';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'next/navigation';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import MoreModal from '@/components/modals/MoreModal';
import Icon_more from '../../../../../../public/svg/Icon_more.svg';
import Image from 'next/image';
import useCommentStore from '../../store/useCommentStore';
import PostCommentInput from './CommentInputMobile';
import CommentMobile from './CommentMobile';

interface ICommentArea {
  setIsLoginModalOpen: Dispatch<SetStateAction<boolean>>;
}

function CommentAreaMobile({ setIsLoginModalOpen }: ICommentArea) {
  const { postId } = useParams();
  const id: string = postId as string;
  const queryClient = useQueryClient();
  const { accessToken, isLogin, user } = useAuthStore();
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
  const { getValues } = commentMethods;

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

  const handleOpenCommentMoreModal = (commentId: number) => {
    setIsCommentMoreModalOpen(isCommentMoreModalOpen === commentId ? null : commentId);
  };

  const handleOpenReplyMoreModal = (replyId: number) => {
    setIsCommentMoreModalOpen(isCommentMoreModalOpen === replyId ? null : replyId);
  };

  const onCommentSubmit = (data: { commentContent: string }) => {
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
    <div className='relative min-h-[400px] w-full rounded-[30px] flex flex-col mb-[30px] p-[30px] gap-[15px]'>
      <div>
        <p className='p-content-s-mb text-[16px]'>댓글</p>
        <div className='flex flex-row w-full'>
          <FormProvider {...commentMethods}>
            <form className='w-full' onSubmit={commentMethods.handleSubmit(onCommentSubmit)}>
              <PostCommentInput targetNickname={targetComment.nickname} />
            </form>
          </FormProvider>
        </div>
      </div>
      <div className='mt-[20px]'>
        {commentData?.comments.length === 0 ? (
          <div className='flex justify-center items-center h-[60px]'>
            <div>아직 댓글이 없습니다.</div>
          </div>
        ) : (
          <div className='pl-[2px] w-full relative flex flex-col gap-[15px]'>
            {commentData &&
              commentData?.comments.map((comment: IGetCommentItemType, index) => (
                <div key={index} className='relative text-[13px]'>
                  <div className='relative flex justify-between'>
                    <CommentMobile
                      comment={comment}
                      handleReply={() => {
                        handleReply(comment.member.nickname, comment.id, comment.id);
                      }}
                    />
                    {isCommentMoreModalOpen === comment.id && (
                      <div className='absolute right-[20px]'>
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
                        <div key={index} className='flex justify-between relative mb-[20px]'>
                          <CommentMobile
                            comment={reply}
                            targetComment={targetComment}
                            handleReply={() =>
                              handleReply(reply.member.nickname, reply.id, comment.id)
                            }
                          />
                          {isCommentMoreModalOpen === reply.id && (
                            <div className='absolute right-[20px]'>
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

export default CommentAreaMobile;
