import DeleteComment from '@/api/deleteComment';
import deletePost from '@/api/deletePost';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import usePostIdStore from '@/app/post/[postId]/store/usePostIdStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { Dispatch, SetStateAction } from 'react';

interface Props {
  type: 'owner' | 'user';
  where: 'post' | 'comment';
  handleReply?: (commentId: number, targetId: number) => void;
  setIsCommentMoreModalOpen?: Dispatch<SetStateAction<number | null>>;
  targetId?: number;
  commentId?: number;
  postId?: number;
}

function MoreModal({
  type,
  where,
  targetId = 0,
  commentId = 0,
  handleReply,
  setIsCommentMoreModalOpen,
  postId,
}: Props) {
  const items =
    where === 'post'
      ? type === 'owner'
        ? ['수정', '삭제']
        : ['신고']
      : type === 'owner'
        ? ['삭제', '취소']
        : ['신고', '취소'];

  const { accessToken } = useAuthStore();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setPostVoteResult } = usePostIdStore();

  const { mutate: deletePostItem } = useMutation({
    mutationFn: () => deletePost(postId, accessToken),
    onSuccess: () => {
      alert('게시글이 삭제되었습니다.');
      router.push('/home');
    },
    onError: (error) => {
      alert(error);
    },
  });

  //댓글 삭제
  const { mutate: deleteComment } = useMutation({
    mutationFn: () => DeleteComment(targetId, accessToken),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['COMMENTS'] });
      setPostVoteResult([]);
    },
    onError: () => {
      alert('대댓글이 있는 댓글은 삭제할 수 없습니다.');
    },
    onSettled: () => {
      setIsCommentMoreModalOpen && setIsCommentMoreModalOpen(null);
    },
  });

  const handleClick = (text: string) => {
    switch (text) {
      case '수정':
        // where에 따른 댓글 수정, 게시글 수정 api 호출 다르게
        alert('준비중입니다.');
        break;
      case '삭제':
        if (where === 'post' && confirm('글을 삭제하시겠습니까?')) {
          deletePostItem();
        } else if (where === 'comment' && confirm('댓글을 삭제하시겠습니다?')) {
          deleteComment();
        }
        break;
      case '신고':
        // 이건 어떻게 할지 아직 모름
        alert('준비중입니다.');
        break;
      case '답글':
        alert('준비중입니다.');
        handleReply && handleReply(commentId, targetId);
        break;
      case '취소':
        setIsCommentMoreModalOpen && setIsCommentMoreModalOpen(null);
        break;
      default:
        break;
    }
  };

  return (
    <div className='w-[62px] max-h-[54px] min-h-[29px] p-[5px] rounded-[10px] border border-[#C8C8C8] z-100 bg-white'>
      <div className='flex flex-col text-[12px] font-medium h-full text-[#828282] text-center justify-center gap-[3px]'>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && <hr className='border-t border-[#F8F8F8]' />}
            <div className='cursor-pointer' onClick={() => handleClick(item)}>
              {item}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default MoreModal;
