import { useAuthStore } from '@/app/login/store/useAuthStore';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import ModalLayout from '@/components/modals/ModalLayout';
import AlertLoginModal from '@/components/modals/AlertLoginModal';
import { useFormContext } from 'react-hook-form';

interface IPostCommentInputProps {
  registerName: 'commentContent' | 'replyContent';
  setShowReply?: Dispatch<SetStateAction<number | null>>;
  setIsCommentMoreModalOpen: Dispatch<SetStateAction<number | null>>;
}

export default function PostCommentInput({
  registerName,
  setShowReply,
  setIsCommentMoreModalOpen,
}: IPostCommentInputProps) {
  const { register } = useFormContext<{ commentContent: string; replyContent: string }>();
  const { ref, ...rest } = register(registerName, { required: true });
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { isLogin } = useAuthStore.getState();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  const resizeHeight = () => {
    if (textareaRef.current) {
      const lineHeight = parseInt(getComputedStyle(textareaRef.current).lineHeight || '40px', 10);
      const maxLines = 10;
      const paddingVertical =
        parseInt(getComputedStyle(textareaRef.current).paddingTop) +
        parseInt(getComputedStyle(textareaRef.current).paddingBottom);
      const maxHeight = lineHeight * maxLines;

      textareaRef.current.style.height = 'auto';
      // 현재 줄 수 계산
      const currentLines = Math.floor(
        (textareaRef.current.scrollHeight - paddingVertical) / lineHeight,
      );

      // 현재 줄 수가 1줄을 넘는 경우에만 높이를 조정
      if (currentLines > 1) {
        // 새로운 높이 계산 (패딩을 제외한 높이 조정)
        const newHeight = Math.min(textareaRef.current.scrollHeight - paddingVertical, maxHeight);

        // 새로운 높이 설정
        textareaRef.current.style.height = `${newHeight}px`;
      } else {
        // 첫 줄 입력 시 높이를 38px로 유지
        textareaRef.current.style.height = '40px';
      }
      textareaRef.current.style.overflowY = currentLines > maxLines ? 'auto' : 'hidden';
    }
  };

  return (
    <div>
      <textarea
        className='h-[40px] w-full overflow-scroll rounded-[20px] border-2 border-[#8A1F21] px-[10px] pt-[8px] pb-[12px] text-[12px] box-border focus:outline-none resize-none scrollbar-hide'
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
          if (registerName === 'commentContent') {
            setShowReply && setShowReply(null);
          }
          setIsCommentMoreModalOpen(null);
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
