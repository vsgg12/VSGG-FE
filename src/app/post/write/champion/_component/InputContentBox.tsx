'use client';

import { ChangeEvent, memo, useEffect, useRef, useState } from 'react';
import { Setter } from '@/store/zustandTypes';
import { IWriteField } from '@/store/write/useWriteStore';
import editorTextToHtml from '@/utils/write/content/editorTextToHtml';
import htmlToEditorText from '@/utils/write/content/htmlToEditorText';

interface Props {
  titleClass: string;
  content: string; // html 문자열
  setData: Setter<IWriteField>;
  boxBase: string;
}

const MAX_LINES = 12;
const MIN_HEIGHT = 200;
const MAX_HEIGHT = 312;

const LINE_HEIGHT = 24; // leading-[24px]
const PADDING_Y = 24; // py-3 → 12px * 2

const InputContentBox = ({ titleClass, content, setData, boxBase }: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // textarea에서 보여줄 값
  const [editorValue, setEditorValue] = useState<string>('');

  /** HTML → textarea 텍스트 변환 - debounce 적용 */
  useEffect(() => {
    const id = setTimeout(() => {
      const html = editorTextToHtml(editorValue);
      setData('content', html);
    }, 300);

    return () => clearTimeout(id);
  }, [editorValue, setData]);

  /** 초기에 props로 받은 content(html 문자열) -> 순수 문자열로 바꿈 */
  useEffect(() => {
    // content가 없으면 빈 문자열
    if (!content) {
      setEditorValue('');
      return;
    }

    const text = htmlToEditorText(content);
    setEditorValue(text);
  }, [content]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const el = textareaRef.current;
    if (!el) return;

    const value = e.target.value;
    setEditorValue(value);

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
          value={editorValue}
          maxLength={1000}
          onChange={handleChange}
          placeholder='본문을 입력해주세요'
          className={`w-[652px] min-h-[200px] max-h-[312px] overflow-hidden resize-y rounded-[20px] text-[16px] leading-[24px] px-4 py-3 outline-none border-[#C8C8C8] focus-within:border-[1px] focus-within:border-[#8A1F21] ${boxBase}`}
        />
        {/* 글자수 */}
        <div className='text-[14px] text-gray-400 flex justify-end gap-[5px]'>
          <span className={'text-[#8A1F21]'}>{editorValue.length}</span>
          <span> / 1,000</span>
        </div>
      </div>
    </div>
  );
};

export default memo(InputContentBox);
