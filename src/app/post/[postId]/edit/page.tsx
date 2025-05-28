'use client';

import { useAuthStore } from '@/app/login/store/useAuthStore';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import EditForm from './_components/EditForm';
import Link from 'next/link';
import Logo from '@/components/Logo';
import Header from '@/components/Header';
import getMyProfileDTO from '@/api/getMyProfileDTO';
import getAlarms from '@/api/getAlarms';

/* 수정 가능 항목
    1.제목
    2. 본문 내용
    3. 해시태그(삭제 및 추가 가능
    4. 동영상(기존 동영상 삭제 후 새로운 영상 첨부 가능
    5. 이미지(기존 이미지 삭제 후 새로운 이미지 첨부 가능
    6. 챔피언 티어 수정 가능
*/
function EditPost() {
  const { isLogin, accessToken } = useAuthStore.getState();

  const { data: userProfileData } = useQuery({
    queryKey: ['MY_PROFILE_INFO'],
    queryFn: () => getMyProfileDTO(accessToken),
    enabled: isLogin,
  });

  const { data: alarmData } = useQuery({
    queryKey: ['alarms'],
    queryFn: () => getAlarms(accessToken),
    enabled: isLogin,
  });

  return (
    <div className='min-w-[1400px]'>
      <Header userProfileData={userProfileData} alarmData={alarmData} />
      <div>
        <div className='flex items-center justify-center w-full'>
          <Logo />
        </div>
        <section className='flex justify-center'>
          <div className='min-w-[1300px] w-full px-[80px]'>
            <div className='mb-[44px] flex items-center justify-between min-w-[1200px]'>
              <button
                onClick={() => {
                  history.back();
                }}
                className='box-content flex h-[34px] w-[92px] items-center justify-center rounded-[150px] bg-[#8A1F21] text-white'
              >
                <div className='text-[13px]'>뒤로가기</div>
              </button>
              <div className='text-[12px] text-[#909090]'>
                <Link href='/'>홈</Link>
                {' > '}게시글
              </div>
            </div>
            <EditForm />
          </div>
        </section>
      </div>
    </div>
  );
}

export default EditPost;
