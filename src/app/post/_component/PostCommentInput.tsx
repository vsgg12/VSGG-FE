import { BsArrowUpCircle } from 'react-icons/bs';
import Loading from '@/components/Loading';

interface IPostCommentProps {
  handleSubmit: () => void;
  isProgress: boolean;
}

export default function PostCommentInput({ handleSubmit, isProgress }: IPostCommentProps) {
  return (
    <div className='mb-[20px] flex grow flex-col'>
      <form className='grow' onSubmit={handleSubmit}>
        <textarea className=' h-[35px] w-[100%] resize-none overflow-hidden rounded-[20px] border-2 border-[#8A1F21] px-[10px] py-[5px] text-[13px] focus:outline-none' />
        <div className='flex w-full justify-end'>
          <button
            className='row-end flex-end flex items-center text-[12px] text-[#8A1F21]'
            type='submit'
          >
            <div className='mr-[4px]'>등록</div>
            <BsArrowUpCircle />
          </button>
        </div>
      </form>
      {isProgress && <Loading />}
    </div>
  );
}
