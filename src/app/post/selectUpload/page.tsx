'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import SelectUploadMethod from './_component/SelectUploadMethod';
import UploadFile from './_component/UploadFile';
import UploadLink from './_component/UploadLink';
import LoadingFull from '@/components/LoadingFull';
import { useWriteStore } from '@/store/write/useWriteStore';
import { SelectJudgeType } from './_component/SelectJudgeType';

function SelectUpload() {
  const router = useRouter();
  const {
    selectedMethod,
    uploadedVideo,
    videoLink,
    thumbnail,
    isLoading,
    isSelectJudgeTypeScreenShow,
    setData,
  } = useWriteStore();

  const onClickJudgeChampion = () => {
    router.push('/post/write/champion');
  };

  const onClickJudgeClaim = () => {
    router.push('/post/write/claim');
  };

  useEffect(() => {
    if (uploadedVideo) {
      console.log('uploadedVideo: ', uploadedVideo);
    }
    if (thumbnail) {
      console.log('thumbnail: ', thumbnail);
    }
    if (videoLink) {
      console.log('videoLink: ', videoLink);
    }
  }, [uploadedVideo, thumbnail, videoLink]);

  const onClickUploadFileBtn = () => {
    setData('selectedMethod', '파일 첨부');
  };

  const onClickUploadLinkBtn = () => {
    setData('selectedMethod', '유튜브 링크');
  };

  return (
    <div className='w-full h-screen flex justify-center bg-white'>
      {isLoading ? (
        <LoadingFull />
      ) : (
        <div className='w-[545px] h-full flex flex-col justify-center items-center gap-[50px] text-center py-[36px]'>
          {isSelectJudgeTypeScreenShow ? (
            <SelectJudgeType
              onClickJudgeClaim={onClickJudgeClaim}
              onClickJudgeChampion={onClickJudgeChampion}
            />
          ) : selectedMethod === null ? (
            <SelectUploadMethod
              onClickUploadFileBtn={onClickUploadFileBtn}
              onClickUploadLinkBtn={onClickUploadLinkBtn}
            />
          ) : selectedMethod === '파일 첨부' ? (
            <UploadFile />
          ) : (
            <UploadLink />
          )}
        </div>
      )}
    </div>
  );
}

export default SelectUpload;
