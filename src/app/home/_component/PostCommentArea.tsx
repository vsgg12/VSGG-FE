import React, { useRef, useState } from 'react';
import Image from 'next/image';
import getComments from '@/api/getComments';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import MoreModal from '@/components/modals/MoreModal';
import Icon_more from '../../../../public/svg/Icon_more.svg';
import { useQuery } from '@tanstack/react-query';
import PostCommentItem from './PostCommentItem';
import { useRouter } from 'next/navigation';

interface Props {
  postId: number;
}

function PostCommentArea({ postId }: Props) {
  const router = useRouter();
  const { isLogin, user } = useAuthStore();
  const [showReply, setShowReply] = useState<null | number>(null);
  const [isCommentMoreModalOpen, setIsCommentMoreModalOpen] = useState<number | null>(null);
  const replyRef = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const commentRef = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const { data: commentData } = useQuery({
    queryKey: ['COMMENTS'],
    queryFn: async () => getComments(String(postId)),
  });

  const handleOpenReply = (commentId: number) => {
    if (!isLogin) {
      return;
    } else if (showReply && showReply === commentId) {
      setShowReply(null);
      setIsCommentMoreModalOpen(null);
    } else {
      setShowReply(commentId);
      setIsCommentMoreModalOpen(null);
    }
  };

  const handleReply = () => {
    router.push(`post/${postId}`);
  };

  const handleOpenCommentMoreModal = (commentId: number) => {
    setIsCommentMoreModalOpen(isCommentMoreModalOpen === commentId ? null : commentId);
  };

  const handleOpenReplyMoreModal = (replyId: number) => {
    setIsCommentMoreModalOpen(isCommentMoreModalOpen === replyId ? null : replyId);
  };

  return (
    <div className='w-[325px] min-h-[448px] h-full rounded-[20px] bg-[#FFFFFF] scroll p-[20px] shadow flex flex-col gap-[20px]'>
      {commentData?.comments.length !== 0 ? (
        commentData?.comments.map((comment: IGetCommentItemType, index) => (
          <div key={index} className='relative text-[13px]'>
            <div
              className='relative flex justify-between'
              ref={(el) => {
                commentRef.current[comment.id] = el;
              }}
            >
              <PostCommentItem comment={comment} handleReply={handleReply} />
              {isCommentMoreModalOpen === comment.id && (
                <div className='absolute translate-x-[205px]'>
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
                  : comment.children?.length !== 0 && `- 답글 보기 (${comment.children?.length})개`}
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
                    <PostCommentItem
                      comment={reply}
                      targetComment={null}
                      handleReply={() => {
                        return;
                      }}
                    />
                    {isCommentMoreModalOpen === reply.id && (
                      <div className='absolute translate-x-[180px] '>
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
        ))
      ) : (
        <div className='w-full flex justify-center'>
          <p>아직 댓글이 없어요.</p>
        </div>
      )}
    </div>
  );
}

export default PostCommentArea;
