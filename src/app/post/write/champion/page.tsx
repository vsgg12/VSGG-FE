'use client';

import { useEffect, useState } from 'react';
import { useWriteStore } from '@/store/write/useWriteStore';
import { useRouter } from 'next/navigation';
import LeftContainer from '@/app/post/write/_component/common/LeftContainer';
import ConnectRiotButton from '@/app/post/write/champion/_component/ConnectRiotButton';
import { toast } from 'react-hot-toast';
import InGameInfoRequestBox from '@/app/post/write/champion/_component/InGameInfoRequestBox';
import SelectVoteEndTimeBox from '@/app/post/write/_component/common/SelectVoteEndTimeBox';
import WriteFooterContainer from '@/app/post/write/_component/common/footer/WriteFooterContainer';
import { getFormattedDateAfterDays } from '@/utils/formatDate';
import { useWriteValidation } from '@/hooks/write/useWriteValidation';

function Champion() {
  const router = useRouter();

  const [activeBox, setActiveBox] = useState<boolean>(false);
  const [isDeleteHover, setIsDeleteHover] = useState<number | null>(null);
  const [selectedEndTime, setSelectedEndTime] = useState<number>(1);
  const [endTimeBoxClicked, setEndTimeBoxClicked] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);
  const tempNum = 1;

  const {
    videoId,
    uploadVideos,
    clearAll,
    setPostRequestData,
    fetchAllChampions,
    errMsg,
    postRequestData,
    content,
  } = useWriteStore();

  const { validate } = useWriteValidation();

  const { title, inGameInfoRequests } = postRequestData;

  useEffect(() => {
    const isValid = validate();
    setIsValid(isValid);
  }, [title, content, inGameInfoRequests, validate]);

  useEffect(() => {
    fetchAllChampions();
  }, []);

  const titleClass = 'font-bold text-[24px] text-[#333333]';

  const onClickTempSaveBtn = () => {
    // 임시저장 api 호출
    if (!isValid) {
      alert(errMsg);
      toast.error('임시 저장에 실패하였습니다.');
      return;
    }
    toast.success('임시 저장이 완료되었습니다.');
  };

  const onClickRegisterBtn = () => {
    // 등록 api 호출
    // 등록 완료 후 게시글 상세 페이지로 이동
    if (!isValid) {
      alert(errMsg);
      toast.error('게시글 등록에 실패하였습니다.');
      return;
    }
    toast.success('게시글 등록이 완료되었습니다.');
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

  useEffect(() => {
    const voteEndDate = getFormattedDateAfterDays(selectedEndTime);
    setPostRequestData('voteEndDate', voteEndDate);
  }, [selectedEndTime, setPostRequestData]);

  return (
    <div className={'w-screen h-screen flex justify-center items-center gap-[50px]'}>
      <LeftContainer activeBox={activeBox} setActiveBox={setActiveBox} />

      <div className={'w-[568px] flex flex-col gap-[20px]'}>
        <ConnectRiotButton titleClass={titleClass} />
        <div className={'flex flex-col gap-[20px]'}>
          <InGameInfoRequestBox isDeleteHover={isDeleteHover} setIsDeleteHover={setIsDeleteHover} />

          <SelectVoteEndTimeBox
            titleClass={titleClass}
            endTimeBoxClicked={endTimeBoxClicked}
            selectedEndTime={selectedEndTime}
            setEndTimeBoxClicked={setEndTimeBoxClicked}
            setSelectedEndTime={setSelectedEndTime}
          />
          <WriteFooterContainer
            tempNum={tempNum}
            onClickTempSaveBtn={onClickTempSaveBtn}
            onClickRegisterBtn={onClickRegisterBtn}
          />
        </div>
      </div>
    </div>
  );
}

export default Champion;
