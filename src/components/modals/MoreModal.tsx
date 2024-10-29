import deletePost from '@/api/deletePost';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react';

interface Props {
  type: 'owner' | 'user';
  where: 'post' | 'comment';
  postId?: number;
}

function MoreModal({ type, where, postId }: Props) {
  const items = type === 'owner' ? ['수정', '삭제'] : ['신고'];
  const { accessToken } = useAuthStore();
  const router = useRouter();

  const { mutate: deletePostItem } = useMutation({
    mutationFn: () => deletePost(postId, accessToken),
    onSuccess: () => {
      alert('게시글이 삭제되었습니다.');
      router.push('/home');
    },
  });

  const handleClick = (text: string) => {
    switch (text) {
      case '수정':
        // where에 따른 댓글 수정, 게시글 수정 api 호출 다르게
        alert('준비중입니다.');
        break;
      case '삭제':
        where === 'post' ? deletePostItem() : alert("댓글 삭제 기능 준비중입니다.");
        break;
      case '신고':
        // 이건 어떻게 할지 아직 모름
        alert('준비중입니다.');
        break;
      default:
        break;
    }
  };

  return (
    <div className='w-[62px] min-h-[29px] p-[5px] rounded-[10px] border border-[#C8C8C8]'>
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
