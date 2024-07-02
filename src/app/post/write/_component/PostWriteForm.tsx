'use client';
import { useCallback, useEffect, useState } from 'react';
import PostUploadDesc from './PostUploadDesc';
import { useRouter } from 'next/navigation';
import { IoSaveOutline } from 'react-icons/io5';
import PostUploadFile from './PostUploadFile';
import PostForm from './PostForm';
import PostHashTag from './PostHashTag';
import PostJudgeParticipants from './PostJudgeParticipants';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import { useMutation } from '@tanstack/react-query';
import postPostWrite from '@/api/postPostWrite';

const intialInGameInfoRequest: IIngameInfoRequestType[] = [
  { position: 'TOP', championName: '', tier: '' },
  { position: 'TOP', championName: '', tier: '' },
];

export default function PostWriteForm() {
  const router = useRouter();
  const [uploadVideos, setUploadVideos] = useState<File | undefined>(undefined);
  const [thumbnailImage, setThumbnailImage] = useState<File | undefined>(undefined);
  const [hashtag, setHashtag] = useState<string[]>([]);
  const [content, setContent] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [InGameInfoRequest, setInGameInfoRequest] =
    useState<IIngameInfoRequestType[]>(intialInGameInfoRequest);
  const { accessToken } = useAuthStore();
  // const postCreated = false;

  const { mutate: postWirte } = useMutation({
    mutationFn: () =>
      postPostWrite(
        {
          uploadVideos,
          thumbnailImage,
          postAddRequest: {
            title,
            content,
            hashtag,
          },
          InGameInfoRequest,
          videoUrl: '',
        },
        accessToken,
      ),
    onError: (error) => {
      console.log(error);
      alert('게시물 등록에 실패하셨습니다.');
    },
    onSuccess: () => {
      alert('게시물 등록이 완료되었습니다!');
      router.push('/');
    },
  });

  const handleSubmit = () => {
    if (!uploadVideos) {
      alert('영상을 업로드 해주세요');
      return;
    }

    if (title === '') {
      alert('제목을 입력해주세요');
      return;
    }

    if (content === '') {
      alert('본문을 작성해주세요');
      return;
    }

    const inGameInfoRequests = InGameInfoRequest.map(({ championName, ...rest }) => ({
      championName: championName,
      ...rest,
    }));

    for (const info of inGameInfoRequests) {
      if (!info.championName || !info.position || !info.tier) {
        alert('모든 챔피언, 포지션 및 티어를 입력해주세요.');
        return;
      }
    }

    const postComfirm = confirm('게시글 작성을 완료하시겠습니까?');
    if (postComfirm) {
      postWirte();
    }
  };

  const beforeUnloadHandler = useCallback((event: BeforeUnloadEvent) => {
    event.preventDefault();
    event.returnValue = '페이지를 떠나면 작성된 내용이 사라집니다.';
  }, []);
  // const beforeUnloadHandler = (event: BeforeUnloadEvent) => {
  //   if (isLogin || !postCreated) {
  //     const message = '페이지를 떠나면 작성된 내용이 사라집니다.';
  //     event.preventDefault();
  //     return message;
  //   }
  // };

  const handlePopState = useCallback(() => {
    const message = '페이지를 떠나면 작성된 내용이 사라집니다.';
    if (confirm(message)) {
      router.back();
    } else {
      // 현재 경로와 쿼리 매개변수를 포함한 전체 경로를 생성합니다.
      const fullPath = window.location.pathname + window.location.search;
      router.push(fullPath);
    }
  }, [router]);

  useEffect(() => {
    const originalPush = router.push;

    const newPush = (href: string) => {
      const message = '페이지를 떠나면 작성된 내용이 사라집니다.';
      if (confirm(message)) {
        originalPush(href);
      }
    };

    router.push = newPush;
    window.onbeforeunload = beforeUnloadHandler;

    return () => {
      router.push = originalPush;
      window.onbeforeunload = null;
    };
  }, [router, beforeUnloadHandler]);

  useEffect(() => {
    console.log('thumbnailImage : ', thumbnailImage);
    console.log('uploadVideos : ', uploadVideos);
    console.log(`postAddRequest: {
      title : ${title},
      content : ${content},
      hashtag : ${hashtag}
    }`);
    console.log('InGameInfoRequest: ', InGameInfoRequest);
    console.log("videoUrl : ' '");
  }, [uploadVideos, thumbnailImage, hashtag, title, content, InGameInfoRequest]);

  useEffect(() => {
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [handlePopState]);

  return (
    <>
      <div className='p-content-pd p-content-rounded mb-[44px] h-fit w-full  bg-[#ffffff]'>
        <PostUploadDesc />
        <div className='p-content-mb relative h-[150px]'>
          <PostUploadFile
            uploadedVideo={uploadVideos}
            setUploadedVideo={setUploadVideos}
            setThumbnailImage={setThumbnailImage}
            thumbnailImage={thumbnailImage}
          />
        </div>
      </div>

      <div className='p-content-pd p-content-rounded mb-[44px] h-fit w-full  bg-[#ffffff]'>
        <PostForm content={content} setContent={setContent} title={title} setTitle={setTitle} />
        <div className='mx-[30px] mb-[30px] text-[20px] font-semibold  text-[#8A1F21]'>
          해시태그
        </div>
        <PostHashTag hashtag={hashtag} setHashtag={setHashtag} />
      </div>

      <div className='p-content-pd p-content-rounded mb-[44px] h-fit w-full  bg-[#ffffff]'>
        <div className='p-content-mb p-font-color-default flex flex-row items-end'>
          <div className=' mr-[20px] text-[20px] font-semibold text-[#8A1F21]'>
            판결 참여자 입력
          </div>
          <div className='text-[12px] text-[#333333]'>
            본인을 포함해 판결에 참여할 대상의 정보를 입력해주세요
          </div>
        </div>
        <PostJudgeParticipants setInGameInfoRequest={setInGameInfoRequest} />
        <div className='flex flex-row justify-end'>
          <button
            type='button'
            className='flex flex-row items-center rounded-[50px] bg-[#8A1F21] px-[22px] py-[14px] text-[17px] text-white'
            onClick={handleSubmit}
          >
            <IoSaveOutline className='mr-[5px]' />
            작성완료
          </button>
        </div>
      </div>
    </>
  );
}
