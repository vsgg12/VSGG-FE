'use client';

import HalfDoughnutChart from '@/components/HalfDoughnutChart';
import BarChart from '@/components/BarChart';
import Logo from '@/components/Logo';
import Header from '@/components/Header';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ModalLayout from '@/components/modals/ModalLayout';
import ChangeProfileModal from '@/components/modals/ChangeProfileModal';
import { useAuthStore } from '../login/store/useAuthStore';
import { useQuery } from '@tanstack/react-query';
import getMyPostLists from '@/api/getMyPostLists';
import getMyProfileDTO from '@/api/getMyProfileDTO';
import MyPostList from '@/app/myPage/_component/MyPostList';
import Image from 'next/image';
import editProfileIcon from '../../../public/svg/editProfileIcon.svg';
import BackArrowIcon from '../../../public/svg/mobile/backArrowIcon.svg';
import getMyJudgeList from '@/api/getMyJudgeList';
import MyJudgeList from './_component/MyJudgeList';
import { formatNumberWithCommas } from '@/utils/formatNumberWithCommas';
import IsNotExistList from './_component/IsNotExistList';
import { useMediaQuery } from 'react-responsive';
import MobileHeader from '@/components/mobile/Headers/MobileHeader';

export default function MyPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const user = useAuthStore((state) => state.user);
  const { accessToken } = useAuthStore();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const handleLogoutBtnClick = (): void => {
    useAuthStore.setState({ isLogin: false, accessToken: '', refreshToken: '' });
    localStorage.clear();
    router.push('/');
  };

  const { data: userProfileData } = useQuery({
    queryKey: ['MY_PROFILE_INFO'],
    queryFn: () => getMyProfileDTO(accessToken),
  });

  const { data: myPostLists } = useQuery({
    queryKey: ['MY_POST_LISTS'],
    queryFn: () => getMyPostLists({ token: accessToken, size: '5', page: '1' }),
  });

  const { data: myJudgeLists } = useQuery({
    queryKey: ['MY_JUDGE_LISTS'],
    queryFn: () => getMyJudgeList({ token: accessToken, size: '5', page: '1' }),
  });

  return (
    <>
      {isMobile ? (
        <div className='px-[10px] h-[100dvh]'>
          <>
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
                          <BarChart
                            num={userProfileData.memberProfileDTO.joinedResult}
                            isMobile={true}
                          />
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
          </>
        </div>
      ) : (
        <div className='min-w-[1480px]'>
          <div className='flex min-w-[1350px]'>
            <Header />
          </div>
          <div className='mb-[100px] mt-[150px] flex flex-col items-center justify-center gap-[32px] min-w-[1280px]'>
            <Logo />
          </div>
          {userProfileData && user && (
            <div className='flex justify-center gap-10'>
              <div className='flex flex-col gap-10 mb-20'>
                <div className='w-[338px] min-h-[820px] max-h-[840px] flex flex-col items-center  gap-[20px] rounded-[30px] bg-white px-10 py-10'>
                  <div className='flex gap-3 items-center'>
                    <div className='text-[20px] font-medium'>
                      {userProfileData.memberProfileDTO.nickName} 님
                    </div>
                  </div>
                  <div className='h-[135px] w-[135px] rounded-full relative'>
                    <img
                      src={
                        userProfileData.memberProfileDTO.profileUrl === 'none'
                          ? 'https://ssl.pstatic.net/static/pwe/address/img_profile.png'
                          : userProfileData.memberProfileDTO.profileUrl
                      }
                      alt='profileImage'
                      className='h-[135px] w-[135px] rounded-full border'
                    />
                    <Image
                      src={editProfileIcon}
                      width={30}
                      height={30}
                      alt='프로필 편집 아이콘'
                      className='absolute right-0 translate-x-2 translate-y-[-30px] cursor-pointer'
                      onClick={() => setIsModalOpen(true)}
                    />
                  </div>
                  <div className='text-[20px] font-medium'>
                    {userProfileData.memberProfileDTO.tier}
                  </div>
                  <div className='text-[16px] mb-[5px] font-medium'>
                    보유 포인트 : {formatNumberWithCommas(userProfileData.memberProfileDTO.point)}P
                  </div>
                  <div className='h-1 w-full bg-[#8A1F21]' />
                  <div className='h-[350px] flex flex-col items-center relative'>
                    <p className='text-[14px] translate-x-[-80px] font-[400]'>판결 승률</p>
                    <div className='absolute w-[180px]'>
                      <HalfDoughnutChart
                        win={userProfileData.memberProfileDTO.predicateResult}
                        lose={
                          userProfileData.memberProfileDTO.joinedResult -
                          userProfileData.memberProfileDTO.predicateResult
                        }
                      />
                    </div>
                    <div className='text-[#C3C3C3] text-[17px] absolute whitespace-nowrap bottom-[15px] font-[400]'>
                      {userProfileData.memberProfileDTO.joinedResult}전{' '}
                      {userProfileData.memberProfileDTO.predicateResult}승{' '}
                      {userProfileData.memberProfileDTO.joinedResult -
                        userProfileData.memberProfileDTO.predicateResult}
                      패
                    </div>
                  </div>
                  <div className='h-1 w-full bg-[#8A1F21]'></div>
                  <div className='flex w-full flex-col justify-center gap-5'>
                    <div className='text-[14px] translate-x-[20px] font-[400]'>
                      <span className='font-semibold'>
                        {userProfileData.memberProfileDTO.nextTier}
                      </span>{' '}
                      까지
                    </div>
                    <div className='flex flex-col items-center justify-center gap-2'>
                      <BarChart num={userProfileData.memberProfileDTO.joinedResult} />
                      <div className='text-[14px] font-[400] text-[#C3C3C3]'>{`판결 ${userProfileData.memberProfileDTO.joinedResult} / ${userProfileData.memberProfileDTO.nextJoinedResult}`}</div>
                    </div>
                    <div className='flex flex-col items-center justify-center gap-2'>
                      <BarChart num={userProfileData.memberProfileDTO.predicateResult} />
                      <div className='text-[14px] font-[400] text-[#C3C3C3]'>{`승리한 판결 ${userProfileData.memberProfileDTO.predicateResult} / ${userProfileData.memberProfileDTO.nextPredicateResult}`}</div>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col items-center justify-center rounded-[30px] bg-white p-10'>
                  <div>광고</div>
                </div>
              </div>
              <div className='flex flex-col gap-10 mb-20'>
                <div className='flex flex-col gap-3 rounded-[30px] bg-white px-8 py-6 pb-8 w-[960px] h-[466px]'>
                  <div className='flex justify-between font-medium'>
                    <div className='text-[20px] mb-[20px]'>판결 전적</div>
                    <div
                      className='text-[14px] cursor-pointer'
                      onClick={() => {
                        router.push('/myPage/judgeRecord');
                      }}
                    >
                      더보기
                    </div>
                  </div>
                  <div className='flex justify-between text-[12px] font-medium text-[#C3C3C3] mb-[12px]'>
                    <div>제목</div>
                    <div className='w-[300px] flex justify-between'>
                      <div>게시자</div>
                      <div className='mr-[20px]'>작성일</div>
                    </div>
                  </div>
                  {myJudgeLists && myJudgeLists.postList?.length !== 0 ? (
                    <MyJudgeList myJudgeList={myJudgeLists.postList} />
                  ) : (
                    <div className='flex justify-center items-center w-full h-full'>
                      <IsNotExistList type='myJudge' />
                    </div>
                  )}
                </div>

                <div className='flex flex-col gap-3 rounded-[30px] bg-white px-8 py-6 pb-8 w-[960px] h-[478px] font-semibold'>
                  <div className='flex justify-between items-center font-medium'>
                    <div className='text-[20px] mb-[20px]'>내가 쓴 글</div>
                    <div
                      className='cursor-pointer text-[14px]'
                      onClick={() => {
                        router.push('/myPage/myPosts');
                      }}
                    >
                      더보기
                    </div>
                  </div>

                  <div className='flex justify-between items-center text-[12px] font-medium text-[#C3C3C3] mb-[12px]'>
                    <div>제목</div>
                    <div className='w-[300px] flex justify-between'>
                      <div>댓글수</div>
                      <div className='mr-[20px]'>작성일</div>
                    </div>
                  </div>
                  {myPostLists && myPostLists.postList?.length !== 0 ? (
                    <MyPostList myPostList={myPostLists.postList} />
                  ) : (
                    <div className='flex justify-center items-center w-full h-full'>
                      <IsNotExistList type='myPost' />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {isModalOpen && userProfileData && user && (
            <ModalLayout setIsModalOpen={setIsModalOpen}>
              <ChangeProfileModal
                setIsModalOpen={setIsModalOpen}
                userName={userProfileData.memberProfileDTO.nickName}
                userProfileImage={userProfileData.memberProfileDTO.profileUrl}
              />
            </ModalLayout>
          )}
        </div>
      )}
    </>
  );
}
