// import { ICreatePostFormProps } from '@/types/form';
import { useRef, useState } from 'react';
// import { useForm } from 'react-hook-form';
import { IoDocumentOutline, IoEaselOutline, IoVideocamOutline } from 'react-icons/io5';

const tabs = [
  { id: 0, title: '파일 불러오기' },
  // { id: 1, title: '링크로 불러오기' },
  { id: 1, title: '썸네일 업로드' },
];

interface IPostUploadFileProps {
  uploadedVideo: File | null | undefined;
  setUploadedVideo: React.Dispatch<React.SetStateAction<File | null | undefined>>;
  setThumbnailImage: React.Dispatch<React.SetStateAction<File | undefined>>;
  thumbnailImage: File | undefined;
}

export default function PostUploadFile({
  uploadedVideo,
  setUploadedVideo,
  setThumbnailImage,
  thumbnailImage,
}: IPostUploadFileProps) {
  // const { register, watch, setValue } = useForm<ICreatePostFormProps>();
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleTabChange = (index: number) => {
    setSelectedTab(index);
  };

  const changeTabTitleStyle = (index: number): string => {
    return selectedTab === index ? 'p-tab-title p-tab-selected' : 'p-tab-title p-tab-n-selected';
  };

  const changeTabContentStyle = (index: number): string => {
    return `p-tab-content ${selectedTab === index ? '' : 'hidden'}`;
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleVideoDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    handleVideoFileChange(event);
  };

  const handleThumbnailDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    handleThumbnailFileChange(event);
  };

  const handleThumbnailFileChange = async (
    event: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>,
  ) => {
    let file: File | null = null;

    if ('dataTransfer' in event) {
      file = event.dataTransfer.files[0];
    } else {
      file = (event.target as HTMLInputElement).files?.[0] ?? null;
    }

    if (file) {
      const maxSizeMB = 2;
      const maxSizeBytes = maxSizeMB * 1024 * 1024;
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

      if (file.size > maxSizeBytes) {
        alert(`썸네일 파일 크기가 ${maxSizeMB}MB를 초과합니다.`);
        return;
      }

      if (!allowedTypes.includes(file.type)) {
        alert('썸네일 파일 형식이 jpg, jpeg, png가 아닙니다.');
        return;
      }

      setThumbnailImage(file);
    }
  };

  const handleVideoFileChange = async (
    event: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>,
  ) => {
    let file: File | null = null;

    if ('dataTransfer' in event) {
      file = event.dataTransfer.files[0];
    } else {
      file = event.target.files?.[0] ?? null;
    }

    if (file) {
      const maxSizeMB = 500;
      const maxSizeBytes = maxSizeMB * 1024 * 1024;
      const fileType = 'video/mp4';

      if (file.size > maxSizeBytes) {
        alert(`파일 크기가 ${maxSizeMB}MB를 초과합니다.`);
        return;
      }

      if (file.type !== fileType) {
        alert('파일 형식이 mp4가 아닙니다.');
        return;
      }

      setUploadedVideo(file);
      const url = URL.createObjectURL(file);
      if (videoRef.current) {
        videoRef.current.src = url;

        videoRef.current.onloadeddata = () => {
          videoRef.current!.currentTime = 1; // 원하는 시점 설정
        };

        // 영상파일에서 썸네일 추출하는 코드
        videoRef.current.onseeked = async () => {
          if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
              if (imageRef.current) {
                canvas.toBlob(async (blob) => {
                  if (blob) {
                    const file = new File([blob], 'thumnail.jpg', { type: 'image/jpeg' });
                    setThumbnailImage(file);
                  }
                }, 'image/jpeg');
              }
            }
          }
        };
      }
    }
  };

  return (
    <>
      <div className='absolute z-10 ml-[30px] '>
        {tabs.map((tab, index) => (
          <button
            type='button'
            key={index}
            onClick={() => handleTabChange(index)}
            className={changeTabTitleStyle(index)}
          >
            <div className='flex flex-col items-center justify-center'>
              <div className='text-[30px]'>
                {index === 0 ? <IoVideocamOutline /> : <IoEaselOutline />}
              </div>
              <div className=''>{tab.title}</div>
            </div>
          </button>
        ))}
      </div>
      <div>
        {tabs.map((tab, index) => (
          <div key={index} className={changeTabContentStyle(index)}>
            {tab.id === 0 ? (
              <div onDragOver={handleDragOver} onDrop={handleVideoDrop}>
                <input
                  type='file'
                  id='video'
                  name='video'
                  className='p-input-hidden'
                  accept='video/mp4'
                  onChange={handleVideoFileChange}
                />

                <label
                  htmlFor='video'
                  className='flex cursor-pointer flex-row items-center justify-center'
                >
                  {uploadedVideo ? (
                    <div>{uploadedVideo.name}</div>
                  ) : (
                    <>
                      <IoDocumentOutline className='mr-[10px] text-[20px]' />
                      <div>파일을 끌어오거나 클릭 후 업로드 하세요</div>
                    </>
                  )}
                </label>
                <video ref={videoRef} style={{ display: 'none' }} />
                <img ref={imageRef} style={{ display: 'none' }} alt='Video Thumbnail' />
              </div>
            ) : (
              <div onDragOver={handleDragOver} onDrop={handleThumbnailDrop}>
                <input
                  type='file'
                  id='thumbnailImage'
                  name='thumbnailImage'
                  className='p-input-hidden'
                  accept='image/*'
                  onChange={handleThumbnailFileChange}
                />
                <label
                  htmlFor='thumbnailImage'
                  className='flex cursor-pointer flex-row items-center justify-center'
                >
                  {thumbnailImage ? (
                    <div>{thumbnailImage.name}</div>
                  ) : (
                    <>
                      <IoDocumentOutline className='mr-[10px] text-[20px]' />
                      <div>파일을 끌어오거나 클릭 후 업로드 하세요</div>
                    </>
                  )}
                </label>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
