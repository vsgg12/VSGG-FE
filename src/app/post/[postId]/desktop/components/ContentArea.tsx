import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Icon_heart from '../../../../../../public/svg/postItem/heart.svg';
import Icon_heart_hover from '../../../../../../public/svg/postItem/heart_hover.svg';
import DOMPurify from 'dompurify';
import patchCancelLike from '@/api/like/patchCancelLike';
import { useMutation } from '@tanstack/react-query';
import postPostLike from '@/api/like/postPostLike';
import { useAuthStore } from '@/app/login/store/useAuthStore';

interface Props {
  post: IGetPostDTOType;
  setIsLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function ContentArea({ post, setIsLoginModalOpen }: Props) {
  const { accessToken, isLogin } = useAuthStore();
  const [sanitizedHtml, setSanitizedHtml] = useState<string>('');
  const [updatedLikeCount, setUpdatedLikeCount] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState<string>('');
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [heartIcon, setHeartIcon] = useState<string>(Icon_heart);
  const [isLikeInProgress, setIsLikeInProgress] = useState<boolean>(false);

  useEffect(() => {
    if (post) {
      const sanitize = DOMPurify.sanitize(post.content);
      setSanitizedHtml(sanitize);
    }
  }, [post]);

  useEffect(() => {
    setIsLiked(post.liked);

    if (post.liked == true) {
      setHeartIcon(Icon_heart_hover);
    }
  }, [post]);

  useEffect(() => {
    if (isLiked) {
      setHeartIcon(Icon_heart_hover);
    } else {
      setHeartIcon(Icon_heart);
    }
  }, [isLiked]);

  useEffect(() => {
    if (!isLiked) {
      if (isHovered == 'like') {
        setHeartIcon(Icon_heart_hover);
      } else {
        setHeartIcon(Icon_heart);
      }
    }
  }, [isHovered, isLiked]);

  const { mutate: likePost } = useMutation({
    mutationFn: async () => {
      const response = await postPostLike(accessToken, post.id);
      return response.postLikeDTO.likeCount;
    },
    onMutate: () => {
      setIsLikeInProgress(true);
    },
    onSuccess: (likeCount) => {
      setIsLiked(true);
      setIsLikeInProgress(false);
      setUpdatedLikeCount(likeCount);
    },
    onError: (error) => {
      console.error(error.message);
      setIsLikeInProgress(false);
    },
  });

  const { mutate: unlikePost } = useMutation({
    mutationFn: async () => {
      const response = await patchCancelLike(accessToken, post.id);
      return response.postLikeDTO.likeCount;
    },
    onMutate: () => {
      setIsLikeInProgress(true);
    },
    onSuccess: (likeCount) => {
      setIsLiked(false);
      setIsLikeInProgress(false);
      setUpdatedLikeCount(likeCount);
    },
    onError: (error) => {
      console.error(error.message);
      setIsLikeInProgress(false);
    },
  });

  const handleLikePost = async (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    if (!isLogin) {
      setIsLoginModalOpen(true);
      return;
    }
    if (isLikeInProgress) {
      return;
    }

    if (isLiked) {
      await unlikePost();
    } else {
      await likePost();
    }
  };

  return (
    <div className='w-[720px] h-[886px] flex flex-col bg-[#FFFFFF] rounded-[20px] p-[30px] gap-[20px]'>
      <div className='flex w-full flex-row place-items-start justify-between font-medium'>
        <p className='font-bold text-[24px]'>{post.title}</p>
      </div>
      <video
        muted
        controls
        playsInline
        poster={post.thumbnailURL}
        className='w-[660px] h-[371px] rounded-[10px] block visible'
      >
        <source src={post.video.url} type='video/mp4' />
        <source src={post.video.url} type='video/webm' />
      </video>
      <div
        className='h-[350px] break-words overflow-scroll'
        dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
      ></div>
      <div
        className='flex cursor-pointer items-center justify-center'
        onClick={handleLikePost}
        onMouseEnter={() => setIsHovered('like')}
        onMouseLeave={() => setIsHovered('')}
      >
        <Image src={heartIcon} width={30} height={30} alt='like' />
        <p>
          {(updatedLikeCount ?? post.likeCount) < 1000
            ? updatedLikeCount ?? post.likeCount
            : '999+'}
        </p>
      </div>
    </div>
  );
}

export default ContentArea;
