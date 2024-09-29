import { BsArrowUpCircle } from 'react-icons/bs';
import Loading from '@/components/Loading';
import useCommentStore from '../[postId]/store/useCommentStore';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import { useRef, useState } from 'react';
import ModalLayout from '@/components/modals/ModalLayout';
import AlertLoginModal from '@/components/modals/AlertLoginModal';
import { useFormContext } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import PostComment from '@/api/postComment';

interface IPostCommentInput {
  id: string;
}

export default function PostCommentInput({ id }: IPostCommentInput) {
  const { setIsCommentInProgress, isCommentInProgress, showReply, setShowReply } =
    useCommentStore();
  const queryClient = useQueryClient();
  const { accessToken, isLogin } = useAuthStore.getState();

  const { register, handleSubmit } = useFormContext<{ commentContent: string }>();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  const { mutate: writeComment } = useMutation({
    mutationFn: (data: string) =>
      PostComment(id, { parentId: showReply, content: data }, accessToken),
    onSettled: () => setIsCommentInProgress(true),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['COMMENTS', id] });
      setIsCommentInProgress(false);
      setShowReply(null);
    },
    onError: (error) => console.log(error),
  });

  const resizeHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const onSubmit = async (data: { commentContent: string }) => {
    if (isCommentInProgress) {
      return;
    }
    console.log('찍히긴하나');
    console.log(data);

    writeComment(data.commentContent);
  };

  return (
    <div className='mb-[20px] flex grow flex-col'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          className='h-[35px] w-[100%] resize-none overflow-hidden rounded-[20px] border-2 border-[#8A1F21] px-[10px] py-[5px] text-[13px] focus:outline-none'
          {...register('commentContent', {
            required: true,
            onChange: () => resizeHeight(),
          })}
          ref={textareaRef}
          onFocus={() => {
            if (!isLogin) {
              setIsLoginModalOpen(true);
            } else {
              setShowReply(null);
            }
          }}
        />
        <div className='flex w-full justify-end mt-[3px]'>
          <button
            className='row-end flex-end flex items-center text-[12px] text-[#8A1F21]'
            type='submit'
          >
            <p className='mr-[4px]'>등록</p>
            <BsArrowUpCircle />
          </button>
        </div>
      </form>

      {isCommentInProgress && !showReply && <Loading />}
      {isLoginModalOpen && (
        <ModalLayout setIsModalOpen={setIsLoginModalOpen}>
          <AlertLoginModal />
        </ModalLayout>
      )}
    </div>
  );
}
