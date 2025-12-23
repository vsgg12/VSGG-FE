'use client';

import { useState, useEffect, useRef } from 'react';
import { useWriteStore } from '@/store/write/useWriteStore';

function Champion() {
  const [activeBox, setActiveBox] = useState<null | 'video' | 'title' | 'content'>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { videoId } = useWriteStore();

  const titleClass = 'font-bold text-[24px] text-[#333333]';
  const boxBase =
    'border-[0.5px] hover:border-[1px] py-[10px] px-[20px] transition-shadow duration-300 hover:shadow-lg cursor-pointer';
  const getBoxClass = (key: string) =>
    `${boxBase} ${activeBox === key ? 'border-[#8A1F21] border-[1px]' : 'border-[#C8C8C8]'}`;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setActiveBox(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      className={'w-screen h-screen flex justify-center items-center gap-[20px]'}
      ref={containerRef}
    >
      <div className={'flex flex-col gap-[20px]'}>
        <div className={'flex flex-col gap-[20px]'}>
          <div className={titleClass}>업로드한 동영상</div>
          <div
            onClick={() => setActiveBox('video')}
            className={`w-[652px] h-[340px] rounded-[10px] ${getBoxClass('video')} pb-[30px] pt-[10px] flex flex-col gap-[20px] justify-center items-center`}
          >
            <div
              className={'w-full h-full text-[18px] text-black flex flex-col justify-between items-center'}
            >
              <div className={'w-full flex justify-between items-center'}>
                <div className={'flex gap-[5px]'}>
                  <div>링크 아이콘</div>
                  <div>비디오 url</div>
                </div>
                <div>내리기 아이콘</div>
              </div>
              <div className={'w-[450px] h-[253px]'}>
                <iframe
                  width='438'
                  height='243'
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title='YouTube video preview'
                  className='rounded-[10px]'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
        <div className={'flex flex-col gap-[20px]'}>
          <div className={titleClass}>제목</div>
          <div
            onClick={() => setActiveBox('title')}
            className={`w-[652px] h-[64px] text-[20px] rounded-[20px] ${getBoxClass('title')} flex items-center`}
          >
            <div>제목 박스</div>
          </div>
        </div>
        <div className={'flex flex-col gap-[20px]'}>
          <div className={titleClass}>본문</div>
          <div
            onClick={() => setActiveBox('content')}
            className={`rounded-[20px] w-[652px] min-h-[200px] ${getBoxClass("content")}`}
          >
            본문 박스
          </div>
        </div>
      </div>
      <div className={'flex flex-col'}>Champion</div>
    </div>
  );
}

export default Champion;
