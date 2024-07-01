'use client';
import { ICreatePostFormProps } from '@/types/form';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function PostForm() {
  const quillPlaceHolder =
    '[게시글 내용 작성 가이드]\n\n' +
    '1. 리플레이 영상 업로드는 필수! 판결을 받고 싶은 부분만 편집해 업로드 하기\n' +
    '- 파일 크기 제한 : 500MB\n' +
    '- 파일 형식: mp4\n' +
    "2. 게임 상황의 이해를 돕기 위해 '플레이 정보를 담은 전적 캡처 이미지'를 첨부하기\n" +
    '- 파일 크기 제한 : 2MB\n' +
    '- 파일 형식: jpg, jpeg, png\n' +
    '3. 상황 설명은 자세하게 글로 작성하기\n' +
    '- 문자 수 제한 : 1000자 이내\n';

  const { register } = useForm<ICreatePostFormProps>();
  const [content, setContent] = useState('');

  const handleChange = (value: string) => {
    setContent(value);
  };

  return (
    <>
      <div className='p-content-mb mx-[30px] text-[20px] font-medium text-[#333333]'>글 작성</div>
      <div className='p-content-mb p-font-color-default flex flex-row items-center justify-center'>
        <div className='mx-[30px] font-medium text-[24px]'>제목</div>
        <input
          type='text'
          maxLength={35}
          className=' grow rounded-[30px] border-[1.5px] border-[#828282] px-[30px] py-[15px] text-[22px] font-medium outline-none'
          placeholder='최대 35글자 입력 가능합니다.'
          {...register('title')}
        />
      </div>
      <div className='p-content-mb h-[882px] overflow-hidden  rounded-[30px] border-[1.5px] border-[#828282]'>
        <ReactQuill
          className=' h-[100%] w-full whitespace-pre-wrap outline-none text-[16px] font-medium'
          onChange={handleChange}
          value={content}
          placeholder={quillPlaceHolder}
          modules={{
            toolbar: ['image'],
          }}
        />
      </div>
    </>
  );
}
