import Image from 'next/image';
import redDropDownIcon from '../../../../../../public/svg/postWrite/redDropDownIcon.svg';
import dropDownIcon from '../../../../../../public/svg/postWrite/dropDownIcon.svg';
import { Dispatch, SetStateAction } from 'react';
import { VOTE_END_TIME_OPTIONS } from '@/store/write/useWriteStore';

interface Props {
  titleClass: string;
  setEndTimeBoxClicked: Dispatch<SetStateAction<boolean>>;
  selectedEndTime: number;
  endTimeBoxClicked: boolean;
  setSelectedEndTime: Dispatch<SetStateAction<number>>;
}

const SelectVoteEndTimeBox = ({
  titleClass,
  selectedEndTime,
  setEndTimeBoxClicked,
  endTimeBoxClicked,
  setSelectedEndTime,
}: Props) => {
  return (
    <div className='flex flex-col gap-[20px]'>
      <div className={titleClass}>판결 종료 시간</div>

      <div
        className={`relative w-full h-[47px] rounded-[10px] bg-white border-[0.5px] transition-shadow duration-300 hover:shadow-lg
        ${endTimeBoxClicked ? 'border-[#8A1F21]' : 'border-[#C8C8C8]'}`}
      >
        {/* 실제 select */}
        <select
          value={selectedEndTime}
          onChange={(e) => setSelectedEndTime(Number(e.target.value))}
          onFocus={() => setEndTimeBoxClicked(true)}
          onBlur={() => setEndTimeBoxClicked(false)}
          className='
            w-full h-full appearance-none bg-transparent
            px-[20px] text-[18px] text-[#333333]
            cursor-pointer outline-none
          '
        >
          {VOTE_END_TIME_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* 드롭다운 아이콘 */}
        <div className='pointer-events-none absolute right-[20px] top-1/2 -translate-y-1/2 h-[18px] w-[18px] flex items-center'>
          <Image
            width={10}
            height={8}
            src={endTimeBoxClicked ? redDropDownIcon : dropDownIcon}
            alt='dropDownIcon'
          />
        </div>
      </div>
    </div>
  );
};

export default SelectVoteEndTimeBox;
