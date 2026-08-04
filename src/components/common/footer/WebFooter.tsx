'use client';

import { useSidebarStore } from '@/store/sidebar/useSidebarStore';
import LinkUtils from '@/utils/link/linkUtils';

const WebFooter = () => {
  const isDarkMode = useSidebarStore((state) => state.isDarkMode);

  const footerClass = isDarkMode
    ? 'border-t-[#484B4D] bg-[#242526]'
    : 'border-t-[#E5E6E6] bg-[#F8F9FA]';
  const headlineClass = isDarkMode
    ? 'bg-[#F1F2F2] text-[#303233]'
    : 'bg-[#303233] text-[#F1F2F2]';
  const sloganClass = isDarkMode ? 'text-[#F1F2F2]' : 'text-[#C9CBCC]';
  const serviceTextClass = isDarkMode ? 'text-[#D7D8D9]' : 'text-[#484B4D]';
  const linkTextClass = isDarkMode ? 'text-[#F1F2F2]' : 'text-[#242526]';

  return (
    <div className={`w-full border-t ${footerClass}`}>
      <div
        className={
          'mx-auto flex h-[500px] max-w-[1920px] items-center justify-between px-[48px] xl:px-[80px]'
        }
      >
        {/*왼쪽 영역*/}
        <div className={'flex flex-col items-start'}>
          {/* 로고 영역을 div로 감싸서 Flex 꼬임 방지 및 명확한 왼쪽 정렬 */}
          <div>
            {/* 라이트모드용 로고: 기본적으로 보이고, 다크모드(.dark)에서는 숨김 */}
            <img
              src='/logo/horizontal/logo-horizontal-red.svg'
              alt='VS.GG'
              className='block h-[30px] w-auto dark:block'
            />

            {/* 다크모드용 로고: 기본적으로 숨기고, 다크모드(.dark)에서만 보임 */}
            <img
              src='/logo/horizontal/logo-horizontal-white.svg'
              alt='VS.GG'
              className='hidden h-[30px] w-auto dark:hidden'
            />
          </div>

          <div
            className={`mt-[72px] flex h-[24px] w-fit items-center px-[4px] text-[20px] font-extrabold leading-[24px] ${headlineClass}`}
          >
            리그 오브 레전드(LOL) 과실 판결 커뮤니티
          </div>
          <div className={`mt-[32px] text-[16px] font-semibold leading-[19px] ${sloganClass}`}>
            "소환사라면 한 번쯤은 겪어보았을 문제 상황에 판결과 논쟁을 더하다"
          </div>
        </div>

        {/*오른쪽 영역*/}
        <div className={`flex flex-col gap-[20px] text-[12px] ${serviceTextClass}`}>
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
              <span
                className={`cursor-pointer underline ${linkTextClass}`}
                onClick={LinkUtils.handleServiceTermClick}
              >
                이용약관
              </span>
              <span
                className={`cursor-pointer underline ${linkTextClass}`}
                onClick={LinkUtils.handlePersonalInfoTermClick}
              >
                개인정보처리방침
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebFooter;
