'use client';

import { memo } from 'react';
import { PostAddRequestType } from '@/store/write/useWriteStore';

interface Props {
  titleClass: string;
  title: string;
  setPostRequestData: <K extends keyof PostAddRequestType>(
    key: K,
    value: PostAddRequestType[K],
  ) => void;
  boxBase: string;
}

const InputTitleBox = ({ titleClass, title, setPostRequestData, boxBase }: Props) => {
  return (
    <div className={'flex flex-col gap-[20px]'}>
      <div className={titleClass}>제목</div>
      <input
        type='text'
        value={title ?? ''}
        maxLength={35}
        onChange={(e) => {
          const value = e.target.value.trim();
          setPostRequestData('title', value);
        }}
        placeholder='제목을 입력해주세요.'
        className={`w-[652px] h-[64px] text-[20px] rounded-[20px] px-4 outline-none border-[#C8C8C8] focus-within:border-[1px] focus-within:border-[#8A1F21] ${boxBase}`}
      />
    </div>
  );
};

export default memo(InputTitleBox);
