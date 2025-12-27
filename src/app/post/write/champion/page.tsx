'use client';

import { useEffect, useState } from 'react';
import { useWriteStore } from '@/store/write/useWriteStore';
import { useRouter } from 'next/navigation';
import LeftContainer from '@/app/post/write/_component/common/LeftContainer';
import ConnectRiotButton from '@/app/post/write/champion/_component/ConnectRiotButton';
import InGameInfoBox from '@/app/post/write/_component/common/InGameInfoBox';
import Image from 'next/image';
import grayDeleteIcon from '../../../../../public/svg/postWrite/grayDeleteIcon.svg';
import redDeleteIcon from '../../../../../public/svg/postWrite/redDeleteIcon.svg';
import dropDownIcon from '../../../../../public/svg/postWrite/dropDownIcon.svg';
import redDropDownIcon from '../../../../../public/svg/postWrite/redDropDownIcon.svg';
import { toast } from 'react-hot-toast';

function Champion() {
  const router = useRouter();

  const [activeBox, setActiveBox] = useState<boolean>(false);
  const [isDeleteHover, setIsDeleteHover] = useState<number | null>(null);
  const [selectedEndTime, setSelectedEndTime] = useState<string>('1일');
  const [endTimeBoxClicked, setEndTimeBoxClicked] = useState<boolean>(false);
  const tempNum = 1;

  const {
    videoId,
    uploadVideos,
    clearAll,
    setInGameInfoRequestData,
    addInGameInfoRequestItem,
    removeInGameInfoRequestItem,
    postRequestData,
  } = useWriteStore();
  const { inGameInfoRequests } = postRequestData;

  const titleClass = 'font-bold text-[24px] text-[#333333]';

  const onClickSaveBtn = () => {
    // 임시저장 api 호출
    toast.success('임시 저장이 완료되었습니다.');
    // toast.error('임시 저장에 실패하였습니다.');
  };

  useEffect(() => {
    /** 뒤로가기 감지 */
    const handlePopState = () => {
      const ok = confirm('페이지를 떠나면 작성된 내용이 사라집니다');
      if (!ok) {
        // 뒤로가기 취소
        history.pushState(null, '', location.href);
      } else {
        clearAll();
        router.replace('/post/selectUpload');
      }
    };

    /** 새로고침 / 탭 닫기 감지 */
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      sessionStorage.setItem('WRITE_REFRESH', 'true');
      e.preventDefault();
    };

    // history stack 보호
    history.pushState(null, '', location.href);

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [clearAll, router]);

  useEffect(() => {
    const isRefresh = sessionStorage.getItem('WRITE_REFRESH');

    if (isRefresh) {
      sessionStorage.removeItem('WRITE_REFRESH');
      clearAll();
      router.replace('/post/selectUpload');
    }
  }, [clearAll, router]);

  useEffect(() => {
    if (!uploadVideos && !videoId) {
      router.replace('/post/selectUpload');
    }
  }, [router, uploadVideos, videoId]);

  return (
    <div className={'w-screen h-screen flex justify-center items-center gap-[50px]'}>
      <LeftContainer activeBox={activeBox} setActiveBox={setActiveBox} />

      <div className={'w-[568px] flex flex-col gap-[20px]'}>
        <ConnectRiotButton titleClass={titleClass} />
        <div className={'flex flex-col gap-[20px]'}>
          {inGameInfoRequests.map((item, index) => (
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

          <div className={'flex flex-col gap-[20px]'}>
            <div className={titleClass}>판결 종료 시간</div>
            <div
              className={`w-full h-[47px] py-[10px] px-[20px] rounded-[10px] bg-white border-[0.5px] text-[18px] text-[#333333] cursor-pointer transition-shadow duration-300 hover:shadow-lg ${endTimeBoxClicked ? 'border-[#8A1F21]' : 'border-[#C8C8C8]'}`}
              onClick={() => setEndTimeBoxClicked(!endTimeBoxClicked)}
            >
              <div className={'w-full flex justify-between items-center'}>
                {selectedEndTime}
                <div className={'cursor-pointer flex items-center h-[18px] w-[18px]'}>
                  <Image
                    width={10}
                    height={8}
                    src={endTimeBoxClicked ? redDropDownIcon : dropDownIcon}
                    alt={'dropDownIcon'}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={'w-full h-[53px] flex gap-[20px] justify-end'}>
            <div
              className={
                'w-[134px] h-full px-[30px] py-[20px] rounded-[10px] bg-[#ECECEC] text-[20px] text-[#333333] flex justify-between items-center cursor-pointer'
              }
              onClick={onClickSaveBtn}
            >
              <div>저장</div>
              {tempNum > 0 && (
                <div className={'pl-[15px] border-1.5 border-l-black '}>{tempNum}</div>
              )}
            </div>
            <div
              className={
                'w-[134px] h-full px-[30px] py-[20px] rounded-[10px] bg-[#8A1F21] text-[20px] text-white flex justify-center items-center cursor-pointer'
              }
            >
              등록
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Champion;
