'use client';
import { useRouter } from 'next/navigation';
import useConvertHTML from '@/hooks/useConvertHTML';
import PostDeadLineMobile from './PostDeadLineMobile';
import useProfileTierIcon from '@/hooks/sidebar/useProfileTierIcon';
import useTimeDifferenceFromNow from '@/hooks/useTimeDifferenceFromNow';
import PostVideoAreaMobile from './PostVideoAreaMobile';
import ChampionVoteBoxMobile from './ChampionVoteBoxMobile';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import HeartIcon from '../../../../../public/svg/mobile/postItem/heart.svg';
import CommentIcon from '../../../../../public/svg/mobile/postItem/comment.svg';
import ShareIcon from '../../../../../public/svg/mobile/postItem/share.svg';
import VoteIcon from '../../../../../public/svg/mobile/postItem/vote.svg';
import ViewIcon from '../../../../../public/svg/mobile/postItem/view.svg';
import Image from 'next/image';
import { toast } from 'react-hot-toast';

export default function PostItemMobile({
  post,
  voteInfos,
}: {
  post: IGetPostDTOType;
  voteInfos: IGetInGameInfoType[];
}) {
  const router = useRouter();
  const { user } = useAuthStore();
  const { getIcon } = useProfileTierIcon({ size: 12 });
  const timeAgo = useTimeDifferenceFromNow(post.createdAt);
  const contentsArr = useConvertHTML(post.content);

  const icons = [
    {
      icon: HeartIcon,
      alt: 'heartIcon',
      content: post.likeCount > 999 ? '999+' : post.likeCount,
    },
    {
      icon: VoteIcon,
      alt: 'voteIcon',
      content: post.voteCount > 999 ? '999+' : post.voteCount,
    },
    {
      icon: CommentIcon,
      alt: 'commentIcon',
      content: post.commentCount > 999 ? '999+' : post.commentCount,
    },
    {
      icon: ViewIcon,
      alt: 'viewIcon',
      content: post.viewCount > 999 ? '999+' : post.viewCount,
    },
  ];

  const handleSharePost = async (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(`vsgg.co.kr/post/${post.id}`);
      toast.success('링크가 복사되었습니다.');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className='h-fit w-full bg-semantic-background-surface cursor-pointer flex flex-col mb-[4px] px-[18px] py-[12px] gap-[15px]'
      onClick={() => {
        router.push(`/post/${post.id}`);
      }}
    >
      <div className='flex w-full justify-between'>
        <div className='flex items-center'>
          <img
            src={
              post.memberDTO.profileImage === null || post.memberDTO.profileImage === ''
                ? 'https://ssl.pstatic.net/static/pwe/address/img_profile.png'
                : post.memberDTO.profileImage
            }
            alt={"profile image"}
            className='mr-[0.625rem] h-[30px] w-[30px] rounded-full text-gray-100'
          />
          <div className='flex gap-[5px] text-[12px]'>
            {getIcon(post.memberDTO.tier)}
            <p className='font-bold'>{post.memberDTO.nickname}</p>
            <p className='text-semantic-text-disabled font-medium ml-[px]'>{timeAgo}</p>
          </div>
        </div>
        <PostDeadLineMobile deadLine={post.daysUntilEnd} />
      </div>
      <div className='flex flex-col gap-[10px]'>
        <p className='text-semantic-text-primary text-[16px] font-bold whitespace-wrap'>{post.title}</p>
        <p className='text-[14px] w-full whitespace-nowrap overflow-hidden truncate text-[#484B4D]'>
          {contentsArr.pTags[0]}
        </p>
      </div>
      <div className='flex flex-col gap-[10px]'>
        <PostVideoAreaMobile post={post} />
        <div className='relative flex w-full aspect-video items-center justify-center rounded-[20px]'>
          <ChampionVoteBoxMobile
            voteData={voteInfos}
            voteCount={post.voteCount}
            daysUntilEnd={post.daysUntilEnd}
            isOwner={post.memberDTO.nickname === user?.nickname}
            isVote={post.isVote}
            isHome={true}
          />
        </div>
      </div>
      <div className='flex justify-between text-[14px] '>
        <div className='flex gap-[10px]'>
          {icons.map((item, index) => (
            <div key={index} className='flex gap-[4px] items-center'>
              <Image src={item.icon} width={16} height={16} alt={item.alt} />
              <p className='text-[12px] text-[#D7D8D9]'>{item.content}</p>
            </div>
          ))}
        </div>
        <Image
          src={ShareIcon}
          width={16}
          height={16}
          alt='shareIcon'
          onClick={(e) => handleSharePost(e)}
        />
      </div>
    </div>
  );
}
