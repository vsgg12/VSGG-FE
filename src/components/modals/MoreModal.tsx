import React from 'react';

interface Props {
  type: 'owner' | 'user';
  where: 'post' | 'comment';
  handleReply?: (commentId: number, targetId: number) => void;
  targetId?: number;
  commentId?: number;
}

function MoreModal({ type, where, targetId = 0, commentId = 0, handleReply }: Props) {
  const items =
    where === 'post'
      ? type === 'owner'
        ? ['수정', '삭제']
        : ['신고']
      : type === 'owner'
        ? ['수정', '삭제']
        : ['답글', '신고'];

  const handleClick = (text: string) => {
    switch (text) {
      case '수정':
        // where에 따른 댓글 수정, 게시글 수정 api 호출 다르게
        alert('준비중입니다.');
        break;
      case '삭제':
        // where에 따른 게시글 삭제, 댓글 삭제 api 호출 다르게
        alert('삭제');
        break;
      case '신고':
        // 이건 어떻게 할지 아직 모름
        alert('준비중입니다.');
        break;
      case '답글':
        handleReply && handleReply(commentId, targetId);
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
