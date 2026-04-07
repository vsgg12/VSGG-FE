'use client';

import Image from 'next/image';
import redDeleteIcon from '../../../../../../public/svg/postWrite/redDeleteIcon.svg';
import grayDeleteIcon from '../../../../../../public/svg/postWrite/grayDeleteIcon.svg';
import InGameInfoBox from '@/app/post/write/_component/common/content/InGameInfoBox';
import { useWriteStore } from '@/store/write/useWriteStore';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  isDeleteHover: number | null;
  setIsDeleteHover: Dispatch<SetStateAction<number | null>>;
}

const InGameInfoRequestBox = ({ isDeleteHover, setIsDeleteHover }: Props) => {
  const {
    setInGameInfoRequestData,
    addInGameInfoRequestItem,
    removeInGameInfoRequestItem,
    postAddRequest,
  } = useWriteStore();
  const { inGameInfoRequests } = postAddRequest;

  return (
    <div className={'h-[600px] flex flex-col gap-[20px]'}>
      {inGameInfoRequests?.map((item, index) => (
        <div key={item.inGameInfoId} className='flex flex-col gap-[20px]'>
          <div className='flex justify-between items-center'>
            <div className={'text-[18px] font-semibold text-black'}>소환사 {index + 1}</div>

            {inGameInfoRequests.length > 2 && index >= 2 && (
              <button
                onClick={() => removeInGameInfoRequestItem(index)}
                onMouseEnter={() => setIsDeleteHover(index)}
                onMouseLeave={() => setIsDeleteHover(null)}
                className='relative'
              >
                <Image
                  src={isDeleteHover === index ? redDeleteIcon : grayDeleteIcon}
                  alt='deleteIcon'
                  width={20}
                  height={20}
                />

                {/* 말풍선 */}
                {isDeleteHover === index && (
                  <div className='absolute top-[20px] left-1/2 -translate-x-1/2 z-10 flex flex-col items-center'>
                    {/* 삼각형 */}
                    <div className='w-0 h-0 border-l-[6px] border-r-[6px] border-b-[6px] border-transparent border-b-[#F3F3F3]' />

                    {/* 말풍선 박스 */}
                    <div className='px-[12px] py-[6px] rounded-[5px] bg-[#F3F3F3] text-[#999999] text-[12px] whitespace-nowrap shadow-sm'>
                      삭제
                    </div>
                  </div>
                )}
              </button>
            )}
          </div>

          <InGameInfoBox
            key={`${item.inGameInfoId}-${index}`}
            championName={item.championName}
            setChampionName={(value) => setInGameInfoRequestData(index, 'championName', value)}
            tier={item.tier}
            setTier={(value) => setInGameInfoRequestData(index, 'tier', value)}
            position={item.position}
            setPosition={(value) => setInGameInfoRequestData(index, 'position', value)}
          />
        </div>
      ))}
      {/* 추가 버튼 */}
      {inGameInfoRequests.length < 5 && (
        <div className={'flex w-full justify-center items-center'}>
          <button
            onClick={addInGameInfoRequestItem}
            className='group w-[50px] h-[47px] flex flex-col items-center justify-center text-[#777777] text-[18px] font-semibold gap-[4px] mt-[20px] hover:text-[#8A1F21]'
          >
            <div className='w-[22px] h-[22px] rounded-full border-[2px] border-[#777777] flex items-center justify-center group-hover:border-[#8A1F21]'>
              +
            </div>
            <div>추가</div>
          </button>
        </div>
      )}
    </div>
  );
};

export default InGameInfoRequestBox;
