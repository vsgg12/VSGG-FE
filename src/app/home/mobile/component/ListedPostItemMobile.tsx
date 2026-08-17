import { useRouter } from 'next/navigation';
import PostDeadLineMobile from './PostDeadLineMobile';
import HeartIcon from '../../../../../public/svg/mobile/postItem/heart.svg';
import CommentIcon from '../../../../../public/svg/mobile/postItem/comment.svg';
import VoteIcon from '../../../../../public/svg/mobile/postItem/vote.svg';
import ViewIcon from '../../../../../public/svg/mobile/postItem/view.svg';
import Image from 'next/image';
import useProfileTierIcon from '@/hooks/sidebar/useProfileTierIcon';
import useTimeDifferenceFromNow from '@/hooks/useTimeDifferenceFromNow';
import useConvertHTML from '@/hooks/useConvertHTML';

interface IListedItem {
  post: IGetPostDTOType;
}

export default function ListedPostItemMobile({ post }: IListedItem) {
  const router = useRouter();
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
  return (
    <div
      className='flex flex-col w-full min-h-[135px] bg-white mb-[20px] p-[25px] gap-[8px] cursor-pointer'
      onClick={() => {
        router.push(`/post/${post.id}/`);
      }}
    >
      <div className='flex justify-between items-center'>
        <p className='text-black text-[16px] font-bold'>{post.title}</p>
        <PostDeadLineMobile deadLine={post.daysUntilEnd} />
      </div>
      <p className='text-[14px] font-medium whitespace-nowrap overflow-hidden truncate text-[#484B4D]'>
        {contentsArr.pTags[0]}
      </p>
      <p className='text-text-semantic-text-disabled text-[12px]'>{timeAgo}</p>

      <div className='flex w-full justify-between items-center'>
        <div className='flex gap-[4px] items-center'>
          <img
            className='h-[20px] w-[20px] rounded-full'
            src={
              post.memberDTO.profileImage === null
                ? 'https://ssl.pstatic.net/static/pwe/address/img_profile.png'
                : post.memberDTO.profileImage
            }
          />
          {getIcon(post.memberDTO.tier)}
          <p className='font-bold text-[12px]'>{post.memberDTO.nickname}</p>
        </div>
        <div className='flex gap-[10px]'>
          {icons.map((item, index) => (
            <div key={index} className='flex gap-[4px] items-center'>
              <Image src={item.icon} width={16} height={16} alt={item.alt} />
              <p className='text-[12px] text-semantic-text-disabled'>{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
