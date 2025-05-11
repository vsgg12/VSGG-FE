'use client';
import React, { useRef, useEffect, useState, useMemo, useCallback, ChangeEvent } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';

import ReactQuill from 'react-quill';

import PostUploadDesc from './PostUploadDesc';
import { useRouter } from 'next/navigation';

import Image from 'next/image';
import topSVG from '../../../../../public/svg/top.svg';
import midSVG from '../../../../../public/svg/mid.svg';
import jungleSVG from '../../../../../public/svg/jungle.svg';
import onedealSVG from '../../../../../public/svg/onedeal.svg';
import supportSVG from '../../../../../public/svg/supporter.svg';

import topWSVG from '../../../../../public/svg/top-w.svg';
import midWSVG from '../../../../../public/svg/mid-w.svg';
import jungleWSVG from '../../../../../public/svg/jungle-w.svg';
import onedealWSVG from '../../../../../public/svg/onedeal-w.svg';
import supportWSVG from '../../../../../public/svg/supporter-w.svg';

import Icon_calendar from '../../../../../public/svg/Icon_calendar.svg';
import moment from 'moment';

import { IoIosClose } from 'react-icons/io';

import {
  IoVideocamOutline,
  IoEaselOutline,
  IoAddCircleOutline,
  IoSaveOutline,
  IoDocumentOutline,
  IoCloseOutline,
} from 'react-icons/io5';

import dynamic from 'next/dynamic';
import { ChampionDataProps, ICreatePostFormProps, IWrappedComponent } from '@/types/form';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import { createPost, saveImageAndRequestUrlToS3, sendDeleteRequestToS3 } from '@/api/postPostForm';
import LoadingFull from '@/components/LoadingFull';
import Calendar from './Calendar';

export const ReactQuillBase = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill');

    return function forwardRef({ forwardedRef, ...props }: IWrappedComponent) {
      const newProps = {
        ...props,
        modules: {
          ...props.modules,
        },
      };
      return <RQ ref={forwardedRef} {...newProps} />;
    };
  },
  { ssr: false },
);

export const tabs = [
  { id: 0, title: '파일 불러오기' },
  { id: 1, title: '썸네일 업로드' },
];

export const positions = [
  {
    id: 'TOP',
    value: 'TOP',
    content: '탑',
    svg: <Image alt='TOP' src={topSVG} width={18} height={18} />,
    svgW: <Image alt='TOP' src={topWSVG} width={18} height={18} />,
  },
  {
    id: 'jungle',
    value: 'JUNGLE',
    content: '정글',
    svg: <Image alt='jungle' src={jungleSVG} width={18} height={18} />,
    svgW: <Image alt='jungle' src={jungleWSVG} width={18} height={18} />,
  },
  {
    id: 'mid',
    value: 'MID',
    content: '미드',
    svg: <Image alt='mid' src={midSVG} width={18} height={18} />,
    svgW: <Image alt='mid' src={midWSVG} width={18} height={18} />,
  },
  {
    id: 'onedeal',
    value: 'ADCARRY',
    content: '원딜',
    svg: <Image alt='onedeal' src={onedealSVG} width={18} height={18} />,
    svgW: <Image alt='onedeal' src={onedealWSVG} width={18} height={18} />,
  },
  {
    id: 'support',
    value: 'SUPPORT',
    content: '서폿',
    svg: <Image alt='support' src={supportSVG} width={18} height={18} />,
    svgW: <Image alt='support' src={supportWSVG} width={18} height={18} />,
  },
];

export const tiers = [
  { id: undefined, value: undefined, content: '티어 선택' },
  { id: 'unrank', value: 'UNRANK', content: '언랭' },
  { id: 'iron', value: 'IRON', content: '아이언' },
  { id: 'bronze', value: 'BRONZE', content: '브론즈' },
  { id: 'silver', value: 'SILVER', content: '실버' },
  { id: 'gold', value: 'GOLD', content: '골드' },
  { id: 'platinum', value: 'PLATINUM', content: '플래티넘' },
  { id: 'emerald', value: 'EMERALD', content: '에메랄드' },
  { id: 'diamond', value: 'DIAMOND', content: '다이아몬드' },
  { id: 'master', value: 'MASTER', content: '마스터' },
  { id: 'grand_master', value: 'GRANDMASTER', content: '그랜드마스터' },
  { id: 'challenger', value: 'CHALLENGER', content: '챌린저' },
];

export const quillPlaceHolder =
  '[판결 게시글 내용 작성 가이드]\n\n' +
  '1. 판결 받고 싶은 게임 영상을 업로드해주세요.\n' +
  '\t\t파일 크기 제한 : 500MB\n' +
  '\t\t파일 형식: mp4\n' +
  '\t\t영상을 업로드하기 전에 불필요한 부분을 편집하여 핵심 상황만 포함해주세요.' +
  '2. 영상에 대한 상황을 구체적으로 작성해주세요.\n' +
  '3. (선택사항) 임 상황의 이해를 도울 수 있는 이미지도 함께 첨부해주세요\n' +
  '\t\t이미지 개수 제한 : 3개 이내\n' +
  '\t\t파일 크기 제한 : 2MB\n' +
  '\t\t파일 형식: jpg, jpeg, png\n\n' +
  '정보통신망 이용촉진 및 정보 보호 등에 관한 법률 제 44조의7(불법정보의 유통금지 등)\n' +
  '부적절한 콘텐트 또는 게시글, 댓글 등은 금지되어있습니다. 모든 롤 유저가 재밌게 즐기는 깨끗한 VS.GG를 위해 함께해 주시기 바랍니다.';

export default function PostForm() {
  const { isLogin, accessToken } = useAuthStore();
  const router = useRouter();
  const [nowDate] = useState(moment().format('YYYY / MM / DD'));
  const [selectedDate, setSelectedDate] = useState<string | null>(
    moment().add(72, 'hours').format('YYYY / MM / DD'),
  );
  const [endDate, setEndDate] = useState<number>(3);

  const [redirect, setRedirect] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedVideo, setUploadedVideo] = useState<File | undefined>(undefined);
  const [thumbnail, setThumbnail] = useState<Blob | undefined>(undefined);
  const [uploadedThumbnail, setUploadedThumbnail] = useState<File | undefined>(undefined);
  const [content, setContent] = useState<string>('');
  const [contentImgUrls, setContentImgUrls] = useState<string[]>([]);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [videoLink, setVideoLink] = useState<string>('');
  const [tagInput, setTagInput] = useState<string>('');
  const [ingameInfos, setIngameInfos] = useState<IInGameInfoType[]>([
    { inGameInfoId: 0, position: '탑', championName: '', tier: '' },
    { inGameInfoId: 1, position: '탑', championName: '', tier: '' },
  ]);
  const [champions, setChampions] = useState<string[]>(['챔피언 선택']);
  const [selectedPos, setSelectedPos] = useState<{ [key: number]: number }>({
    0: 0,
    1: 0,
  });
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [postCreated, setPostCreated] = useState<boolean>(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

  const isClickedFirst = useRef(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const quillRef = useRef<ReactQuill>(null);

  const { register, handleSubmit, setValue } = useForm<ICreatePostFormProps>();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length > 35) {
      setValue('title', value.slice(0, 35));
    }
  };

  const onSubmit: SubmitHandler<ICreatePostFormProps> = async (data) => {
    if (!uploadedVideo) {
      alert('영상을 업로드 해주세요');
      return;
    }

    if (data.title === '') {
      alert('제목을 입력해주세요');
      return;
    }

    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      const textLength = editor.getText().length - 1;
      if (textLength === 0) {
        alert('본문 작성은 필수입니다');
        return;
      }
    }

    const inGameInfoRequests = ingameInfos.map(({ championName, position, tier }) => ({
      championName: championName,
      position: position,
      tier: tier,
    }));

    for (const info of inGameInfoRequests) {
      if (!info.championName || !info.position || !info.tier) {
        alert('모든 챔피언, 포지션 및 티어를 입력해주세요.');
        return;
      }
    }

    const contentData = new Blob([content], { type: 'text/html' });

    hashtags.length === 0 &&
      setHashtags([`${inGameInfoRequests[0].championName}`, `${inGameInfoRequests[0].tier}`]);
    const postRequestData:IPostAddRequestType = {
      title: data.title,
      videoType: uploadedVideo ? 'FILE' : 'LINK',
      hashtag: hashtags,
      inGameInfoRequests: inGameInfoRequests,
      voteEndDate: moment(selectedDate).format('YYYYMMDD'),
      
    };
    //아무것도 없을 때 보내는거
    const emptyBlob = new Blob([]);
    const emptyFile = new File([emptyBlob], '');

    const postFormData = new FormData();

    postFormData.append(
      'postAddRequest',
      new Blob([JSON.stringify(postRequestData)], { type: 'application/json' }),
    );
    if (uploadedVideo && !videoLink) {
      postFormData.append('uploadVideos', uploadedVideo);
    } else if (!uploadedVideo && videoLink) {
      postRequestData.videoLink = videoLink
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

    const postConfirm = confirm('게시글 작성을 완료하시겠습니까?');
    if (postConfirm) {
      setIsLoading(true);
      try {
        // for (const [key, value] of postFormData.entries()) {
        //   console.log(key, value);
        //   if (key === 'postAddRequest') {
        //     const fileReader = new FileReader();
        //     fileReader.onload = function (event) {
        //       console.log(`Decoded JSON data for ${key}:`, event.target?.result);
        //     };
        //     fileReader.readAsText(value as Blob); // Blob을 다시 텍스트로 변환
        //   } else {
        //     console.log(`${key}:`, value);
        //   }
        // }
        const res = await createPost(postFormData, accessToken);
        if (res.status === 200) {
          alert('게시글 작성이 완료되었습니다!');
          setPostCreated(true);
          setRedirect(true);
          setSelectedDate(null);
        } else if (res.status === 500) {
          alert('문제가 생겨 게시글을 업로드 할 수 없습니다.');
        } else if (res.status === 400) {
          alert('영상을 업로드 또는 판결 종료 기간 설정을 다시 확인해주세요!');
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    } else {
      return;
    }
  };

  const changeTabTitleStyle = (index: number): string => {
    return selectedTab === index ? 'p-tab-title p-tab-selected' : 'p-tab-title p-tab-n-selected';
  };

  const changeTabContentStyle = (index: number): string => {
    return `p-tab-content ${selectedTab === index ? '' : 'hidden'}`;
  };

  const changePositionRadioStyle = (checked: boolean) => {
    return checked ? 'p-position p-position-selected' : 'p-position p-position-n-selected';
  };

  const handleTabChange = (index: number) => {
    setSelectedTab(index);
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

      if (!file.type) {
        alert('파일 형식을 확인할 수 없습니다.');
        return;
      }

      if (file.type !== fileType || !file.name.endsWith('.mp4')) {
      if (!file.type) {
        alert('파일 형식을 확인할 수 없습니다.');
        return;
      }

      if (file.type !== fileType || !file.name.endsWith('.mp4')) {
        alert('파일 형식이 mp4가 아닙니다.');
        return;
      }

      setUploadedVideo(file); // 확인 완료
      setVideoLink("");

      // 썸네일 이미지 생성
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

  //hashtags
  const handleTagInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.nativeEvent.isComposing) {
      event.preventDefault();
      const newTag = event.currentTarget.value.trim();
      if (newTag && !hashtags.includes(newTag) && hashtags.length < 5) {
        if (newTag.length > 12) {
          alert('해시태그는 띄어쓰기 포함 최대 12자입니다.');
          return;
        }
        setHashtags([...hashtags, newTag]);
        setTagInput('');
      }
    }
  };

  const handleTagInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTagInput(event.target.value);
  };

  const handleChange = (value: string) => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      const textLength = editor.getText().trim().length;
      if (textLength > 1000) {
        editor.deleteText(1000, textLength);
        alert('본문은 1000자까지만 가능합니다!');
      } else {
        setContent(value);
      }
    } else {
      setContent(value);
    }
  };

  const removeTag = (index: number) => {
    setHashtags(hashtags.filter((_, idx) => idx !== index)); // 특정 인덱스의 태그 제거
  };

  const addIngameInfo = (): void => {
    const newInfo = {
      inGameInfoId: ingameInfos.length,
      position: '탑',
      championName: '',
      tier: '',
    };
    setIngameInfos(ingameInfos.concat(newInfo));

    const updatedSelectedPos = {
      ...selectedPos,
      [newInfo.inGameInfoId]: 0,
    };
    setSelectedPos(updatedSelectedPos);
  };

  const handlePositionChange = (position: string, index: number) => {
    const updatedIngameInfos = ingameInfos.map((info, idx) =>
      idx === index ? { ...info, position } : info,
    );
    setIngameInfos(updatedIngameInfos);
  };

  const handleChampionChange = (championName: string, index: number) => {
    const updatedIngameInfos = ingameInfos.map((info, idx) =>
      idx === index ? { ...info, championName } : info,
    );
    setIngameInfos(updatedIngameInfos);
  };

  const handleTierChange = (tier: string, index: number) => {
    const updatedIngameInfos = ingameInfos.map((info, idx) =>
      idx === index ? { ...info, tier } : info,
    );
    setIngameInfos(updatedIngameInfos);
  };

  const removeIngameInfo = (index: number): void => {
    setIngameInfos(ingameInfos.filter((_, idx) => idx !== index));
  };

  // 사용자가 업로드한 이미지 url 배열에 추가
  // 문제점: 사용자가 사진을 삭제해도 delete가 안되고 그대로 있음
  const updateContentImgUrls = (newUrl: string) => {
    setContentImgUrls((prevUrls) => {
      const newUrls = [...prevUrls, newUrl];
      return newUrls;
    });
  };

  const contentImgUrlsRef = useRef<string[]>(contentImgUrls);

  useEffect(() => {
    contentImgUrlsRef.current = contentImgUrls;
  }, [contentImgUrls]);

  //useCallback
  const imageHandler = useCallback(() => {
    if (contentImgUrlsRef.current.length >= 3) {
      alert(`최대 3개의 이미지만 업로드할 수 있습니다.`);
      return;
    }
    //input type= file DOM을 만든다.
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/jpeg, image/jpg, image/png');
    input.click(); //toolbar 이미지를 누르게 되면 이 부분이 실행된다.
    /*이미지를 선택하게 될 시*/
    input.onchange = async () => {
      /*이미지 선택에 따른 조건을 다시 한번 하게 된다.*/
      const file = input.files ? input.files[0] : null;
      /*선택을 안하면 취소버튼처럼 수행하게 된다.*/
      if (!file) return;

      const fileType = file.type;
      const fileSize = file.size;

      const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      const maxSize = 2 * 1024 * 1024; // 2MB

      if (!validTypes.includes(fileType)) {
        alert('jpg, jpeg, png 형식의 파일만 업로드 가능합니다.');
        return;
      }

      if (fileSize > maxSize) {
        alert('파일 크기는 최대 2MB까지 업로드 가능합니다.');
        return;
      }

      /*서버에서 FormData형식으로 받기 때문에 이에 맞는 데이터형식으로 만들어준다.*/
      const formData = new FormData();
      formData.append('file', file);
      /*에디터 정보를 가져온다.*/
      const quillObj = quillRef.current?.getEditor();
      /*에디터 커서 위치를 가져온다.*/
      const range = quillObj?.getSelection();

      try {
        const res = await saveImageAndRequestUrlToS3(formData, accessToken);
        if (res.resultCode === 200) {
          const imgUrl = res.images[0];
          updateContentImgUrls(imgUrl);
          /*에디터의 커서 위치에 이미지 요소를 넣어준다.*/
          if (range) {
            quillObj?.insertEmbed(range.index, 'image', `${imgUrl}`);
            quillObj?.setSelection(range.index + 2, 0);
          }
        } else {
          alert('이미지 업로드에 실패하셨습니다.');
        }
      } catch (error) {
        console.log(error);
      }
    };
  }, []);

  useEffect(() => {
    if (!isClickedFirst.current) {
      history.pushState(null, '', '');
      isClickedFirst.current = true;
    }

    fetch('https://ddragon.leagueoflegends.com/cdn/15.5.1/data/ko_KR/champion.json')
      .then((response) => response.json())
      .then((data: ChampionDataProps) => {
        const loadedChampions = Object.keys(data.data).map((key) => data.data[key].name);

        const sortedChampions = loadedChampions.sort(function (a, b) {
          return a.localeCompare(b);
        });

        setChampions((prev) => [...prev, ...sortedChampions]);
      })
      .catch((error) => console.error('Error loading the champions:', error));
  }, []);

  const beforeUnloadHandler = useCallback(
    (event: BeforeUnloadEvent) => {
      if (isLogin && !postCreated) {
        const message = '페이지를 떠나면 작성된 내용이 사라집니다.';
        event.preventDefault();
        return message;
      }
    },
    [isLogin, postCreated],
  );

  const handlePopState = useCallback(async () => {
    if (isLogin && !postCreated) {
      const message = '페이지를 떠나면 작성된 내용이 사라집니다.';
      if (!confirm(message)) {
        history.pushState(null, '', '');
        return;
      }

      await handleDelete();
      history.back();
    }
  }, [isLogin, postCreated]);

  useEffect(() => {
    const originalPush = router.push;

    const newPush = async (href: string): Promise<void> => {
      const message = '페이지를 떠나면 작성된 내용이 사라집니다.';
      if (isLogin && !postCreated && confirm(message)) {
        await handleDelete();
        originalPush(href);
      } else {
        originalPush(href);
      }
    };

    router.push = newPush;
    window.onbeforeunload = beforeUnloadHandler;

    return () => {
      router.push = originalPush;
      window.onbeforeunload = null;
    };
  }, [isLogin, postCreated, beforeUnloadHandler, router]);

  useEffect(() => {
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [handlePopState]);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [['image']],
        handlers: {
          image: imageHandler,
        },
      },
      clipboard: {
        matchVisual: true,
      },
    }),
    [imageHandler],
  );

  const handleDelete = async () => {
    const deleteData = { imageUrl: contentImgUrls };
    if (!postCreated) {
      return await sendDeleteRequestToS3(deleteData, accessToken);
    }
  };
  useEffect(() => {
    if (redirect) {
      setRedirect(false); // 리디렉션 상태 초기화
      router.push('/home');
    }
  }, [redirect, router]);

  return (
    <>
      {isLoading && <LoadingFull />}
      <form onSubmit={handleSubmit(onSubmit)} className='py-[30px] min-w-[1230px]'>
        <div className='p-content-pd p-content-rounded mb-[44px] h-fit w-full bg-[#ffffff]'>
          <PostUploadDesc />
          <div className='p-content-mb relative h-[150px]'>
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
                      {index === 0 ? <IoVideocamOutline /> : index === 1 && <IoEaselOutline />}
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
                      <canvas ref={canvasRef} style={{ display: 'none' }} />
                      <img ref={imageRef} style={{ display: 'none' }} alt='Video Thumbnail' />
                    </div>
                  ) : tab.id === 1 ? (
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
                  ) : (
                    ''
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='p-content-pd p-content-rounded mb-[44px] h-fit w-full bg-[#ffffff]'>
          <div className='p-content-mb  text-[20px] font-semibold text-[#8A1F21]'>글 작성</div>
          <div className='p-content-mb p-font-color-default flex flex-row items-center justify-center'>
            <div className='mr-[30px] text-[20px]'>제목</div>
            <input
              type='text'
              maxLength={35}
              onInput={handleTitleChange}
              className=' grow rounded-[30px] border-[1.5px] border-[#828282] px-[30px] py-[15px] text-[20px]  outline-none'
              placeholder='최대 35글자 입력 가능합니다.'
              {...register('title')}
            />
          </div>
          <div className='p-content-mb h-[700px] overflow-hidden rounded-[30px] border-[1.5px] border-[#828282] text-[16px]'>
            <ReactQuillBase
              theme='snow'
              forwardedRef={quillRef}
              modules={modules}
              className=' h-[100%] w-full whitespace-pre-wrap outline-none'
              value={content}
              onChange={handleChange}
              placeholder={quillPlaceHolder}
            />
          </div>
          <div className=' mb-[30px] text-[20px] font-semibold  text-[#8A1F21]'>해시태그</div>
          <input
            type='text'
            className='mb-4 w-full rounded-[30px] border-[1.5px] border-[#828282] px-[30px] py-[10px] outline-none'
            placeholder='해시태그를 입력하고 엔터를 눌러주세요! (최대 5개)'
            value={tagInput}
            onChange={handleTagInputChange}
            onKeyDown={handleTagInput}
          />
          <div className='ml-4 flex flex-wrap '>
            {hashtags.map((hashtag, index) => (
              <div
                key={index}
                className='mb-1 mr-3 flex w-fit flex-row items-center justify-center rounded-[150px] border-[1.5px] border-[#333333] px-[15px] py-[5px]'
              >
                <div className='mr-[8px] text-[12px]'># {hashtag}</div>
                <button type='button'>
                  <IoCloseOutline className='text-[20px]' onClick={() => removeTag(index)} />
                </button>
              </div>
            ))}
          </div>
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

          {ingameInfos.map((ingameInfo, index) => (
            <div key={index}>
              {index === 0 ? (
                <div className='flex flex-row justify-between'>
                  <div className='mb-[15px] text-[12px] text-[#333333]'>
                    본인의 챔피언, 포지션, 티어를 선택해주세요.
                  </div>
                </div>
              ) : index === 1 ? (
                <div className='flex flex-row justify-between'>
                  <div className='mb-[15px] mt-[20px] text-[12px] text-[#333333]'>
                    상대의 챔피언, 포지션, 티어를 선택해주세요.
                  </div>
                  <hr />
                </div>
              ) : (
                ''
              )}

              <div className='relative mb-[20px] flex flex-col overflow-hidden rounded-[30px] border-2 border-[#8A1F21] p-[20px]'>
                <div className='flex w-[100%] items-center'>
                  {positions.map((pos, index) => (
                    <div key={index}>
                      <input
                        type='radio'
                        name={`position-${ingameInfo.inGameInfoId}`}
                        id={`${pos.id}-${ingameInfo.inGameInfoId}`}
                        value={pos.content}
                        className='p-input-hidden'
                        onChange={() => {
                          const updatedSelectedPos = { ...selectedPos };
                          updatedSelectedPos[ingameInfo.inGameInfoId] = index;
                          setSelectedPos(updatedSelectedPos);

                          handlePositionChange(pos.content, ingameInfo.inGameInfoId);
                        }}
                        checked={selectedPos[ingameInfo.inGameInfoId] === index}
                      />
                      <label
                        htmlFor={`${pos.id}-${ingameInfo.inGameInfoId}`}
                        className={changePositionRadioStyle(
                          selectedPos[ingameInfo.inGameInfoId] === index,
                        )}
                      >
                        <div className='mr-1 py-1'>
                          {' '}
                          {selectedPos[ingameInfo.inGameInfoId] === index ? pos.svgW : pos.svg}
                        </div>
                        <div>{pos.content}</div>
                      </label>
                    </div>
                  ))}
                  <select
                    id='champions-select'
                    className='p-select'
                    onChange={(e) => handleChampionChange(e.target.value, index)}
                  >
                    {champions.map((champion, index) => (
                      <option key={index} value={champion}>
                        {champion}
                      </option>
                    ))}
                  </select>
                  <select
                    id='tiers-select'
                    className='p-select'
                    onChange={(e) => handleTierChange(e.target.value, index)}
                  >
                    {tiers.map((tier, index) => (
                      <option key={index} id={tier.id} value={tier.content}>
                        {tier.content}
                      </option>
                    ))}
                  </select>
                  {ingameInfo.inGameInfoId === ingameInfos.length - 1 &&
                  ingameInfo.inGameInfoId > 1 ? (
                    <IoIosClose
                      onClick={() => removeIngameInfo(index)}
                      className='absolute right-2 z-10 cursor-pointer text-[23px] text-[#8A1F21] '
                    />
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
          ))}

          {ingameInfos.length < 5 && (
            <div
              onClick={addIngameInfo}
              className='flex cursor-pointer flex-row justify-center text-[50px] text-[#333333]'
            >
              <IoAddCircleOutline className='text-[#8A1F21]' />
            </div>
          )}
        </div>
        <div className='p-content-pd p-content-rounded mb-[44px] h-[360px] w-full relative bg-[#ffffff]'>
          <p className='mb-[70px] text-[20px] font-semibold text-[#8A1F21]'>판결 기간 설정</p>
          <div className='flex items-center gap-5 mb-[70px]'>
            <p className='text-[#333333] text-[16px]'>판결을 받고싶은 기간을 설정해주세요.</p>
            <p className='text-[#828282] text-[12px]'>
              오늘을 기준으로 30일 뒤까지 설정할 수 있습니다. (종료날 23시 59분 판결 종료)
            </p>
          </div>
          <div className='flex justify-between w-[653px] ml-[30px]'>
            <div>
              <p className='text-[18px] text-[#828282] font-semibold'>판결 시작 날짜</p>
              <p className='text-[20px] text-[#333333] mt-[10px]'>{nowDate}</p>
            </div>
            <div className='relative flex border-t-1 border-black w-[236px] transform translate-y-1/2'>
              <p className='text-[#8A1F21] text-[20px] ml-[130px] font-semibold'>판결 종료</p>
              <div className='w-[88px] h-[88px] bg-[#8A1F21] rounded-full absolute flex justify-center items-center translate-y-[-40px] translate-x-[30px]'>
                <p className='text-[#FFFFFF] text-[20px]'>{endDate}일 뒤</p>
              </div>
            </div>

            <div>
              <p className='text-[18px] text-[#828282] font-semibold'>판결 종료 날짜</p>
              <div className='bg-[#f8f8f8] flex p-[10px] rounded-full w-[204px] justify-center items-center'>
                <p className='text-[20px] text-[#333333]'>{selectedDate}</p>
                <Image
                  src={Icon_calendar}
                  width={24}
                  height={24}
                  alt='calendar'
                  className='mx-[10px] cursor-pointer'
                  onClick={() => setIsCalendarOpen((prev) => !prev)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-row justify-end'>
          <button
            type='submit'
            className='flex flex-row items-center rounded-[50px] bg-[#8A1F21] px-[22px] py-[14px] text-[17px] text-white'
          >
            <IoSaveOutline className='mr-[5px]' />
            작성완료
          </button>
        </div>
      </form>
      {isCalendarOpen && (
        <div className='absolute z-40 translate-x-[770px] translate-y-[-520px]'>
          <Calendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            setIsCalendarOpen={setIsCalendarOpen}
            setEndDate={setEndDate}
          />
        </div>
      )}
    </>
  );
}
