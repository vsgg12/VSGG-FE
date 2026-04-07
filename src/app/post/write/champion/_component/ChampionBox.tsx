import React from 'react';
import { clsx } from 'clsx';

interface Props {
  claim: string;
  setClaim: (claim: string) => void;
  placeholder?: string;
}

const MAX_LENGTH = 34;

const ChampionBox = ({ claim, setClaim, placeholder = '내용을 입력해주세요.' }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    if (value.length > MAX_LENGTH) return;
    setClaim(value);
  };

  return (
    <input
      type='text'
      value={claim}
      onChange={handleChange}
      placeholder={placeholder}
      maxLength={MAX_LENGTH}
      className={clsx(
        'w-full px-[20px] py-[10px] h-[47px] text-[18px]',
        'border-[0.5px] border-[#C8C8C8] bg-white rounded-[8px]',
        'hover:shadow-lg',
        'focus:border-[#8A1F21] outline-none',
        'transition-all duration-200',
        'placeholder:text-gray-400',
      )}
    />
  );
};

export default ChampionBox;
