import Loading from '@/components/Loading';
import useCommentStore from '../[postId]/store/useCommentStore';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import { useRef, useState } from 'react';
import ModalLayout from '@/components/modals/ModalLayout';
import AlertLoginModal from '@/components/modals/AlertLoginModal';
import { useFormContext } from 'react-hook-form';

export default function PostCommentInput() {
  const { isCommentInProgress, showReply, setShowReply } = useCommentStore();
  const { register } = useFormContext<{ commentContent: string }>();
  const { ref, ...rest } = register('commentContent', { required: true });
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const { isLogin } = useAuthStore.getState();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const resizeHeight = () => {
    if (textareaRef.current) {
      const lineHeight = parseInt(getComputedStyle(textareaRef.current).lineHeight || '20px', 10);
      const maxLines = 10;
      const maxHeight = lineHeight * maxLines;

      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, maxHeight)}px`;
    }
  };

  return (
    <div>
      <textarea
        className='h-[35px] max-h-[200px] w-[100%] overflow-hidden rounded-[20px] border-2 border-[#8A1F21] px-[10px] py-[5px] text-[13px] focus:outline-none'
        {...rest}
        ref={(e) => {
          ref(e);
          textareaRef.current = e;
        }}
        onChange={() => resizeHeight()}
        onFocus={() => {
          if (!isLogin) {
            setIsLoginModalOpen(true);
          }
          setShowReply(null);
        }}
      />
      {isCommentInProgress && !showReply && <Loading />}
      {isLoginModalOpen && (
        <ModalLayout setIsModalOpen={setIsLoginModalOpen}>
          <AlertLoginModal />
        </ModalLayout>
      )}
    </div>
  );
}
