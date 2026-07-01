import React, { useState } from 'react';

interface Props {
  post: IGetPostDTOType;
}

const videoStyle = 'w-full rounded-[14px] block visible aspect-video bg-black object-contain';

function PostVideoAreaMobile({ post }: Props) {
  const [isImageClick, setIsImageClick] = useState<boolean>(false);

  const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
    event.stopPropagation();
    setIsImageClick(true);
  };

  const getYoutubeId = (url: string) => {
    const regExp = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };
  const youtubeId = getYoutubeId(post.video.url);
  const isLinkVideo = post.video.type === 'LINK';
  return (
    <div className='w-full h-fit' onClick={(e) => e.stopPropagation()}>
      {isImageClick && isLinkVideo ? (
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; '
          allowFullScreen
          className={videoStyle}
          title='YouTube video preview'
        />
      ) : isImageClick ? (
        <video
          muted
          controls
          autoPlay
          poster={post.thumbnailURL}
          className={`block visible ${videoStyle}`}
        >
          <source src={post.video.url} type='video/mp4' />
          <source src={post.video.url} type='video/webm' />
        </video>
      ) : post.thumbnailURL ? (
        <img
          className={videoStyle}
          src={post.thumbnailURL}
          onClick={handleImageClick}
          alt={'thumbnail'}
        />
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
          src={`https://www.youtube.com/embed/${youtubeId}`}
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen
          className={videoStyle}
          title='YouTube video preview'
        />
      )}
    </div>
  );
}

export default PostVideoAreaMobile;
