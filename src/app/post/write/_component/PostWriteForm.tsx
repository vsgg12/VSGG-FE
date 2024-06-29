'use client';
import { useEffect, useState, useCallback } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import PostUploadDesc from './PostUploadDesc';
import { useRouter } from 'next/navigation';
import { IoSaveOutline } from 'react-icons/io5';
import { ICreatePostFormProps } from '@/types/form';
import PostUploadFile from './PostUploadFile';
import PostForm from './PostForm';
import PostHashTag from './PostHashTag';
import PostJudgeParticipants from './PostJudgeParticipants';

const intialInGameInfoRequest: IIngameInfoRequestType[] = [
  { position: 'TOP', champion: '', tier: '' },
  { position: 'TOP', champion: '', tier: '' },
];

export default function PostWriteForm() {
  const isLogin = true;
  const router = useRouter();
  const [uploadedVideo, setUploadedVideo] = useState<any>(null);
  const [thumbnail, setThumbnail] = useState<Blob>();
  const [uploadedThumbnail, setUploadedThumbnail] = useState<any>(null);
  const [content, setContent] = useState('');
  const [contentUrls, setContentImgUrls] = useState<string[]>([]);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [InGameInfoRequest, setInGameInfoRequest] =
    useState<IIngameInfoRequestType[]>(intialInGameInfoRequest);

  const postCreated = false;
  const { handleSubmit } = useForm<ICreatePostFormProps>();

  const onSubmit: SubmitHandler<ICreatePostFormProps> = async (data) => {
    if (!uploadedVideo) {
      alert('영상을 업로드 해주세요');
      return;
    }

    if (data.title === '') {
      alert('제목을 입력해주세요');
      return;
    }

    const inGameInfoRequests = InGameInfoRequest.map(({ champion, ...rest }) => ({
      championName: champion,
      ...rest,
    }));

    for (const info of inGameInfoRequests) {
      if (!info.championName || !info.position || !info.tier) {
        alert('모든 챔피언, 포지션 및 티어를 입력해주세요.');
        return;
      }
    }

    const contentData = new Blob([content], { type: 'text/html' });

    const postRequestData = {
      title: data.title,
      type: 'FILE',
      hashtag: hashtags,
      inGameInfoRequests: inGameInfoRequests,
      videoUrl: data.link,
    };

    for (const info of inGameInfoRequests) {
      if (!info.championName || !info.position || !info.tier) {
        alert('모든 챔피언, 포지션 및 티어를 입력해주세요.');
        return;
      }
    }

    //아무것도 없을 때 보내는거
    const emptyBlob = new Blob([]);
    const emptyFile = new File([emptyBlob], '');

    const postFormData = new FormData();
    postFormData.append(
      'postAddRequest',
      new Blob([JSON.stringify(postRequestData)], { type: 'application/json' }),
    );
    if (uploadedVideo) {
      postFormData.append('uploadVideos', uploadedVideo);
    } else {
      postFormData.append('uploadVideos', emptyFile);
    }

    if (!uploadedThumbnail) {
      if (thumbnail) {
        postFormData.append('thumbnailImage', thumbnail);
      } else {
        postFormData.append('thumbnailImage', emptyFile);
      }
    } else {
      postFormData.append('thumbnailImage', uploadedThumbnail);
    }

    postFormData.append('content', contentData, 'content.html');

    const postComfirm = confirm('게시글 작성을 완료하시겠습니까?');
    if (postComfirm) {
      router.push('/');
      //   setIsLoading(true);
      //   const res = await createPost(postFormData);
      //   // console.log(res);
      //   if (res.resultMsg === 'CREATED') {
      //     if (typeof window !== 'undefined') {
      //       alert('게시글 작성이 완료되었습니다.');
      //       setIsLoading(false);
      //       router.push('/home');
      //     }
      //   }
      //   if (res.status === 500) {
      //     // alert('작성 오류입니다. 업로드한 파일을 확인해주세요');
      //     await deleteToken();
      //     alert('문제가 생겨 게시글을 업로드 할 수 없습니다.');
      //     router.push('/auth/signIn');
      //     return;
      //   }
      // } else {
      //   return;
      // }
    }
  };

  const beforeUnloadHandler = useCallback((event: BeforeUnloadEvent) => {
    if (isLogin || !postCreated) {
      const message = '페이지를 떠나면 작성된 내용이 사라집니다.';
      event.preventDefault();
      return message;
    }
  }, []);

  const handlePopState = useCallback(async () => {
    if (isLogin || !postCreated) {
      const message = '페이지를 떠나면 작성된 내용이 사라집니다.';
      if (!confirm(message)) {
        history.pushState(null, '', '');
        return;
      }

      await handleDelete();
      history.back();
    }
  }, []);

  useEffect(() => {
    const originalPush = router.push;

    const newPush = async (href: string): Promise<void> => {
      const message = '페이지를 떠나면 작성된 내용이 사라집니다.';
      if (confirm(message)) {
        await handleDelete();
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
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [handlePopState]);

  const handleDelete = async () => {
    const deleteData = { imageUrl: contentUrls };
    // const data = await sendDeleteRequestToS3(deleteData);
  };

  return (
    <>
      {/* {isLoading && <LoadingFull />} */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='p-content-pd p-content-rounded mb-[44px] h-fit w-full  bg-[#ffffff]'>
          <PostUploadDesc />
          <div className='p-content-mb relative h-[150px]'>
            <PostUploadFile
              uploadedVideo={uploadedVideo}
              setUploadedVideo={setUploadedVideo}
              setThumbnail={setThumbnail}
            />
          </div>
        </div>

        <div className='p-content-pd p-content-rounded mb-[44px] h-fit w-full  bg-[#ffffff]'>
          <PostForm />
          <div className='mx-[30px] mb-[30px] text-[20px] font-semibold  text-[#8A1F21]'>
            해시태그
          </div>
          <PostHashTag />
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
          <PostJudgeParticipants />
          <div className='flex flex-row justify-end'>
            <button
              type='submit'
              className='flex flex-row items-center rounded-[50px] bg-[#8A1F21] px-[22px] py-[14px] text-[17px] text-white'
            >
              <IoSaveOutline className='mr-[5px]' />
              작성완료
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
