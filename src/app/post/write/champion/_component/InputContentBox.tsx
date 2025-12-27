import { ChangeEvent, Dispatch, memo, SetStateAction, useRef } from 'react';
import { Setter } from '@/store/zustandTypes';
import { IWriteField } from '@/store/write/useWriteStore';

interface Props {
  titleClass: string;
  setActiveBox: Dispatch<SetStateAction<null | 'video' | 'title' | 'content'>>;
  content: string;
  getBoxClass: (key: string) => string;
  setData: Setter<IWriteField>;
}

const MAX_LINES = 12;
const MIN_HEIGHT = 200;
const MAX_HEIGHT = 312;

const LINE_HEIGHT = 24; // leading-[24px]
const PADDING_Y = 24;   // py-3 → 12px * 2

const InputContentBox = ({
                           titleClass,
                           content,
                           setActiveBox,
                           getBoxClass,
                           setData,
                         }: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const el = textareaRef.current;
    if (!el) {
      return;
    }

    const value = e.target.value;

    // height 초기화
    el.style.height = `${MIN_HEIGHT}px`;

    const contentHeight = el.scrollHeight - PADDING_Y;
    const visibleLines = Math.ceil(contentHeight / LINE_HEIGHT);

    // 12줄 초과 차단
    if (visibleLines > MAX_LINES) {
      el.style.height = `${Math.min(
        Math.max(el.scrollHeight, MIN_HEIGHT),
        MAX_HEIGHT
      )}px`;
      return;
    }

    el.style.height = `${Math.min(el.scrollHeight, MAX_HEIGHT)}px`;

    setData('content', value);
  };

  return (
    <div className="flex flex-col gap-[20px]">
      <div className={titleClass}>본문</div>

      <div className={"flex flex-col gap-[10px]"}>
        <textarea
          ref={textareaRef}
          value={content ?? ''}
          maxLength={1000}
          onFocus={() => setActiveBox('content')}
          onChange={handleChange}
          placeholder="본문을 입력해주세요"
          className={`w-[652px] min-h-[200px] max-h-[312px] overflow-hidden resize-y rounded-[20px] text-[16px] leading-[24px] px-4 py-3 outline-none ${getBoxClass(
            'content'
          )}`}
        />
        {/* 글자수 */}
        <div className="text-[14px] text-gray-400 flex justify-end gap-[5px]">
          <span className={'text-[#8A1F21]'}>
            {content.length}
          </span>
          <span> / 1,000</span>
        </div>

      </div>

    </div>

  );
};

export default memo(InputContentBox);
