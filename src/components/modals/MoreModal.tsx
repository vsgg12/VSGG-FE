import DeleteComment from '@/api/comment/deleteComment';
import deletePost from '@/api/postDetail/deletePost';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import usePostIdStore from '@/app/post/[postId]/store/usePostIdStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { Dispatch, SetStateAction } from 'react';
import { useSidebarStore } from '@/store/sidebar/useSidebarStore';

interface Props {
  type: 'owner' | 'user';
  where: 'post' | 'comment';
  setIsCommentMoreModalOpen?: Dispatch<SetStateAction<number | null>>;
  targetId?: number;
  postId?: number;
  isEditPostPossible?: boolean;
}

function MoreModal({
  type,
  where,
  targetId = 0,
  setIsCommentMoreModalOpen,
  postId,
  isEditPostPossible,
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
  const isDarkMode = useSidebarStore((state) => state.isDarkMode);
  const modalClass = isDarkMode
    ? 'border-[#484B4D] bg-[#242526] text-[#787C80]'
    : 'border-gray-150 bg-white text-gray-500';
  const dividerClass = isDarkMode ? 'border-[#484B4D]' : 'border-gray-20';

  const { mutate: deletePostItem } = useMutation({
    mutationFn: () => deletePost(postId, accessToken),
    onSuccess: () => {
      alert('게시글이 삭제되었습니다.');
      router.push('/');
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  //댓글 삭제
  const { mutate: deleteComment } = useMutation({
    mutationFn: () => DeleteComment(targetId, accessToken),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['COMMENTS'] });
      setPostVoteResult([]);
    },
    onError: (error) => {
      alert(error.message);
    },
    onSettled: () => {
      setIsCommentMoreModalOpen && setIsCommentMoreModalOpen(null);
    },
  });

  const handleClick = (text: string) => {
    switch (text) {
      case '수정':
        if (where === 'post') {
          if (!isEditPostPossible) {
            return alert('게시글은 판결기간 종료 24시간 전까지만 수정이 가능합니다.');
          }
          alert('준비중입니다.');
          // router.push(`/post/${postId}/edit`);
        }
        break;
      case '삭제':
        if (
          where === 'post' &&
          confirm('이 게시글을 삭제하면 복구할 수 없습니다.\n게시글을 삭제하시겠습니까?')
        ) {
          deletePostItem();
        } else if (where === 'comment' && confirm('댓글을 삭제하시겠습니까?')) {
          deleteComment();
        }
        break;
      case '신고':
        // 이건 어떻게 할지 아직 모름
        alert('준비중입니다.');
        break;
      case '취소':
        setIsCommentMoreModalOpen && setIsCommentMoreModalOpen(null);
        break;
      default:
        break;
    }
  };

  return (
    <div className={`w-[62px] max-h-[54px] min-h-[29px] p-[5px] rounded-[10px] border z-100 ${modalClass}`}>
      <div className='flex flex-col text-[12px] font-medium h-full text-center justify-center gap-[3px]'>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && <hr className={`border-t ${dividerClass}`} />}
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
