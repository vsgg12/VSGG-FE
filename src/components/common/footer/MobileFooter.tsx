'use client';

import LinkUtils from '@/utils/link/linkUtils';

const MobileFooter = () => {
  return (
    <div
      className={'flex-col mx-[10px] h-[360px] pt-[50px] pb-[40px] flex justify-between bg-white'}
    >
      <div className='w-full h-[1px] bg-[#D7D8D9]'></div>
      <div className={'flex flex-col items-center gap-[20px] h-[111px]'}>
        <div>
          {/* 라이트모드용 로고: 기본적으로 보이고, 다크모드(.dark)에서는 숨김 */}
          <img
            src='/logo/horizontal/logo-horizontal-red.svg'
            alt='VS.GG'
            className='block w-auto h-[30px] dark:block'
          />

          {/* 다크모드용 로고: 기본적으로 숨기고, 다크모드(.dark)에서만 보임 */}
          <img
            src='/logo/horizontal/logo-horizontal-white.svg'
            alt='VS.GG'
            className='hidden w-auto h-[30px] dark:hidden'
          />
        </div>

        <div
          className={
            'w-fit bg-[#303233] px-[4px] py-[2px] text-[20px] font-extrabold text-[#F1F2F2]'
          }
        >
          리그 오브 레전드(LOL) 과실 판결 커뮤니티
        </div>
        <div className={'text-[16px] font-semibold text-[#303233]'}>
          "소환사라면 한 번쯤은 겪어보았을 문제 상황에 판결과 논쟁을 더하다"
        </div>
      </div>
      <div className={'flex flex-col h-[111px] gap-[20px] text-[12px] text-[#333333]'}>
        <div className={'flex flex-col gap-[8px]'}>
          <div className={'font-bold'}>서비스</div>
          <div className={'flex gap-[12px]'}>
            <span>챔피언 과실 판결</span>
            <span>주장 판결(준비중)</span>
          </div>
        </div>

        <div className={'flex flex-col gap-[10px]'}>
          <div>©2024. VS.GG ALL RIGHTS RESERVED</div>
          <div className={'flex gap-[16px]'}>
            <span className={'underline cursor-pointer'} onClick={LinkUtils.handleServiceTermClick}>
              이용약관
            </span>
            <span
              className={'underline cursor-pointer'}
              onClick={LinkUtils.handlePersonalInfoTermClick}
            >
              개인정보처리방침
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileFooter;
