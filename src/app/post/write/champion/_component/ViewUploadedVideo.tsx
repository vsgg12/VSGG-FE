import { Dispatch, memo, SetStateAction, useState } from 'react';
import Image from 'next/image';
import linkIcon from '../../../../../../public/svg/postWrite/linkIcon.svg';
import dropUpIcon from '../../../../../../public/svg/postWrite/dropUpIcon.svg';
import dropDownIcon from '../../../../../../public/svg/postWrite/dropDownIcon.svg';

interface Props{
  titleClass: string;
  getBoxClass: (key: string) => string;
  setActiveBox: Dispatch<SetStateAction<null | 'video' | 'title' | 'content'>>
  videoId: string;
  uploadVideos: File | undefined;
  videoLink: string;
  thumbnail: Blob | undefined;
}

const ViewUploadedVideo = ({titleClass, getBoxClass, setActiveBox, videoId, uploadVideos, videoLink, thumbnail}: Props) => {

  const [dropDownOpen, setDropDownOpen] = useState<boolean>(true);

  const videoBoxPbClass = dropDownOpen ? 'pb-[30px]' : 'pb-[10px]';

  const onClickDropDownBtn = () => {
    setDropDownOpen(!dropDownOpen);
  }


  return (
    <div className={'flex flex-col gap-[20px]'}>
      <div className={titleClass}>업로드한 동영상</div>
      <div
        onClick={() => setActiveBox('video')}
        className={`w-[652px] max-h-[340px] rounded-[10px] ${getBoxClass('video')} ${videoBoxPbClass} pt-[10px] flex flex-col gap-[20px] justify-center items-center`}
      >
        <div
          className={'w-full h-full text-[18px] text-black flex flex-col justify-between items-center gap-[20px]'}
        >
          <div className={'w-full flex justify-between items-center'}>
            <div className={'flex gap-[5px]'}>
              {videoLink &&  <Image width={30} height={30} alt={'linkIcon'} src={linkIcon} />}
              <div>
                {uploadVideos ? uploadVideos.name : videoLink}
              </div>
            </div>
            <div onClick={onClickDropDownBtn} className={"cursor-pointer flex items-center h-[18px] w-[18px]"}>
              {dropDownOpen ?
                <Image width={10} height={8} src={dropUpIcon} alt={'dropUpIcon'}/> :
                <Image width={10} height={8} src={dropDownIcon} alt={'dropDownIcon'}/>
              }
            </div>
          </div>
          {dropDownOpen && (
            <div className={'w-[450px] h-[253px]'}>
              {/* 유튜브 링크 */}
              {videoId && (
                <iframe
                  width="438"
                  height="243"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title="YouTube video preview"
                  className="rounded-[10px]"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}

              {/* 업로드 파일 */}
              {uploadVideos && (
                <video
                  width={438}
                  height={243}
                  src={URL.createObjectURL(uploadVideos)}
                  poster={thumbnail ? URL.createObjectURL(thumbnail) : undefined}
                  controls
                  className="rounded-[10px] object-cover"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default memo(ViewUploadedVideo)