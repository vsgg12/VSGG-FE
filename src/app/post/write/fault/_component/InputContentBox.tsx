'use client';

import { ChangeEvent, memo, useRef } from 'react';
import { Setter } from '@/store/zustandTypes';
import { IWriteField } from '@/store/write/useWriteStore';

interface Props {
  titleClass: string;
  content: string; // 순수 text
  setData: Setter<IWriteField>;
  boxBase: string;
}

const MAX_LINES = 12;
const MIN_HEIGHT = 200;
const MAX_HEIGHT = 312;

const LINE_HEIGHT = 24;
const PADDING_Y = 24;

const InputContentBox = ({ titleClass, content, setData, boxBase }: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const el = textareaRef.current;
    if (!el) return;

    const { value } = e.currentTarget;

    // 디바운스 없이 입력 즉시 전역 스토어 업데이트
    setData('content', value);

    el.style.height = `${MIN_HEIGHT}px`;

    const contentHeight = el.scrollHeight - PADDING_Y;
    const visibleLines = Math.ceil(contentHeight / LINE_HEIGHT);

    if (visibleLines > MAX_LINES) {
      el.style.height = `${Math.min(Math.max(el.scrollHeight, MIN_HEIGHT), MAX_HEIGHT)}px`;
      return;
    }

    el.style.height = `${Math.min(el.scrollHeight, MAX_HEIGHT)}px`;
  };

  return (
    <div className='flex flex-col gap-[20px]'>
      <div className={titleClass}>본문</div>

      <div className={'flex flex-col gap-[10px]'}>
        <textarea
          ref={textareaRef}
          value={content}
          maxLength={1000}
          onChange={handleChange}
          placeholder='본문을 입력해주세요'
          className={`w-[652px] min-h-[200px] max-h-[312px] overflow-hidden resize-y rounded-[20px] text-[16px] leading-[24px] px-4 py-3 outline-none border-[#C8C8C8] focus-within:border-[1px] focus-within:border-[#8A1F21] ${boxBase}`}
        />
        <div className='text-[14px] text-gray-400 flex justify-end gap-[5px]'>
          <span className={'text-[#8A1F21]'}>{content.length}</span>
          <span> / 1,000</span>
        </div>
      </div>
    </div>
  );
};

export default memo(InputContentBox);
