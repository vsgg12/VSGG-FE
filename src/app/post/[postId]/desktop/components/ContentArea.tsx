import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import patchCancelLike from '@/api/like/patchCancelLike';
import { useMutation } from '@tanstack/react-query';
import postPostLike from '@/api/like/postPostLike';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import { useLoginStore } from '@/store/login/useLoginStore';
import { LikeActionIcon } from '@/components/common/icons/PostActionIcons';
import { useSidebarStore } from '@/store/sidebar/useSidebarStore';

interface Props {
  post: IGetPostDTOType;
}

function ContentArea({ post }: Props) {
  const { accessToken, isLogin } = useAuthStore();
  const { setIsLoginModalOpen } = useLoginStore();
  const isDarkMode = useSidebarStore((state) => state.isDarkMode);
  const [sanitizedHtml, setSanitizedHtml] = useState<string>('');
  const [updatedLikeCount, setUpdatedLikeCount] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState<string>('');
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isLikeInProgress, setIsLikeInProgress] = useState<boolean>(false);

  useEffect(() => {
    if (post) {
      const sanitize = DOMPurify.sanitize(post.content);
      setSanitizedHtml(sanitize);
    }
  }, [post]);

  useEffect(() => {
    setIsLiked(post.liked);
  }, [post]);

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

  const handleLikePost = async (e: React.MouseEvent<HTMLElement>) => {
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

  const getYoutubeId = (url: string) => {
    const regExp = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const likeColorClass =
    isLiked || isHovered === 'like'
      ? 'text-primary-500'
      : isDarkMode
        ? 'text-[#D7D8D9]'
        : 'text-semantic-icon-default';
  const contentClass = isDarkMode
    ? 'bg-[#242526] text-[#F1F2F2]'
    : 'bg-semantic-background-surface text-semantic-text-primary';
  const bodyClass = isDarkMode ? 'text-[#F1F2F2]' : '';

  return (
    <div
      className={`w-[720px] h-[886px] flex flex-col rounded-[20px] pt-[30px] pr-[30px] pb-[80px] pl-[30px] gap-[17px] ${contentClass}`}
    >
      <div className='flex w-full flex-row place-items-start justify-between font-medium'>
        <p className='font-bold text-[24px] leading-[30px]'>{post.title}</p>
      </div>
      {post.video.type === 'FILE' ? (
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
      ) : (
        <iframe
          src={`https://www.youtube.com/embed/${getYoutubeId(post.video.url)}`}
          width='560'
          height='315'
          allowFullScreen
          className='w-[660px] h-[371px] rounded-[10px] block visible'
        />
      )}
      <div
        className={`scrollbar-hidden min-h-0 flex-1 break-words overflow-auto text-[14px] leading-[20px] ${bodyClass}`}
        dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
      ></div>
      <div
        className='flex cursor-pointer items-center justify-center gap-[12px]'
        onClick={handleLikePost}
        onMouseEnter={() => setIsHovered('like')}
        onMouseLeave={() => setIsHovered('')}
      >
        <LikeActionIcon className='h-[30px] w-[30px]' alt='like' />
        <p className={`text-[16px] font-semibold ${likeColorClass}`}>
          {(updatedLikeCount ?? post.likeCount) < 1000
            ? updatedLikeCount ?? post.likeCount
            : '999+'}
        </p>
      </div>
    </div>
  );
}

export default ContentArea;
