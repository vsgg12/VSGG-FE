'use client';

import Pagination from 'react-js-pagination';
import { useState } from 'react';
import Logo from '@/components/Logo';
import HalfDoughnutChart from '@/components/HalfDoughnutChart';
import Header from '@/components/Header';

const data = [
  {
    title: '바로 앞 한타 갔어야한다 가지 말아야한다.',
    writer: '이슈딩',
    grade: 1,
    date: '2024.07.25',
  },
  {
    title: '바로 앞 한타 갔어야한다 가지 말아야한다.',
    writer: '이슈딩',
    grade: 2,
    date: '2024.07.25',
  },
  {
    title: '바로 앞 한타 갔어야한다 가지 말아야한다.',
    writer: '이슈딩',
    grade: 3,
    date: '2024.07.25',
  },
  {
    title: '바로 앞 한타 갔어야한다 가지 말아야한다.',
    writer: '이슈딩',
    grade: 4,
    date: '2024.07.25',
  },
  {
    title: '바로 앞 한타 갔어야한다 가지 말아야한다.',
    writer: '이슈딩',
    grade: 5,
    date: '2024.07.25',
  },
  {
    title: '바로 앞 한타 갔어야한다 가지 말아야한다.',
    writer: '이슈딩',
    grade: 6,
    date: '2024.07.25',
  },
  {
    title: '바로 앞 한타 갔어야한다 가지 말아야한다.',
    writer: '이슈딩',
    grade: 7,
    date: '2024.07.25',
  },
  {
    title: '바로 앞 한타 갔어야한다 가지 말아야한다.',
    writer: '이슈딩',
    grade: 8,
    date: '2024.07.25',
  },
  {
    title: '바로 앞 한타 갔어야한다 가지 말아야한다.',
    writer: '이슈딩',
    grade: 9,
    date: '2024.07.25',
  },
  {
    title: '바로 앞 한타 갔어야한다 .',
    writer: '이슈딩',
    grade: 10,
    date: '2024.07.25',
  },
  {
    title: '시러리시러시러실.',
    writer: '이슈딩',
    grade: 11,
    date: '2024.07.25',
  },
];

const userData = [
  {
    totalJudge: 50,
    winJudge: 30,
    loseJudge: 20,
  },
];

export default function JudgeRecord() {
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 9;

  // 현재 페이지에서 보여줄 데이터 계산
  const indexOfLastJudge: number = page * itemsPerPage;
  const indexOfFirstJudge: number = indexOfLastJudge - itemsPerPage;
  const currentJudges = data.slice(indexOfFirstJudge, indexOfLastJudge);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <div>
      <Header />
      <div className='my-[100px] text-center'>
        <Logo />
      </div>
      {userData.map((user) => (
        <div className='flex justify-center gap-10'>
          <div className='flex flex-col'>
            <div className='w-[340px] h-[240px] flex flex-col items-center rounded-xl bg-white'>
              <p className='self-start text-xs flex-grow ml-5 mt-5'>판결 승률</p>
              <div className='absolute top-[370px] w-[250px]'>
                <HalfDoughnutChart win={30} lose={70} />
              </div>
              <div className=' text-xs text-[#C3C3C3]'>
                {user.totalJudge}전 {user.winJudge}승 {user.loseJudge}패
              </div>
            </div>
          </div>
          <div className='flex w-1/2 flex-col mb-[100px]'>
            <div className='flex flex-col gap-3 rounded-xl bg-white px-8 py-6 pb-8 min-h-[700px]'>
              <div className='flex items-center gap-5'>
                <div>판결 전적</div>
                <div className='text-xs text-[#C3C3C3]'>
                  최대 1달 전까지의 전적을 확인할 수 있어요
                </div>
              </div>
              <div className='flex justify-between text-xs text-[#C3C3C3]'>
                <div className='self-start'>제목</div>
                <div className='ml-[325px]'>게시자</div>
                <div className='mr-[25px]'>작성일</div>
              </div>
              <div className='h-full flex-grow'>
                {currentJudges.map((judge: IJudgeType, index: number) => (
                  <div key={index}>
                    <div className='flex justify-between'>
                      <p>{judge.title}</p>
                      <div className='flex text-sm'>
                        <p className='text-black ml-[100px]'>
                          {judge.writer} <span className='text-[#C3C3C3]'>새싹</span>
                        </p>
                      </div>
                      <p className='text-sm text-[#C3C3C3]'>{judge.date}</p>
                    </div>
                    <div className='h-0.5 w-full bg-[#8A1F21] mb-5 mt-3'></div>
                  </div>
                ))}
              </div>
              <div className='flex justify-center pb-4'>
                <Pagination
                  activePage={page}
                  itemsCountPerPage={itemsPerPage}
                  totalItemsCount={data.length}
                  pageRangeDisplayed={5}
                  prevPageText={'<'}
                  nextPageText={'>'}
                  onChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
