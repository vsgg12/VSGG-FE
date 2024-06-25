import { useRef, useState } from 'react';
import { IoWarningOutline } from 'react-icons/io5';
import { PiDotOutlineFill } from 'react-icons/pi';
export default function PostUploadDesc() {
  const [isDescShow, setIsDescShow] = useState(false);

  const descRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <div className='relative z-20 mb-[50px] ml-[30px] flex flex-row items-center '>
        <div
          className='flex'
          onMouseEnter={() => setIsDescShow(true)}
          onMouseLeave={() => setIsDescShow(false)}
        >
          <div className=' mr-[6px] text-[20px] font-medium text-[#333333] '>파일 첨부</div>
          <IoWarningOutline className='mr-[6px] cursor-pointer text-[25px]  text-[#828282]' />
        </div>

        {isDescShow && (
          <div
            ref={descRef}
            className='absolute left-[150px] h-[120px] w-[180px] rounded-[5px] border-[1.5px] border-[#828282] bg-[#ffffff] p-[15px] text-[10px] font-medium text-[#828282]'
          >
            <div>1. 파일불러오기</div>
            <div>
              <div className='flex flex-row items-center pl-[10px]'>
                <PiDotOutlineFill />
                <div>파일 크기 제한 : 500MB</div>
              </div>
              <div className='flex flex-row items-center pl-[10px]'>
                <PiDotOutlineFill />
                <div>파일 형식 : mp4</div>
              </div>
            </div>
            <div>2. 썸네일 업로드</div>
            <div>
              <div className='flex flex-row items-center pl-[10px]'>
                <PiDotOutlineFill />
                <div>파일 크기 제한: 2MB</div>
              </div>
              <div className='flex flex-row items-center pl-[10px]'>
                <PiDotOutlineFill />
                <div>파일 형식: jpg, jpeg, png</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
