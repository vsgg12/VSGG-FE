'use client';

import { useEffect, useState, useRef } from 'react';
import { useWriteStore } from '@/store/write/useWriteStore';
import { useRouter } from 'next/navigation';
import LeftContainer from '@/app/post/write/_component/common/content/LeftContainer';
import ConnectRiotButton from '@/app/post/write/fault/_component/ConnectRiotButton';
import InGameInfoRequestBox from '@/app/post/write/fault/_component/InGameInfoRequestBox';
import SelectVoteEndTimeBox from '@/app/post/write/_component/common/content/SelectVoteEndTimeBox';
import WriteFooterContainer from '@/app/post/write/_component/common/footer/WriteFooterContainer';
import { getFormattedDateAfterDays } from '@/utils/formatDate';
import { useWriteValidation } from '@/hooks/write/useWriteValidation';
import { useTempStore } from '@/store/temp/useTempStore';
import TempModal from '@/app/post/write/_component/common/modal/temp/TempModal';
import ConfirmTempModal from '@/app/post/write/_component/common/modal/temp/confirm/ConfirmTempModal';
import { createPostFormData } from '@/utils/write/formDataUtils';

// 챔피언 과실 판결
const Fault = () => {
  const router = useRouter();

  const isSubmitting = useRef<boolean>(false);

  const [activeBox, setActiveBox] = useState<boolean>(false);
  const [isDeleteHover, setIsDeleteHover] = useState<number | null>(null);
  const [selectedEndTime, setSelectedEndTime] = useState<number>(1);
  const [endTimeBoxClicked, setEndTimeBoxClicked] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);

  const {
    videoId,
    uploadVideos,
    clearAll,
    setPostAddRequest,
    fetchAllChampions,
    postAddRequest,
    content,
    thumbnail,
    createNewPost,
    errMsg,
    id,
    setData: setWriteData,
  } = useWriteStore();

  const { validate } = useWriteValidation();
  const {
    setData: setTempData,
    tempModalOpen,
    deleteTempItemModalOpen,
    loadTempDetailModalOpen,
    getAllTempSummaryList,
    createTemp,
    publishTemp,
    updateTemp,
  } = useTempStore();

  const { title, inGameInfoRequests } = postAddRequest;

  useEffect(() => {
    const isValid = validate();
    setIsValid(isValid);
  }, [title, content, inGameInfoRequests, validate]);

  useEffect(() => {
    fetchAllChampions();
    getAllTempSummaryList();
  }, [fetchAllChampions, getAllTempSummaryList]);

  const titleClass = 'font-bold text-[24px] text-[#333333]';

  const onClickTempSaveBtn = async () => {
    if (!content && !title) {
      if (!title) {
        alert('제목을 입력하세요.');
        return;
      }
      if (!content) {
        alert('본문을 입력하세요.');
        return;
      }
    }
    const body = createPostFormData({
      isDraft: true,
      postAddRequest,
      content,
      uploadVideos,
      thumbnail,
    });

    if (id) {
      try {
        await updateTemp({ body, postId: String(id) });
        setTempData('tempModalOpen', true);
      } catch (error) {
        console.error('임시저장 수정 중 에러 발생:', error);
      }
    } else {
      try {
        const postId = await createTemp(body);
        setWriteData('id', postId);
        await createTemp(body);
        setTempData('tempModalOpen', true);
      } catch (error) {
        console.error('임시저장 중 에러 발생:', error);
      }
    }
  };

  const onClickRegisterBtn = async () => {
    if (!isValid) {
      alert(errMsg);
      return;
    }

    isSubmitting.current = true; // 발행 시작 시 플래그 ON

    const body = createPostFormData({
      isDraft: false,
      postAddRequest,
      content,
      uploadVideos,
      thumbnail,
    });

    if (id) {
      try {
        const newPostId = await publishTemp({ postId: String(id), body });
        router.replace(`/post/${newPostId}`);
        clearAll(); // 발행 성공 후 상태 초기화
      } catch (error) {
        console.error('임시저장 글 발행 실패:', error);
        isSubmitting.current = false;
      }
      return;
    }

    try {
      const newPostId = await createNewPost(body);

      if (newPostId) {
        router.replace(`/post/${newPostId}`);
        clearAll(); // 생성 성공 후 상태 초기화
      }
    } catch (error) {
      console.error('새 게시글 생성 실패:', error);
      isSubmitting.current = false;
    }
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
        setTempData('tempModalOpen', false);
        setTempData('selectedTempId', null);
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
  }, [clearAll, router, setTempData]);

  useEffect(() => {
    const isRefresh = sessionStorage.getItem('WRITE_REFRESH');

    if (isRefresh) {
      sessionStorage.removeItem('WRITE_REFRESH');
      clearAll();
      setTempData('tempModalOpen', false);
      setTempData('selectedTempId', null);
      router.replace('/post/selectUpload');
    }
  }, [clearAll, router, setTempData]);

  useEffect(() => {
    if (!uploadVideos && !videoId && !isSubmitting.current) {
      router.replace('/post/selectUpload');
    }
  }, [router, uploadVideos, videoId]);

  useEffect(() => {
    const voteEndDate = getFormattedDateAfterDays(selectedEndTime);
    setPostAddRequest('voteEndDate', voteEndDate);
  }, [selectedEndTime, setPostAddRequest]);

  return (
    <div className={'relative w-screen h-screen flex justify-center items-center gap-[50px]'}>
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
            onClickTempSaveBtn={onClickTempSaveBtn}
            onClickRegisterBtn={onClickRegisterBtn}
          />
        </div>
      </div>
      {tempModalOpen && <TempModal />}
      {deleteTempItemModalOpen && <ConfirmTempModal type={'delete'} />}
      {loadTempDetailModalOpen && <ConfirmTempModal type={'load'} />}
    </div>
  );
};

export default Fault;
