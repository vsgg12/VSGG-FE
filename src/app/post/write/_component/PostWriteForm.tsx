'use client';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import PostUploadDesc from './PostUploadDesc';
import { useRouter } from 'next/navigation';
import { IoSaveOutline } from 'react-icons/io5';
import { ICreatePostFormProps } from '@/types/form';
import PostUploadFile from './PostUploadFile';
import PostForm from './PostForm';
import PostHashTag from './PostHashTag';
import PostJudgeParticipants from './PostJudgeParticipants';
import { getStoredLoginState } from '@/app/login/store/useAuthStore';

const intialInGameInfoRequest: IIngameInfoRequestType[] = [
  { position: 'TOP', champion: '', tier: '' },
  { position: 'TOP', champion: '', tier: '' },
];

export default function PostWriteForm() {
  const { isLogin } = getStoredLoginState();
  const router = useRouter();
  const [uploadedVideos, setUploadedVideos] = useState<File | null | undefined>(undefined);
  const [thumbnail, setThumbnail] = useState<Blob | undefined>(undefined);
  console.log('thumbnail', thumbnail);
  const [content] = useState('');
  const [hashtags] = useState<string[]>([]);
  const [InGameInfoRequest] = useState<IIngameInfoRequestType[]>(intialInGameInfoRequest);
  const postCreated = false;
  const { handleSubmit } = useForm<ICreatePostFormProps>();

  const onSubmit: SubmitHandler<ICreatePostFormProps> = async (data) => {
    if (!uploadedVideos) {
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
    if (uploadedVideos) {
      postFormData.append('uploadVideos', uploadedVideos);
    } else {
      postFormData.append('uploadVideos', emptyFile);
    }

    // const { mutate: postWirte } = useMutation({
    //   mutationFn: () => postPostWrite({ body: '', authorization: accessToken }),
    //   onError: (error) => {
    //     console.log(error);
    //     alert('게시물 등록에 실패하셨습니다.');
    //   },
    //   onSuccess: () => {
    //     alert('게시물 등록이 완료되었습니다!');
    //     router.push('/');
    //   },
    // });

    // 업로드된 썸네일이 없을떄랑 있을때 처리해야함

    postFormData.append('content', contentData, 'content.html');

    const postComfirm = confirm('게시글 작성을 완료하시겠습니까?');
    if (postComfirm) {
      // postWirte();
    }
  };

  const beforeUnloadHandler = (event: BeforeUnloadEvent) => {
    if (isLogin || !postCreated) {
      const message = '페이지를 떠나면 작성된 내용이 사라집니다.';
      event.preventDefault();
      return message;
    }
  };

  const handlePopState = () => {
    if (isLogin || !postCreated) {
      const message = '페이지를 떠나면 작성된 내용이 사라집니다.';
      if (!confirm(message)) {
        history.pushState(null, '', '');
        return;
      }

      history.back();
    }
  };

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
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [handlePopState]);

  return (
    <>
      {/* {isLoading && <LoadingFull />} */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='p-content-pd p-content-rounded mb-[44px] h-fit w-full  bg-[#ffffff]'>
          <PostUploadDesc />
          <div className='p-content-mb relative h-[150px]'>
            <PostUploadFile
              uploadedVideo={uploadedVideos}
              setUploadedVideo={setUploadedVideos}
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
