'use client';

import { Dispatch, memo, SetStateAction, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import linkIcon from '../../../../../../public/svg/postWrite/linkIcon.svg';
import dropUpIcon from '../../../../../../public/svg/postWrite/dropUpIcon.svg';
import dropDownIcon from '../../../../../../public/svg/postWrite/dropDownIcon.svg';
import { useWriteStore } from '@/store/write/useWriteStore';
import UploadLinkModal from '../../_component/common/modal/upload/UploadLinkModal';

interface Props {
  titleClass: string;
  getBoxClass: () => string;
  setActiveBox: Dispatch<SetStateAction<boolean>>;
  videoId: string;
  uploadVideos: File | null;
  videoLink: string;
  thumbnail: Blob | null;
}

const ViewUploadedVideo = ({
  titleClass,
  getBoxClass,
  setActiveBox,
  videoId,
  uploadVideos,
  videoLink,
  thumbnail,
}: Props) => {
  const { setData, setPostAddRequest } = useWriteStore();

  const [dropDownOpen, setDropDownOpen] = useState<boolean>(true);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState<boolean>(false);
  const boxRef = useRef<HTMLDivElement | null>(null);

  // 파일 업로드 및 썸네일 추출을 위한 Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const videoBoxPbClass = dropDownOpen ? 'pb-[30px]' : 'pb-[10px]';

  const onClickDropDownBtn = () => {
    setDropDownOpen(!dropDownOpen);
  };

  const onClickLinkText = (e: React.MouseEvent) => {
    e.stopPropagation(); // 부모 요소 클릭 이벤트(setActiveBox) 방지
    setIsLinkModalOpen(true);
  };

  const onClickFileText = (e: React.MouseEvent) => {
    e.stopPropagation(); // 부모 요소 클릭 이벤트 방지
    fileInputRef.current?.click();
  };

  const handleVideoFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;

    if (!file) {
      return;
    }

    setData('isLoading', true);

    const maxSizeMB = 500;
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    const fileType = 'video/mp4';

    if (file.size > maxSizeBytes) {
      alert(`파일 크기가 ${maxSizeMB}MB를 초과합니다.`);
      setData('isLoading', false);
      return;
    }

    if (!file.type) {
      alert('파일 형식을 확인할 수 없습니다.');
      setData('isLoading', false);
      return;
    }

    if (file.type !== fileType || !file.name.endsWith('.mp4')) {
      alert('파일 형식이 mp4가 아닙니다.');
      setData('isLoading', false);
      return;
    }

    setData('uploadVideos', file);
    setPostAddRequest('videoType', 'FILE');

    // 썸네일 생성 로직
    const url = URL.createObjectURL(file);

    if (videoRef.current) {
      const video = videoRef.current;
      video.src = url;

      video.onloadeddata = () => {
        video.currentTime = 1;
      };

      video.onseeked = async () => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

          canvas.toBlob(async (blob) => {
            if (blob) {
              setData('thumbnail', blob);
              URL.revokeObjectURL(url);
            }
            setData('isLoading', false);
          }, 'image/jpeg');
        } else {
          setData('isLoading', false);
        }
      };

      video.onerror = () => {
        setData('isLoading', false);
      };
    } else {
      setData('isLoading', false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // 모달이 열려있을 때는 setActiveBox(false) 로직 무시
      if (isLinkModalOpen) return;

      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setActiveBox(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setActiveBox, isLinkModalOpen]);

  return (
    <>
      {/* 썸네일 생성을 위한 숨겨진 요소들 */}
      <input
        type='file'
        accept='video/mp4'
        ref={fileInputRef}
        onChange={handleVideoFileChange}
        style={{ display: 'none' }}
      />
      <video ref={videoRef} style={{ display: 'none' }} />
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {/* 링크 모달 렌더링 */}
      {isLinkModalOpen && <UploadLinkModal onClose={() => setIsLinkModalOpen(false)} />}

      <div className={'flex flex-col gap-[20px]'}>
        <div className={titleClass}>업로드한 동영상</div>
        <div
          ref={boxRef}
          onClick={() => setActiveBox(true)}
          className={`w-[652px] max-h-[400px] rounded-[10px] ${getBoxClass()} ${videoBoxPbClass} py-[10px] flex flex-col gap-[20px] justify-center items-center`}
        >
          <div
            className={
              'w-full h-full text-[18px] text-black flex flex-col justify-between items-center gap-[10px]'
            }
          >
            <div className={'w-full flex justify-between items-center'}>
              <div className={'flex gap-[5px]'}>
                {videoLink && <Image width={30} height={30} alt={'linkIcon'} src={linkIcon} />}

                {/* 텍스트 렌더링 영역 (클릭 분기) */}
                <div>
                  {uploadVideos ? (
                    <span
                      onClick={onClickFileText}
                      className='cursor-pointer hover:underline hover:text-blue-600 transition-colors'
                      title='클릭하여 파일 변경'
                    >
                      {uploadVideos.name ?? uploadVideos}
                    </span>
                  ) : videoLink ? (
                    <span
                      onClick={onClickLinkText}
                      className='cursor-pointer hover:underline hover:text-blue-600 transition-colors'
                      title='클릭하여 링크 변경'
                    >
                      {videoLink}
                    </span>
                  ) : null}
                </div>
              </div>
              <div
                onClick={onClickDropDownBtn}
                className={'cursor-pointer flex items-center h-[18px] w-[18px]'}
              >
                {dropDownOpen ? (
                  <Image width={10} height={8} src={dropUpIcon} alt={'dropUpIcon'} />
                ) : (
                  <Image width={10} height={8} src={dropDownIcon} alt={'dropDownIcon'} />
                )}
              </div>
            </div>
            {dropDownOpen && (
              <div className={'w-[450px] h-[253px]'}>
                {/* 유튜브 링크 */}
                {videoId && (
                  <iframe
                    width='438'
                    height='243'
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title='YouTube video preview'
                    className='rounded-[10px]'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen
                  />
                )}

                {/* 업로드 파일 */}
                {uploadVideos && (
                  <video
                    width={438}
                    height={243}
                    src={
                      uploadVideos instanceof File
                        ? URL.createObjectURL(
                            new Blob([uploadVideos], { type: uploadVideos.type || 'video/mp4' }),
                          )
                        : uploadVideos
                    }
                    poster={thumbnail instanceof File ? URL.createObjectURL(thumbnail) : undefined}
                    controls
                    className='rounded-[10px] object-cover'
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(ViewUploadedVideo);
