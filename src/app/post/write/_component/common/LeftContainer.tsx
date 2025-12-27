import ViewUploadedVideo from '../../champion/_component/ViewUploadedVideo';
import InputTitleBox from '@/app/post/write/champion/_component/InputTitleBox';
import InputContentBox from '@/app/post/write/champion/_component/InputContentBox';
import { Dispatch, SetStateAction, useCallback } from 'react';
import { useWriteStore } from '@/store/write/useWriteStore';

interface Props{
  activeBox: null | 'video' | 'title' | 'content';
  setActiveBox: Dispatch<SetStateAction<null | 'video' | 'title' | 'content'>>;
}

const LeftContainer = ({activeBox, setActiveBox}:Props) => {

  const {videoId, uploadVideos, thumbnail, postRequestData, setData, setPostRequestData, content} = useWriteStore();

  const titleClass = 'font-bold text-[24px] text-[#333333]';
  const boxBase =
    'border-[0.5px] hover:border-[1px] py-[10px] px-[20px] transition-shadow duration-300 hover:shadow-lg bg-white';
  const getBoxClass = useCallback(
    (key: string) =>
      `${boxBase} ${activeBox === key ? 'border-[#8A1F21] border-[1px]' : 'border-[#C8C8C8]'}`,
    [activeBox]
  );
  
  return (
    <div className={'flex flex-col gap-[20px]'}>
      <ViewUploadedVideo
        titleClass={titleClass}
        getBoxClass={getBoxClass}
        setActiveBox={setActiveBox}
        videoId={videoId}
        uploadVideos={uploadVideos}
        thumbnail={thumbnail}
        videoLink={postRequestData.videoLink}
      />
      <InputTitleBox
        titleClass={titleClass}
        setActiveBox={setActiveBox}
        title={postRequestData.title}
        setPostRequestData={setPostRequestData}
        getBoxClass={getBoxClass}
      />
      <InputContentBox
        titleClass={titleClass}
        getBoxClass={getBoxClass}
        setActiveBox={setActiveBox}
        content={content}
        setData={setData}
      />
    </div>
  )
}

export default LeftContainer;