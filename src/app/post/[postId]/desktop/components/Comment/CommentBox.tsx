import { useAuthStore } from '@/app/login/store/useAuthStore';
import MoreModal from '@/components/modals/MoreModal';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import Icon_more from '../../../../../../../public/svg/Icon_more.svg';
import { useLoginStore } from '@/store/login/useLoginStore';
import Comment from '@/app/post/[postId]/desktop/components/Comment/CommentItem';

interface Props {
  commentData: IGetCommentListType;
  targetComment: { id: number | null; nickname: string };
  setTargetComment: React.Dispatch<
    React.SetStateAction<{
      id: number | null;
      nickname: string;
    }>
  >;
}

function CommentBox({ commentData, targetComment, setTargetComment }: Props) {
  const { isLogin, user } = useAuthStore();
  const [showReply, setShowReply] = useState<null | number>(null);
  const [isCommentMoreModalOpen, setIsCommentMoreModalOpen] = useState<number | null>(null);
  const { setIsLoginModalOpen } = useLoginStore();

  const replyRef = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const commentRef = useRef<{ [key: number]: HTMLDivElement | null }>({});
  // const [targetComment, setTargetComment] = useState<{ id: number | null; nickname: string }>({
  //   id: null,
  //   nickname: '',
  // });
  const [newCommentId, setNewCommentId] = useState<number | null>(null);

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
    }
  };

  const handleCommentScroll = (id: number) => {
    if (commentRef.current[id]) {
      commentRef.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
      console.log('답글달기', targetId, targetNickname);
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

  return (
    <div className='w-full h-[1266px] bg-[#FFFFFF] rounded-[20px] p-[30px]'>
      {commentData?.comments.length === 0 ? (
        <div className='flex justify-center'>
          <div>아직 댓글이 없습니다.</div>
        </div>
      ) : (
        <div className='scroll overflow-hidden w-full h-full relative flex flex-col gap-[10px]'>
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
                    className='my-[5px] text-[14px] font-medium text-[#E20A29]'
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
  );
}

export default CommentBox;
