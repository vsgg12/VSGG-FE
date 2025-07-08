import React from 'react';
import AdditionalOptionItem from './AdditionalOptionItem';

export type AdditionalOptionItemType =
  | 'VS.GG 패치노트'
  | '이용가이드'
  | '서비스 약관'
  | '개인정보처리방침'
  | '로그아웃';

const addtionalOptionListData: AdditionalOptionItemType[] = [
  'VS.GG 패치노트',
  '이용가이드',
  '서비스 약관',
  '개인정보처리방침',
  '로그아웃',
];

function AdditionalOptionList() {
  return (
    <div className='flex flex-col gap-[10px] py-[20px] px-[16px] w-full h-full'>
      {addtionalOptionListData.map((item) => (
        <AdditionalOptionItem item={item} />
      ))}
    </div>
  );
}

export default AdditionalOptionList;
