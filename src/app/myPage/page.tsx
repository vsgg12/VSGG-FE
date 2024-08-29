'use client';

import HalfDoughnutChart from '@/components/HalfDoughnutChart';
import BarChart from '@/components/BarChart';
import Logo from '@/components/Logo';
import Header from '@/components/Header';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ModalLayout from '@/components/modals/ModalLayout';
import ChangeProfileModal from '@/components/modals/ChangeProfileModal';
import { useAuthStore } from '../login/store/useAuthStore';
import { useQuery } from '@tanstack/react-query';
import getMyPostLists from '@/api/getMyPostLists';

const data = [
  {
    nickName: 'hide on bush',
    tier: '그랜드마스터',
    point: '999,999',
    grade: '새싹',
    totalJudge: 100,
    winJudge: 30,
    loseJudge: 70,
    judgeCount: 50,
    winjudgeCount: 25,
  },
];

export default function MyPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const user = useAuthStore((state) => state.user);
  const { accessToken } = useAuthStore.getState();

  const { data: myPostLists } = useQuery({
    queryKey: ['MY_POST_LISTS'],
    queryFn: () => getMyPostLists(accessToken),
  });

  useEffect(() => {
    console.log(myPostLists);
  }, [myPostLists]);

  return (
    <div>
      <Header />
      <div className='mb-[100px] mt-[150px] flex flex-col items-center justify-center gap-[32px]'>
        <Logo />
      </div>
      {user &&
        data.map((userInfo) => (
          <div className='flex justify-center gap-10'>
            <div className='flex flex-col gap-10 mb-20'>
              <div className='w-[338px] h-[820px] flex flex-col items-center  gap-[30px] rounded-xl bg-white px-10 py-5'>
                <div className='flex gap-3 items-center'>
                  <div className='text-[20px] font-semibold'>{user.nickname} 님</div>
                  <div
                    className='text-[#8A1F21] text-[10px] font-semibold cursor-pointer'
                    onClick={() => setIsModalOpen(true)}
                  >
                    수정
                  </div>
                </div>
                <div className='h-[180px] w-[120px] rounded-full'>
                  <img
                    src={user.profile_image}
                    alt='profileImage'
                    className='h-full w-full rounded-full'
                  />
                </div>
                <div className='text-[20px]  font-semibold'>{userInfo.tier}</div>
                <div className='text-[16px] font-semibold'>보유 포인트 : {userInfo.point}P</div>
                <div className='h-0.5 w-full bg-[#8A1F21]' />
                <div className='h-[310px] flex flex-col items-center relative'>
                  <div className='text-[17px]'>판결 승률</div>
                  <div className='absolute w-[250px] top-[-20px]'>
                    <HalfDoughnutChart win={userInfo.winJudge} lose={userInfo.loseJudge} />
                  </div>

                  <div className='text-[#C3C3C3] text-[17px] absolute whitespace-nowrap bottom-[-10px]'>
                    {userInfo.totalJudge}전 {userInfo.winJudge}승 {userInfo.loseJudge}패
                  </div>
                </div>
                <div className='h-0.5 w-full bg-[#8A1F21]'></div>
                <div className='flex w-full flex-col justify-center gap-4'>
                  <div className='text-[17px]'>다음 등급까지</div>
                  <div className='flex flex-col items-center justify-center gap-2'>
                    <BarChart num={userInfo.judgeCount} />
                    <div className='text-[17px] text-[#C3C3C3]'>판결 50 / 100</div>
                  </div>
                  <div className='flex flex-col items-center justify-center gap-2'>
                    <BarChart num={userInfo.winjudgeCount} />
                    <div className='text-[17px] text-[#C3C3C3]'>승리한 판결 10 / 40</div>
                  </div>
                </div>
              </div>
              <div className='flex flex-col items-center justify-center rounded-xl bg-white p-10'>
                <div>광고</div>
              </div>
            </div>
            <div className='flex w-1/2 flex-col gap-10 mb-20'>
              <div className='flex flex-col gap-3 rounded-xl bg-white px-8 py-6 pb-8 w-[764.8px] h-[466px]'>
                <div className='flex justify-between font-semibold'>
                  <div>판결 전적</div>
                  <div
                    className='text-xs cursor-pointer'
                    onClick={() => {
                      router.push('/myPage/judgeRecord');
                    }}
                  >
                    더보기
                  </div>
                </div>
                <div className='flex text-xs text-[#C3C3C3]'>
                  <p className='self-start mr-[415px]'>제목</p>
                  <p className='mr-[170px]'>게시자</p>
                  <p>작성일</p>
                </div>
                <div className='flex justify-between whitespace-nowrap'>
                  <div>바론 앞 한타 갔어야한다 가지 말아야한다.</div>
                  <div className='flex gap-2 text-sm'>
                    <div>{userInfo.nickName}</div>
                    <div className='text-[#C3C3C3]'>{userInfo.grade}</div>
                  </div>
                  <div className='text-sm text-[#C3C3C3]'>2024.04.24</div>
                </div>
                <div className='h-0.5 w-full bg-[#8A1F21]'></div>
                <div className='flex justify-between'>
                  <div>바론 앞 한타 갔어야한다 가지 말아야한다.</div>
                  <div className='flex gap-2 text-sm'>
                    <div>{userInfo.nickName}</div>
                    <div className='text-[#C3C3C3]'>{userInfo.grade}</div>
                  </div>
                  <div className='text-sm text-[#C3C3C3]'>2024.04.24</div>
                </div>
                <div className='h-0.5 w-full bg-[#8A1F21]'></div>
              </div>
              <div className='flex flex-col gap-3 rounded-xl bg-white px-8 py-6 pb-8 w-[764.8px] h-[466px] font-semibold'>
                <div className='flex justify-between'>
                  <div>내가 쓴 글</div>
                  <div
                    className='text-xs cursor-pointer'
                    onClick={() => {
                      router.push('/myPage/myPosts');
                    }}
                  >
                    더보기
                  </div>
                </div>
                <div className='flex text-xs text-[#C3C3C3]'>
                  <div className='self-start mr-[415px]'>제목</div>
                  <div className='mr-[170px]'>댓글수</div>
                  <div>작성일</div>
                </div>
                <div className='flex justify-between'>
                  <p>바론 앞 한타 갔어야한다 가지 말아야한다.</p>
                  <div className='flex text-sm text-[#C3C3C3]'>
                    <div>5</div>
                  </div>
                  <div className='text-sm text-[#C3C3C3]'>2024.04.24</div>
                </div>
                <div className='h-0.5 w-full bg-[#8A1F21]'></div>
                <div className='flex justify-between'>
                  <p>바론 앞 한타 갔어야한다 가지 말아야한다.</p>
                  <div className='flex text-sm text-[#C3C3C3]'>
                    <div>5</div>
                  </div>
                  <div className='text-sm text-[#C3C3C3]'>2024.04.24</div>
                </div>
                <div className='h-0.5 w-full bg-[#8A1F21]'></div>
              </div>
            </div>
          </div>
        ))}
      {isModalOpen && user && (
        <ModalLayout setIsModalOpen={setIsModalOpen}>
          <ChangeProfileModal
            setIsModalOpen={setIsModalOpen}
            userName={user.nickname}
            userProfileImage={user.profile_image}
          />
        </ModalLayout>
      )}
    </div>
  );
}
