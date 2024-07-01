import { BsArrowUpCircle } from 'react-icons/bs';
import Loading from '@/components/Loading';
import useCommentStore from '../[postId]/store/useCommentStore';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import { useRouter } from 'next/navigation';

interface IPostCommentProps {
  handleSubmit: () => void;
}

export default function PostCommentInput({ handleSubmit }: IPostCommentProps) {
  const { isCommentInProgress, setCommentContent, commentContent, showReply, setShowReply } =
    useCommentStore();

  const { isLogin } = useAuthStore();
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentContent(e.target.value);
  };

  return (
    <div className='mb-[20px] flex grow flex-col'>
      <input
        className='h-[35px] w-[100%] resize-none overflow-hidden rounded-[20px] border-2 border-[#8A1F21] px-[10px] py-[5px] text-[13px] focus:outline-none'
        onChange={handleInputChange}
        onFocus={() => {
          if (!isLogin) {
            router.push('/login');
          }
          setCommentContent('');
          setShowReply(null);
        }}
        value={showReply ? '' : commentContent}
      />
      <div className='flex w-full justify-end'>
        <button
          className='row-end flex-end flex items-center text-[12px] text-[#8A1F21]'
          type='submit'
          onClick={handleSubmit}
          disabled={commentContent === ''}
        >
          <p className='mr-[4px]'>등록</p>
          <BsArrowUpCircle />
        </button>
      </div>
      {isCommentInProgress && !showReply && <Loading />}
    </div>
  );
}
