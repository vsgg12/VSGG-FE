import React from 'react';
import Default_Profile from '../../../../public/svg/defaultProfile.svg';
import useTimeDifferenceFromNow from '@/hooks/useTimeDifferenceFromNow';
import useConvertHTML from '@/hooks/useConvertHTML';
import useProfileTierIcon from '@/hooks/sidebar/useProfileTierIcon';
import Icon_vote from '../../../../public/svg/postItem/vote.svg';
import Icon_heart_white from '../../../../public/svg/postItem/heart_white.svg';
import Icon_comment from '../../../../public/svg/postItem/chatbox.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Props {
  post: IGetPostDTOType;
}
const videoStyle = 'w-[286px] h-[166px] rounded-[10px] aspect-video';

function ListPostItem({ post }: Props) {
  const timeAgo = useTimeDifferenceFromNow(post.createdAt);
  const contentsArr = useConvertHTML(post.content);
  const { getIcon } = useProfileTierIcon({ size: 12 });
  const router = useRouter();

  const handleClickPost = () => {
    router.push(`post/${post.id}`);
  };

  return (
    <div
      className='w-[326px] h-[368px] bg-[#FFFFFF] rounded-[10px] flex flex-col gap-[10px] p-[20px] cursor-pointer shadow transition-transform duration-300 hover:-translate-y-[5px]'
      onClick={handleClickPost}
    >
      <div className='relative'>
        {post.thumbnailURL ? (
          <img className={videoStyle} src={post.thumbnailURL} />
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
        <div className='absolute top-[5px] right-[8px] flex gap-[4px]'>
          <Image src={Icon_heart_white} width={16} height={16} alt='like' />
          <p
            className='text-[12px] text-[#FFFFFF]'
            style={{ textShadow: '1px 1px 3px rgba(0, 0, 0, 0.4)' }}
          >
            {post.likeCount > 999 ? '999+' : post.likeCount}
          </p>
        </div>
      </div>

      <div className='flex flex-col h-[117px] justify-between gap-[4px]'>
        <div>
          <p className='text-[14px] font-bold'>{post.title}</p>
          <p className='text-[12px] w-full break-words text-ellipsis '>{contentsArr.pTags}</p>
        </div>
        <p className='text-[#C8C8C8] text-[12px]'>{timeAgo}</p>
      </div>

      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <img
            src={
              post.memberDTO.profileImage == null || post.memberDTO.profileImage == ''
                ? Default_Profile
                : post.memberDTO.profileImage
            }
            className='h-[24px] w-[24px] rounded-full mr-[10px]'
          />
          {getIcon(post.memberDTO.tier)}
          <p className='text-[12px] text-[#333333] ml-[5px]'>{post.memberDTO.nickname}</p>
        </div>
        <div className='flex gap-[8px] text-[14px]'>
          <div className='flex gap-[4px]'>
            <Image src={Icon_vote} width={18} height={18} alt='vote_icon' />
            <p>{post.voteCount > 999 ? '999+' : post.voteCount}</p>
          </div>
          <div className='flex gap-[4px]'>
            <Image src={Icon_comment} width={18} height={18} alt='comment_icon' />
            <p>{post.commentCount > 999 ? '999+' : post.commentCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListPostItem;
