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
  setThumbnail: React.Dispatch<React.SetStateAction<Blob | undefined>>;
}

export default function PostUploadFile({
  uploadedVideo,
  setUploadedVideo,
  setThumbnail,
}: IPostUploadFileProps) {
  // const { register, watch, setValue } = useForm<ICreatePostFormProps>();
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [uploadedThumbnail, setUploadedThumbnail] = useState<File>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleTabChange = (index: number) => {
    //   const link = watch('link');
    //   if ((index === 0 || index === 2) && link) {
    //     const confirmChange = confirm('파일 업로드 선택 시 링크가 삭제됩니다.');
    //     if (confirmChange) {
    //       setValue('link', '');
    //       setSelectedTab(index);
    //     } else {
    //       return;
    //     }
    //   } else if ((index === 1 && uploadedVideo) || (index === 1 && uploadedThumbnail)) {
    //     const confirmChange = confirm('링크 선택 시 업로드한 파일과 썸네일이 삭제됩니다.');
    //     if (confirmChange) {
    //       setUploadedVideo(undefined);
    //       setUploadedThumbnail(undefined);
    //       setThumbnail(undefined);
    //       setSelectedTab(index);
    //     } else {
    //       return;
    //     }
    //   } else {
    //     setSelectedTab(index);
    //   }
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

      setUploadedThumbnail(file);
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
                    setThumbnail(blob);
                    URL.revokeObjectURL(url);
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
                {index === 0 ? (
                  <IoVideocamOutline />
                ) : (
                  // ) : index === 1 ? (
                  //   <IoLinkOutline />
                  // )
                  <IoEaselOutline />
                )}
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
                {/* <canvas ref={canvasRef} style={{ display: 'none' }} /> */}
                <img ref={imageRef} style={{ display: 'none' }} alt='Video Thumbnail' />
              </div>
            ) : (
              // : tab.id === 1 ? (
              // <div className='flex flex-row items-center '>
              //   <div className='flex w-full flex-row items-center justify-center'>
              //     <IoLinkOutline className='mr-[10px] text-[25px]' />
              //     <input
              //       type='text'
              //       placeholder='링크를 붙여 넣어주세요'
              //       className='p-font-color-default grow outline-none'
              //       {...register('link')}
              //     />
              //   </div>
              // </div>
              // )
              <div onDragOver={handleDragOver} onDrop={handleThumbnailDrop}>
                <input
                  type='file'
                  id='uploadedThumbnail'
                  name='uploadedThumbnail'
                  className='p-input-hidden'
                  accept='image/*'
                  onChange={handleThumbnailFileChange}
                />
                <label
                  htmlFor='uploadedThumbnail'
                  className='flex cursor-pointer flex-row items-center justify-center'
                >
                  {uploadedThumbnail ? (
                    <div>{uploadedThumbnail.name}</div>
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
