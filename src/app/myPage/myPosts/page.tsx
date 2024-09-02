'use client';

import Pagination from 'react-js-pagination';
import { useState } from 'react';
import Logo from '@/components/Logo';
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
      <div className='flex justify-center w-full '>
        <div className='flex w-full flex-col mx-28'>
          <div className='flex flex-col gap-3 rounded-xl bg-white px-8 py-6 pb-8 min-h-[700px] mb-[100px]'>
            <div className='flex items-center gap-5'>
              <p>내가 쓴 글</p>
            </div>
            <div className='flex justify-between text-xs text-[#C3C3C3]'>
              <div>제목</div>
              <div className='ml-[520px]'>댓글수</div>
              <div className='mr-[23px]'>작성일</div>
            </div>
            <div className='h-full flex-grow'>
              {currentJudges.map((judge: IJudgeType, index: number) => (
                <div key={index}>
                  <div className='flex justify-between'>
                    <p>{judge.title}</p>
                    <div className='flex text-sm'>
                      <p className='text-[#C3C3C3] ml-[300px]'>{judge.grade}</p>
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
                activeLinkClass='active-page'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
