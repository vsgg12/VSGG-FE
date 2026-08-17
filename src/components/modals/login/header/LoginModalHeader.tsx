'use client';

const LoginModalHeader = () => {
  return (
    <div className={'flex flex-col gap-[12px] w-full h-[64px] text-center'}>
      {/* 로고와 로그인 텍스트를 가로로 정렬하고 중앙 배치 */}
      <div className={'flex items-center justify-center'}>
        {/* 라이트모드용 로고: 기본적으로 보이고, 다크모드(.dark)에서는 숨김 */}
        <img
          src='/logo/horizontal/logo-horizontal-red.svg'
          alt='VS.GG'
          className='block w-auto h-[28px] dark:block'
        />

        {/* 다크모드용 로고: 기본적으로 숨기고, 다크모드(.dark)에서만 보임 */}
        <img
          src='/logo/horizontal/logo-horizontal-white.svg'
          alt='VS.GG'
          className='hidden w-auto h-[28px] dark:hidden'
        />
      </div>

      <div className={'text-[16px] text-gray-700 font-medium'}>
        리그 오브 레전드에 진심인 사람들을 위한 커뮤니티!
      </div>
    </div>
  );
};

export default LoginModalHeader;
