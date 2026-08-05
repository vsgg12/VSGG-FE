'use client';

import ViewUploadedVideo from '@/app/post/write/fault/_component/ViewUploadedVideo';
import InputTitleBox from '@/app/post/write/fault/_component/InputTitleBox';
import InputContentBox from '@/app/post/write/fault/_component/InputContentBox';
import { Dispatch, SetStateAction, useCallback } from 'react';
import { useWriteStore } from '@/store/write/useWriteStore';

interface Props {
  activeBox: boolean;
  setActiveBox: Dispatch<SetStateAction<boolean>>;
}

const LeftContainer = ({ activeBox, setActiveBox }: Props) => {
  const { videoId, uploadVideos, thumbnail, postAddRequest, setData, setPostAddRequest, content } =
    useWriteStore();

  const titleClass = 'font-bold text-[24px] text-gray-850';
  const boxBase =
    'border-[0.5px] hover:border-[1px] py-[10px] px-[20px] transition-shadow duration-300 hover:shadow-lg bg-white';
  const getBoxClass = useCallback(
    () => `${boxBase} ${activeBox ? 'border-primary-500 border-[1px]' : 'border-gray-150'}`,
    [activeBox],
  );

  return (
    <div className={'flex flex-col gap-[20px] w-[652px]'}>
      <ViewUploadedVideo
        titleClass={titleClass}
        setActiveBox={setActiveBox}
        videoId={videoId}
        getBoxClass={getBoxClass}
        uploadVideos={uploadVideos}
        thumbnail={thumbnail}
        videoLink={postAddRequest.videoLink}
      />
      <InputTitleBox
        titleClass={titleClass}
        boxBase={boxBase}
        title={postAddRequest.title}
        setPostAddRequest={setPostAddRequest}
      />
      <InputContentBox
        titleClass={titleClass}
        boxBase={boxBase}
        content={content}
        setData={setData}
      />
    </div>
  );
};

export default LeftContainer;
