'use client';

import Image from 'next/image';
import connectIdIcon from '../../../../../../public/svg/postWrite/connectIdIcon.svg';

interface Props {
  titleClass: string;
}

const ConnectRiotButton = ({ titleClass }: Props) => {
  return (
    <div className={'flex flex-col gap-[20px]'}>
      <div className={titleClass}>소환사 입력</div>
      <div className='relative group'>
        <div
          className='w-full py-[10px] px-[20px] rounded-[10px] font-bold text-[18px] text-white flex justify-center items-center gap-[10px] cursor-pointer'
          style={{
            background: 'linear-gradient(90deg, #FF0028 0%, #FF7370 100%)',
          }}
        >
          <Image src={connectIdIcon} alt='계정 연결 아이콘' width={23} height={21} />
          <div>내 소환사 계정 연동하기</div>
        </div>

        {/* 말풍선 */}
        <div className='absolute right-0 top-full opacity-0 translate-y-[-4px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 pointer-events-none z-10'>
          <div className='relative bg-[#F3F3F3] text-[#999999] text-[14px] px-[16px] py-[10px] rounded-[12px] shadow-md whitespace-nowrap'>
            준비 중인 기능입니다 :)
            {/* 말풍선 꼬리 */}
            <div className='absolute -top-[6px] right-[70px] w-0 h-0 border-l-[6px] border-r-[6px] border-b-[6px] border-l-transparent border-r-transparent border-b-[#F3F3F3]' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectRiotButton;
