import { useAuthStore } from '@/app/login/store/useAuthStore';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import ModalLayout from '@/components/modals/ModalLayout';
import { useFormContext } from 'react-hook-form';
import AlertLoginModal_Mobile from '@/components/mobile/modals/AlertLoginModalMobile';

interface IPostCommentInputProps {
  targetNickname: string;
}

export default function CommentInputMobile({ targetNickname }: IPostCommentInputProps) {
  const { register } = useFormContext<{ commentContent: string }>();
  const { ref, ...rest } = register('commentContent', { required: true });
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { isLogin } = useAuthStore();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const { setValue, getValues } = useFormContext();

  useEffect(() => {
    handleFocusTextarea();

    if (targetNickname) {
      const currentValue = getValues('commentContent');
      if (!currentValue?.startsWith(`@${targetNickname}`)) {
        setValue('commentContent', `@${targetNickname} `);
      }
    }
  }, [targetNickname, setValue, getValues]);

  const resizeHeight = (e?: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e && (e.key !== 'Enter' || !e.shiftKey)) return; // Shift + Enter가 아닌 경우 무시

    if (textareaRef.current) {
      const lineHeight = parseInt(getComputedStyle(textareaRef.current).lineHeight || '40px', 10);
      const maxLines = 4;
      const maxTextLines = 10;
      const paddingVertical =
        parseInt(getComputedStyle(textareaRef.current).paddingTop) +
        parseInt(getComputedStyle(textareaRef.current).paddingBottom);
      const maxHeight = lineHeight * maxLines;

      textareaRef.current.style.height = 'auto';
      const currentLines = Math.floor(
        (textareaRef.current.scrollHeight - paddingVertical) / lineHeight,
      );

      if (currentLines > maxTextLines) {
        const text = textareaRef.current.value.split('\n');
        textareaRef.current.value = text.slice(0, maxTextLines).join('\n');
      }

      if (currentLines > 1) {
        const newHeight = Math.min(textareaRef.current.scrollHeight - paddingVertical, maxHeight);
        textareaRef.current.style.height = `${newHeight}px`;
      } else {
        textareaRef.current.style.height = '30px';
      }
      textareaRef.current.style.overflowY = currentLines > maxLines ? 'auto' : 'hidden';
    }
  };

  const handleEnterClick = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      if (textareaRef.current) {
        textareaRef.current.form?.dispatchEvent(
          new Event('submit', { bubbles: true, cancelable: true }),
        );
      }
    }
  };

  const handleFocusTextarea = () => {
    if (targetNickname && textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <div className='min-h-[40px] h-fit w-full rounded-[30px] border-2 border-[#8A1F21] flex bg-[#ffffff]'>
      <textarea
        className='h-[30px] w-full overflow-scroll ml-[12px] py-[8px] my-[5px] text-[12px] box-border focus:outline-none resize-none scrollbar-hide'
        {...rest}
        ref={(e) => {
          ref(e);
          textareaRef.current = e;
        }}
        onKeyDown={(e) => {
          resizeHeight(e); // Shift + Enter 시 높이 조정
          handleEnterClick(e); // Enter 시 제출 처리
        }}
        onInput={() => {
          resizeHeight();
        }}
        maxLength={300}
        onFocus={() => {
          if (!isLogin) {
            setIsLoginModalOpen(true);
          }
        }}
        placeholder={targetNickname && `@${targetNickname}`}
      />
      <button className='text-[12px] text-[#8A1F21]' type='submit'>
        <p className='mx-[20px] text-nowrap'>등록</p>
      </button>
      {isLoginModalOpen && (
        <ModalLayout setIsModalOpen={setIsLoginModalOpen}>
          <AlertLoginModal_Mobile />
        </ModalLayout>
      )}
    </div>
  );
}
