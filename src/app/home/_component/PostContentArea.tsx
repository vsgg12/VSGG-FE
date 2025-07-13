import useConvertHTML from '@/hooks/useConvertHTML';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Image from 'next/image';
import Icon_heart from '../../../../public/svg/postItem/heart.svg';
import Icon_vote from '../../../../public/svg/postItem/vote.svg';
import Icon_view from '../../../../public/svg/postItem/view.svg';
import postPostLike from '@/api/like/postPostLike';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import HomeVoted from './HomeVoted';
import HomeNotVoted from './HomeNotVoted';

interface Props {
  post: IGetPostDTOType;
  voteInfos: IGetInGameInfoType[];
}

const videoStyle = 'w-[526px] h-[296px] rounded-[20px] aspect-video';

function PostContentArea({ post, voteInfos }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { accessToken, user } = useAuthStore();
  const contentsArr = useConvertHTML(post.content);
  const [isImageClick, setIsImageClick] = useState<boolean>(false);
  const [updatedLikeCount, setUpdatedLikeCount] = useState<number>(0);
  const [isLikeInProgress, setIsLikeInProgress] = useState<boolean>(false);
  const [isVoteClicked, setIsVoteClicked] = useState<boolean>(false);

  const { mutate: likePost } = useMutation({
    mutationFn: async () => {
      const response = await postPostLike(accessToken, post.id);
      return response.data.likeCount;
    },
    onSuccess: async (likeCount) => {
      await queryClient.invalidateQueries({ queryKey: ['COMMENTS'] });
      setIsLikeInProgress(false);
      setUpdatedLikeCount(likeCount);
    },
    onError: (error) => console.error(error.message),
  });

  const handleLikePost = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    if (isLikeInProgress) {
      return;
    }
    alert('like');

    setIsLikeInProgress(true);
    likePost();
  };

  const handleVoteClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    setIsVoteClicked(!isVoteClicked);
  };

  const buttons = [
    {
      name: 'like',
      icon: Icon_heart,
      data: updatedLikeCount
        ? updatedLikeCount < 1000
          ? updatedLikeCount
          : '999+'
        : post.likeCount < 1000
          ? post.likeCount
          : '999+',
      onclick: handleLikePost,
    },
    {
      name: 'vote',
      icon: Icon_vote,
      data: post.voteCount < 1000 ? post.voteCount : '999+',
      onclick: handleVoteClick,
    },
    {
      name: 'view',
      icon: Icon_view,
      data: post.viewCount < 1000 ? post.viewCount : '999+',
      onclick: () => {
        return;
      },
    },
  ];

  const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
    event.stopPropagation();
    setIsImageClick(true);
  };

  return (
    <div
      className='bg-[#FFFFFF] w-[586px] h-fit min-h-[448px] rounded-[20px] px-[30px] py-[20px] cursor-pointer flex flex-col gap-[12px] shadow'
      onClick={() => {
        router.push(`/post/${post.id}/`);
      }}
    >
      <div className='flex flex-col h-[60px]'>
        <p className='text-[20px]'>{post.title}</p>
        <p className='text-[16px] w-full whitespace-nowrap overflow-hidden truncate'>
          {contentsArr.pTags[0]}
        </p>
      </div>
      <div>
        {isImageClick ? (
          <video
            muted
            controls
            autoPlay
            poster={post.thumbnailURL}
            className={`block visible ${videoStyle}`}
            onClick={(e) => e.stopPropagation}
          >
            <source src={post.video.url} type='video/mp4' />
            <source src={post.video.url} type='video/webm' />
          </video>
        ) : post.thumbnailURL ? (
          <img className={videoStyle} src={post.thumbnailURL} onClick={handleImageClick} />
        ) : post.video.type === 'FILE' ? (
          <video
            muted
            controls
            playsInline
            poster={post.thumbnailURL}
            className={`block visible ${videoStyle}`}
          >
            <source src={post.video.url} type='video/mp4' />
            <source src={post.video.url} type='video/webm' />
          </video>
        ) : (
          //외부영상 첨부할 때 사용
          <iframe
            className={videoStyle}
            src={post.video.url}
            title={post.title}
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            referrerPolicy='strict-origin-when-cross-origin'
            allowFullScreen
          ></iframe>
        )}
      </div>
      <div className='flex h-[24px]'>
        {buttons.map((button, idx) => (
          <React.Fragment key={idx}>
            <div
              className='flex w-[182px] cursor-pointer items-center justify-center gap-[6px]'
              onClick={button.onclick}
            >
              <Image src={button.icon} alt={button.name} width={24} height={24} />
              {button.data && <p className='text-[14px] text-[#555555]'>{button.data}</p>}
            </div>
            {idx !== 2 && <div className='h-[20px] w-[1px] bg-[#555555]'></div>}
          </React.Fragment>
        ))}
      </div>
      {isVoteClicked && (
        <div className='relative flex h-[167px] items-center justify-center rounded-[1.875rem] '>
          {post.isVote || user?.email === post.memberDTO.email || post.status === 'FINISHED' ? (
            <HomeVoted voteInfos={voteInfos} isFinished={post.status === 'FINISHED'} />
          ) : (
            <HomeNotVoted voteInfos={voteInfos} />
          )}
        </div>
      )}
    </div>
  );
}

export default PostContentArea;
