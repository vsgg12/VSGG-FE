'use client';

import { ChangeEventHandler, memo } from 'react';
import { PostAddRequestType } from '@/store/write/useWriteStore';

interface Props {
  titleClass: string;
  title: string;
  setPostAddRequest: <K extends keyof PostAddRequestType>(
    key: K,
    value: PostAddRequestType[K],
  ) => void;
  boxBase: string;
}

const InputTitleBox = ({ titleClass, title, setPostAddRequest, boxBase }: Props) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ currentTarget }) => {
    const value = currentTarget.value;
    setPostAddRequest('title', value);
  };

  return (
    <div className={'flex flex-col gap-[20px]'}>
      <div className={titleClass}>제목</div>
      <input
        type='text'
        value={title ?? ''}
        maxLength={35}
        onChange={handleChange}
        placeholder='제목을 입력해주세요.'
        className={`w-[652px] h-[64px] text-[20px] rounded-[10px] px-4 outline-none border-[#C8C8C8] focus-within:border-[1px] focus-within:border-[#E20A29] ${boxBase}`}
      />
    </div>
  );
};

export default memo(InputTitleBox);
