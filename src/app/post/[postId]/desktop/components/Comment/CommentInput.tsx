import { useAuthStore } from '@/app/login/store/useAuthStore';
import { KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
import ModalLayout from '@/components/modals/ModalLayout';
import { useFormContext } from 'react-hook-form';

interface IPostCommentInputProps {
  targetNickname: string;
}

export default function CommentInput({ targetNickname }: IPostCommentInputProps) {
  const { register } = useFormContext<{ commentContent: string }>();
  const { ref, ...rest } = register('commentContent', { required: true });
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { isLogin } = useAuthStore();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const { setValue, getValues } = useFormContext();

  useEffect(() => {
    handleFocusTextarea();

    if (targetNickname && textareaRef.current) {
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
        // 최대 줄 수에 맞게 텍스트를 잘라냄
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

  const handleFocusTextarea = useCallback(() => {
    if (targetNickname && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [targetNickname]);

  useEffect(() => {
    handleFocusTextarea();

    if (targetNickname) {
      const currentValue = getValues('commentContent');
      if (!currentValue?.startsWith(`@${targetNickname}`)) {
        setValue('commentContent', `@${targetNickname} `);
      }
    }
  }, [targetNickname, setValue, getValues, handleFocusTextarea]);

  return (
    <div className='min-h-[20px] w-[452px] rounded-[30px] flex bg-[#FFFFFF] py-[10px] px-[20px]'>
      <textarea
        className='w-full h-[20px] overflow-scroll text-[14px] box-border focus:outline-none resize-none scrollbar-hide'
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
        placeholder={
          targetNickname
            ? `@${targetNickname}`
            : '댓글 달기 선플을 달아서 클린한 인터넷 문화를 만들어요'
        }
      />
      <button type='submit'>
        <p className='font-bold text-[12px] text-[#E20A29] whitespace-nowrap'>등록</p>
      </button>
      {isLoginModalOpen && (
        <ModalLayout setIsModalOpen={setIsLoginModalOpen}>
          {/* <AlertLoginModal /> */}
          <div></div>
        </ModalLayout>
      )}
    </div>
  );
}
