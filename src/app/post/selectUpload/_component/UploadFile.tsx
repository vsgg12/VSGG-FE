'use client';

import React, { useRef } from 'react';
import UploadIcon from '../../../../../public/svg/postWrite/uploadIcon.svg';
import Image from 'next/image';
import DescriptionBox from './DescriptionBox';
import SelectUploadButton from './SelectUploadButton';
import { useWriteStore } from '@/store/write/useWriteStore';

function UploadFile() {
  const { setData, setPostAddRequest } = useWriteStore();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const onClickUploadFileBtn = () => {
    fileInputRef.current?.click();
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

    if (!file) {
      return;
    }

    setData('isLoading', true);

    const maxSizeMB = 500;
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    const fileType = 'video/mp4';

    if (file.size > maxSizeBytes) {
      alert(`파일 크기가 ${maxSizeMB}MB를 초과합니다.`);
      return;
    }

    if (!file.type) {
      alert('파일 형식을 확인할 수 없습니다.');
      return;
    }

    if (file.type !== fileType || !file.name.endsWith('.mp4')) {
      alert('파일 형식이 mp4가 아닙니다.');
      return;
    }

    setData('uploadVideos', file);
    setPostAddRequest('videoType', 'FILE');

    // 썸네일 생성
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
          }, 'image/jpeg');
        }
      };
    }
    setData('isLoading', false);
    setData('isSelectCategoryScreenShow', true);
  };

  return (
    <>
      {/* 숨겨진 파일 선택 input */}
      <input
        type='file'
        accept='video/mp4'
        ref={fileInputRef}
        onChange={handleVideoFileChange}
        style={{ display: 'none' }}
      />

      {/* 썸네일 생성을 위한 숨겨진 요소들 */}
      <video ref={videoRef} style={{ display: 'none' }} />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <img ref={imageRef} style={{ display: 'none' }} alt='' />

      {/* 전체 Drop Zone */}
      <div
        className={`w-full h-[300px] flex flex-col gap-[40px] justify-center items-center`}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) => {
          e.preventDefault();
          handleVideoFileChange(e);
        }}
      >
        <Image width={138} height={138} alt={'videoIcon'} src={UploadIcon} />
        <div className='text-[32px] font-bold text-[#222222]'>동영상 파일을 끌어서 놓아주세요.</div>
        <div className='text-[20px] text-gray-500'>또는 아래 버튼을 통해 선택해주세요</div>
      </div>

      <DescriptionBox type={'uploadVideo'} />

      <SelectUploadButton btnTitle={'파일 선택'} onClick={onClickUploadFileBtn} />
    </>
  );
}

export default UploadFile;
