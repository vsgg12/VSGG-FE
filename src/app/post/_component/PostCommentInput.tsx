import { useAuthStore } from '@/app/login/store/useAuthStore';
import { useRef, useState } from 'react';
import ModalLayout from '@/components/modals/ModalLayout';
import AlertLoginModal from '@/components/modals/AlertLoginModal';
import { useFormContext } from 'react-hook-form';

interface IPostCommentInputProps {
  registerName: 'commentContent' | 'replyContent';
}

export default function PostCommentInput({ registerName }: IPostCommentInputProps) {
  const { register } = useFormContext<{ commentContent: string; replyContent: string }>();
  const { ref, ...rest } = register(registerName, { required: true });
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
        className='h-[35px] max-h-[200px] w-[100%] overflow-scroll rounded-[20px] border-2 border-[#8A1F21] px-[10px] py-[5px] text-[13px] focus:outline-none resize-none'
        {...rest}
        ref={(e) => {
          ref(e);
          textareaRef.current = e;
        }}
        onChange={() => resizeHeight()}
        maxLength={300}
        onFocus={() => {
          if (!isLogin) {
            setIsLoginModalOpen(true);
          }
        }}
      />
      {isLoginModalOpen && (
        <ModalLayout setIsModalOpen={setIsLoginModalOpen}>
          <AlertLoginModal />
        </ModalLayout>
      )}
    </div>
  );
}
