'use client';

import { useState, useEffect } from 'react';
import { useWriteStore } from '@/store/write/useWriteStore';
import Image from 'next/image';
import linkIcon from '../../../../../public/svg/postWrite/linkIcon.svg';
import dropUpIcon from '../../../../../public/svg/postWrite/dropUpIcon.svg';
import dropDownIcon from '../../../../../public/svg/postWrite/dropDownIcon.svg';
import { useRouter } from 'next/navigation';

function Champion() {
  const router = useRouter();

  const [activeBox, setActiveBox] = useState<null | 'video' | 'title' | 'content'>(null);
  const [dropDownOpen, setDropDownOpen] = useState<boolean>(true);
  const { videoId, uploadVideos, postRequestData, thumbnail, clearAll } = useWriteStore();

  const titleClass = 'font-bold text-[24px] text-[#333333]';
  const boxBase =
    'border-[0.5px] hover:border-[1px] py-[10px] px-[20px] transition-shadow duration-300 hover:shadow-lg';
  const getBoxClass = (key: string) =>
    `${boxBase} ${activeBox === key ? 'border-[#8A1F21] border-[1px]' : 'border-[#C8C8C8]'}`;
  const videoBoxPbClass = dropDownOpen ? 'pb-[30px]' : 'pb-[10px]';

  const onClickDropDownBtn = () => {
    setDropDownOpen(!dropDownOpen);
  }

  useEffect(() => {
    /** 뒤로가기 감지 */
    const handlePopState = () => {
      const ok = confirm('페이지를 떠나면 작성된 내용이 사라집니다');
      if (!ok) {
        // 뒤로가기 취소
        history.pushState(null, '', location.href);
      }
      else {
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

  return (
    <div
      className={'w-screen h-screen flex justify-center items-center gap-[20px]'}
    >
      <div className={'flex flex-col gap-[20px]'}>
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
                  {postRequestData.videoLink &&  <Image width={30} height={30} alt={'linkIcon'} src={linkIcon} />}
                  <div>{postRequestData.videoLink ?? uploadVideos?.name}</div>
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
        <div className={'flex flex-col gap-[20px]'}>
          <div className={titleClass}>제목</div>
          <div
            onClick={() => setActiveBox('title')}
            className={`w-[652px] h-[64px] text-[20px] rounded-[20px] ${getBoxClass('title')} flex items-center`}
          >
            <div>제목 박스</div>
          </div>
        </div>
        <div className={'flex flex-col gap-[20px]'}>
          <div className={titleClass}>본문</div>
          <div
            onClick={() => setActiveBox('content')}
            className={`rounded-[20px] w-[652px] min-h-[200px] ${getBoxClass("content")}`}
          >
            본문 박스
          </div>
        </div>
      </div>
      <div className={'flex flex-col'}>Champion</div>
    </div>
  );
}

export default Champion;
