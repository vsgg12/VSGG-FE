'use client';

import getMyProfileDTO from '@/api/getMyProfileDTO';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import BarChart from '@/components/BarChart';
import HalfDoughnutChart from '@/components/HalfDoughnutChart';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import BackArrowIcon from '../../../../public/svg/mobile/backArrowIcon.svg';
import MobileHeader from '@/components/mobile/Headers/MobileHeader';
import IsNotExistList from '../_component/IsNotExistList';

function MyPage_Mobile() {
  const { accessToken, user, isLogin } = useAuthStore.getState();

  const router = useRouter();

  const { data: userProfileData } = useQuery({
    queryKey: ['MY_PROFILE_INFO'],
    queryFn: () => getMyProfileDTO(accessToken),
  });

  useEffect(() => {
    if (!isLogin) {
      router.push('/login');
    }
  }, [isLogin, router]);

  const handleLogoutBtnClick = (): void => {
    useAuthStore.setState({ isLogin: false, accessToken: '', refreshToken: '' });
    localStorage.clear();
    router.push('/');
  };

  return (
    <div className='px-[10px] h-[100dvh]'>
      {userProfileData && (
        <>
          <MobileHeader headerTitle='마이페이지' />
          <div className='mobile-layout flex flex-col flex-grow items-center px-[10px] py-[20px] gap-[20px] mobile-scroll'>
            <div className='w-full h-[100px] bg-white rounded-[20px] p-[20px] flex justify-between items-center'>
              <div className='flex gap-[10px]'>
                <div className='h-[60px] w-[60px] rounded-full relative'>
                  <img
                    src={
                      userProfileData.memberProfileDTO.profileUrl === 'none'
                        ? 'https://ssl.pstatic.net/static/pwe/address/img_profile.png'
                        : userProfileData.memberProfileDTO.profileUrl
                    }
                    alt='profileImage'
                    className='h-full w-full rounded-full border'
                  />
                </div>
                <div className='flex flex-col justify-center gap-[1px]'>
                  <div className='flex items-center text-[16px] font-semibold text-[#333333]'>
                    {userProfileData.memberProfileDTO.nickName}
                  </div>
                  <div className='flex items-center text-[12px] font-medium text-[#666666]'>
                    @ {user?.email}
                  </div>
                </div>
              </div>
              <div
                className='w-[85px] h-[29px] rounded-[5px] bg-[#ECECEC] text-[#333333] flex justify-center items-center p-[6px] text-[14px] font-semibold whitespace-nowrap cursor-pointer'
                onClick={() => router.push('/myPage/modifyProfile')}
              >
                프로필 수정
              </div>
            </div>
            <div className='flex w-full min-h-[176px] rounded-[20px] bg-white p-[20px] relative'>
              <div className='text-[18px] font-bold text-[#333333]'>판결 승률</div>
              {userProfileData.memberProfileDTO.joinedResult === 0 ? (
                <div className='absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-25%]'>
                  <IsNotExistList type='myJudge' isMobile={true} />
                </div>
              ) : (
                <>
                  <div className='absolute w-[160px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                    <HalfDoughnutChart
                      win={userProfileData.memberProfileDTO.predicateResult}
                      lose={
                        userProfileData.memberProfileDTO.joinedResult -
                        userProfileData.memberProfileDTO.predicateResult
                      }
                      isMobile={true}
                    />
                  </div>
                  <div className='text-[#828282] text-[12px] absolute whitespace-nowrap font-[400] bottom-[23px] left-[50%] translate-x-[-50%]'>
                    {userProfileData.memberProfileDTO.joinedResult}전{' '}
                    {userProfileData.memberProfileDTO.predicateResult}승{' '}
                    {userProfileData.memberProfileDTO.joinedResult -
                      userProfileData.memberProfileDTO.predicateResult}
                    패
                  </div>
                </>
              )}
            </div>
            <div className='flex flex-col w-full min-h-[176px] p-[20px] rounded-[20px] gap-[15px] bg-white'>
              <div className='text-[18px] font-bold text-[#333333]'>
                {userProfileData.memberProfileDTO.nextTier} 까지
              </div>
              {userProfileData.memberProfileDTO.joinedResult === 0 ? (
                <div className='flex justify-center items-center'>
                  <IsNotExistList type='myJudge' isMobile={true} />
                </div>
              ) : (
                <div className='flex flex-col gap-[5px]'>
                  <div className='flex flex-col items-center justify-center gap-[4px]'>
                    <BarChart num={userProfileData.memberProfileDTO.joinedResult} isMobile={true} />
                    <div className='text-[14px] font-[400] text-[#C3C3C3]'>{`판결 ${userProfileData.memberProfileDTO.joinedResult} / ${userProfileData.memberProfileDTO.nextJoinedResult}`}</div>
                  </div>
                  <div className='flex flex-col items-center justify-center gap-[4px]'>
                    <BarChart
                      num={userProfileData.memberProfileDTO.predicateResult}
                      isMobile={true}
                    />
                    <div className='text-[14px] font-[400] text-[#C3C3C3]'>{`승리한 판결 ${userProfileData.memberProfileDTO.predicateResult} / ${userProfileData.memberProfileDTO.nextPredicateResult}`}</div>
                  </div>
                </div>
              )}
            </div>
            <div
              className='flex justify-between items-center p-[20px] w-full h-[72px] rounded-[20px] bg-white cursor-pointer'
              onClick={() => router.push('/myPage/judgeRecord')}
            >
              <div className='text-[18px] font-bold text-[#333333]'>판결 전적</div>
              <Image src={BackArrowIcon} alt='ArrowIcon' className='rotate-180' />
            </div>
            <div
              className='flex justify-between items-center p-[20px] w-full h-[72px] rounded-[20px] bg-white cursor-pointer'
              onClick={() => router.push('/myPage/myPosts')}
            >
              <div className='text-[18px] font-bold text-[#333333]'>내가 쓴 글</div>
              <Image src={BackArrowIcon} alt='ArrowIcon' className='rotate-180' />
            </div>
            <div
              className='text-[#7B7B7B] text-[14px] font-medium mt-[39px] cursor-pointer'
              onClick={handleLogoutBtnClick}
            >
              로그아웃
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default MyPage_Mobile;
