import { BsArrowUpCircle } from 'react-icons/bs';
import Loading from '@/components/Loading';
import useCommentStore from '../[postId]/store/useCommentStore';
import { useState } from 'react';

interface IPostCommentProps {
  handleSubmit: () => void;
}

export default function ReplyInput({ handleSubmit }: IPostCommentProps) {
  const { isCommentInProgress, setCommentContent, showReply } = useCommentStore();
  const [replyContent, setReplyContent] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentContent(e.target.value);
    if (showReply) setReplyContent(e.target.value);
  };

  return (
    <div className='mb-[20px] flex grow flex-col'>
      <input
        className='h-[35px] w-[100%] resize-none overflow-hidden rounded-[20px] border-2 border-[#8A1F21] px-[10px] py-[5px] text-[13px] focus:outline-none'
        onChange={handleInputChange}
        onFocus={() => {
          setReplyContent('');
          setCommentContent('');
        }}
        value={replyContent}
      />
      <div className='flex w-full justify-end'>
        <button
          className='row-end flex-end flex items-center text-[12px] text-[#8A1F21]'
          type='submit'
          onClick={handleSubmit}
          disabled={replyContent === ''}
        >
          <p className='mr-[4px]'>등록</p>
          <BsArrowUpCircle />
        </button>
      </div>
      {isCommentInProgress && <Loading />}
    </div>
  );
}
