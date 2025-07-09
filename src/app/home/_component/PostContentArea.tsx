import useConvertHTML from '@/hooks/useConvertHTML';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Image from 'next/image';
import Icon_heart from '../../../../public/svg/postItem/heart.svg';
import Icon_vote from '../../../../public/svg/postItem/vote.svg';
import Icon_view from '../../../../public/svg/postItem/view.svg';

interface Props {
  post: IGetPostDTOType;
}

const videoStyle = 'w-[526px] h-[296px] rounded-[20px] aspect-video';

function PostContentArea({ post }: Props) {
  const router = useRouter();
  const contentsArr = useConvertHTML(post.content);
  const [isImageClick, setIsImageClick] = useState<boolean>(false);

  const buttons = [
    {
      name: 'like',
      icon: Icon_heart,
      data: post.likeCount,
      onclick: (e: React.MouseEvent<HTMLImageElement>) => e.stopPropagation,
    },
    {
      name: 'vote',
      icon: Icon_vote,
      data: post.voteCount,
      onclick: () => {
        return;
      },
    },
    {
      name: 'view',
      icon: Icon_view,
      data: post.viewCount,
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
      className='bg-[#FFFFFF] w-[586px] h-[448px] rounded-[20px] px-[30px] py-[20px] cursor-pointer flex flex-col gap-[10px] shadow'
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
              className='flex w-[182px] cursor-pointer items-center justify-center'
              onClick={button.onclick}
            >
              <Image src={button.icon} alt={button.name} width={24} height={24} />
              {button.data && <p className='text-[14px] text-[#555555]'>999+</p>}
            </div>
            {idx !== 2 && <div className='h-[20px] w-[1px] bg-[#555555]'></div>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default PostContentArea;
