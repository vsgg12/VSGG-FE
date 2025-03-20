'use client';
import React, { useRef, useEffect, useState, useMemo, useCallback, ChangeEvent } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import { useParams, useRouter } from 'next/navigation';

import {
  IoVideocamOutline,
  IoEaselOutline,
  IoSaveOutline,
  IoDocumentOutline,
  IoCloseOutline,
} from 'react-icons/io5';
import { ICreatePostFormProps } from '@/types/form';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import { saveImageAndRequestUrlToS3, sendDeleteRequestToS3 } from '@/api/postPostForm';
import LoadingFull from '@/components/LoadingFull';
import PostUploadDesc from '@/app/post/write/_component/PostUploadDesc';
import {
  positions,
  quillPlaceHolder,
  ReactQuillBase,
  tabs,
  tiers,
} from '@/app/post/write/_component/PostFe';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import getPostItem from '@/api/getPostItem';
import patchEditPost from '@/api/patchEditPost';

export default function EditForm() {
  const { isLogin, accessToken } = useAuthStore();
  const router = useRouter();
  const { postId } = useParams<{ postId: string }>();

  const { data: post } = useQuery<IGetPostItemType>({
    queryKey: ['POST_ITEM', postId],
    queryFn: async () => getPostItem(postId, isLogin ? accessToken : ''),
  });

  const [redirect, setRedirect] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedVideo, setUploadedVideo] = useState<File | undefined>(undefined);
  const [thumbnail, setThumbnail] = useState<Blob | undefined>(undefined);
  const [uploadedThumbnail, setUploadedThumbnail] = useState<File | undefined>(undefined);
  const [content, setContent] = useState<string>('');
  const [contentImgUrls, setContentImgUrls] = useState<string[]>([]);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>('');
  const [ingameInfos, setIngameInfos] = useState<IGetInGameInfoType[]>();

  const [selectedPos, setSelectedPos] = useState<{ [key: number]: number }>();

  useEffect(() => {
    if (post) {
      const initialSelectedPos = post?.postDTO.inGameInfoList.reduce(
        (acc, info) => {
          const posIndex = positions.findIndex((pos) => pos.content === info.position);
          if (posIndex !== -1) {
            acc[info.inGameInfoId] = posIndex;
          }
          return acc;
        },
        {} as { [key: number]: number },
      );
      setContent(post.postDTO.content);
      setSelectedPos(initialSelectedPos);
      setIngameInfos(post.postDTO.inGameInfoList);
      setHashtags(post.postDTO.hashtagList.map((hashtag) => hashtag.name));
    }
  }, [post]);

  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [postEdited, setPostEdited] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const quillRef = useRef<ReactQuill>(null);

  const { register, handleSubmit, setValue } = useForm<ICreatePostFormProps>();

  const usePatchEditPost = (authorization: string, postId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (body: FormData) => patchEditPost(body, authorization, postId),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['POST_ITEM'],
        });
        setPostEdited(true);
        router.back();
      },
      onError: (error) => {
        if (error.message === 'VIDEO_REQUIRED') {
          alert('영상 첨부는 필수입니다!');
        } else if (error.message === 'POST_EDIT_RESTRICTED_WITHIN_24H') {
          alert('게시글 수정은 판결 종료 24시간 이내의 게시글만 가능합니다.');
          router.back();
        }
      },
    });
  };

  const { mutate: editPost } = usePatchEditPost(accessToken, postId);

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

    const inGameInfoRequests = ingameInfos?.map(({ championName, position, tier }) => ({
      championName: championName,
      position: position,
      tier: tier,
    }));

    const contentData = new Blob([content], { type: 'text/html' });

    hashtags.length === 0 &&
      inGameInfoRequests &&
      setHashtags([`${inGameInfoRequests[0].championName}`, `${inGameInfoRequests[0].tier}`]);
    const postRequestData = {
      title: data.title,
      videoType: 'FILE',
      hashtag: hashtags,
      inGameInfoRequests: inGameInfoRequests,
    };
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

    const postConfirm = confirm('게시글 수정을 완료하시겠습니까?');
    if (postConfirm) {
      setIsLoading(true);
      editPost(postFormData);
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
        alert('파일 형식이 mp4가 아닙니다.');
        return;
      }

      setUploadedVideo(file);

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

  const handlePositionChange = (position: string, index: number) => {
    const updatedIngameInfos = ingameInfos?.map((info, idx) =>
      idx === index ? { ...info, position } : info,
    );
    setIngameInfos(updatedIngameInfos);
  };

  const handleTierChange = (tier: string, index: number) => {
    const updatedIngameInfos = ingameInfos?.map((info, idx) =>
      idx === index ? { ...info, tier } : info,
    );
    setIngameInfos(updatedIngameInfos);
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

  const beforeUnloadHandler = useCallback(
    (event: BeforeUnloadEvent) => {
      if (isLogin && !postEdited) {
        const message = '페이지를 떠나면 수정된 내용이 사라집니다.';
        event.preventDefault();
        return message;
      }
    },
    [isLogin, postEdited],
  );

  const handlePopState = useCallback(async () => {
    if (isLogin && !postEdited) {
      const message = '페이지를 떠나면 수정된 내용이 사라집니다.';
      if (!confirm(message)) {
        history.pushState(null, '', '');
        return;
      }

      await handleDelete();
      history.back();
    }
  }, [isLogin, postEdited]);

  useEffect(() => {
    const originalPush = router.push;

    const newPush = async (href: string): Promise<void> => {
      const message = '페이지를 떠나면 수정된 내용이 사라집니다.';
      if (isLogin && !postEdited && confirm(message)) {
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
  }, [isLogin, postEdited, beforeUnloadHandler, router]);

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
    if (!postEdited) {
      return await sendDeleteRequestToS3(deleteData, accessToken);
    }
  };
  useEffect(() => {
    if (redirect) {
      setRedirect(false); // 리디렉션 상태 초기화
      router.back();
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
                        ) : post?.postDTO.video.url ? (
                          <div>{post.postDTO.video.url}</div>
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
                        ) : post?.postDTO.thumbnailURL ? (
                          <div>{post.postDTO.thumbnailURL}</div>
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
          
          {selectedTab === 0 && post && !uploadedVideo ? (
              <video
                muted
                controls
                playsInline
                poster={post.postDTO.thumbnailURL}
                className='p-content-s-mb h-fit w-[500px] rounded-[30px] block visible'
              >
                <source src={post.postDTO.video.url} type='video/mp4' />
                <source src={post.postDTO.video.url} type='video/webm' />
              </video>
            ) : 
              selectedTab === 1 && post && !uploadedThumbnail && <img src={post.postDTO.thumbnailURL} className="w-[500px] h-fit"></img>
            
          }
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
              defaultValue={post?.postDTO.title}
              {...register('title')}
            />
          </div>
          <div className='p-content-mb h-[700px] overflow-hidden  rounded-[30px] border-[1.5px] border-[#828282] text-[16px]'>
            <ReactQuillBase
              theme='snow'
              forwardedRef={quillRef}
              modules={modules}
              className='h-[100%] w-full whitespace-pre-wrap outline-none'
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
              본인을 포함한 판결에 참여할 대상의 티어만 수정 가능합니다.
            </div>
          </div>

          {ingameInfos?.map((ingameInfo, index) => (
            <div key={index}>
              {index === 0 ? (
                <div className='flex flex-row justify-between'>
                  <div className='mb-[15px] text-[12px] text-[#333333]'>
                    본인의 티어만 수정가능합니다.
                  </div>
                </div>
              ) : index === 1 ? (
                <div className='flex flex-row justify-between'>
                  <div className='mb-[15px] mt-[20px] text-[12px] text-[#333333]'>
                    상대의 티어만 수정가능합니다.
                  </div>
                  <hr />
                </div>
              ) : (
                ''
              )}
              <div className='relative mb-[20px] flex flex-col overflow-hidden rounded-[30px] border-2 border-[#8A1F21] p-[20px]'>
                <div className='flex w-[100%] items-center'>
                  {selectedPos &&
                    positions.map((pos, index) => (
                      <div key={index}>
                        <input
                          type='radio'
                          name={`position-${ingameInfo.inGameInfoId}`}
                          id={`${pos.id}-${ingameInfo.inGameInfoId}`}
                          value={pos.content}
                          className='p-input-hidden'
                          disabled={true}
                          checked={selectedPos[ingameInfo.inGameInfoId] === index}
                        />
                        <label
                          htmlFor={`${pos.id}-${ingameInfo.inGameInfoId}`}
                          className={changePositionRadioStyle(
                            selectedPos[ingameInfo.inGameInfoId] === index,
                          )}
                        >
                          <div className='mr-1 py-1'>
                            {selectedPos[ingameInfo.inGameInfoId] === index ? pos.svgW : pos.svg}
                          </div>
                          <div>{pos.content}</div>
                        </label>
                      </div>
                    ))}
                  <select
                    id='champions-select'
                    className='p-select'
                    disabled={true}
                    defaultValue={post?.postDTO.inGameInfoList[index].championName}
                  >
                    <option>{post?.postDTO.inGameInfoList[index].championName}</option>
                  </select>
                  <select
                    id='tiers-select'
                    className='p-select'
                    onChange={(e) => handleTierChange(e.target.value, index)}
                    defaultValue={post?.postDTO.inGameInfoList[index].tier} // 기본값 설정
                  >
                    {tiers.map((tier, index) => (
                      <option key={index} id={tier.id} value={tier.content}>
                        {tier.content}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='flex flex-row justify-end'>
          <button
            type='submit'
            className='flex flex-row items-center rounded-[50px] bg-[#8A1F21] px-[22px] py-[14px] text-[17px] text-white'
          >
            <IoSaveOutline className='mr-[5px]' />
            수정완료
          </button>
        </div>
      </form>
    </>
  );
}
