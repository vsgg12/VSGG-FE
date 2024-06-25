import { BsArrowUpCircle } from 'react-icons/bs';
import { useState } from 'react';
import Loading from '@/components/Loading';

export default function PostCommentInput({ postId }: { postId: string }) {
  const [isCreationInProgress, setIsCreationInProgress] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (isCreationInProgress) {
      return;
    }

    setIsCreationInProgress(true);
  };
  //   try {
  //     const res = await createComments(postId, commentData);
  //     if (res.resultCode === 201) {
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //     setIsCreationInProgress(false);
  //   }
  // };

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
      {isCreationInProgress && <Loading />}
    </div>
  );
}
