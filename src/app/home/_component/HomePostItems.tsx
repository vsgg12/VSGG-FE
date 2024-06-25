'use client';
import PostTag from '@/app/post/_component/PostTag';
import HomeNotVoted from './HomeNotVoted';
import { IoPersonCircleSharp } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import HomeVoted from './HomeVoted';

const posts: GetPostDTOType[] = [
  {
    id: 1,
    title: '이건 title',
    content: '이건 content',
    thumbnailURL: '이건 thumbnailURL',
    viewCount: 1,
    status: '이건 status',
    video: {
      url: '이건 url',
      type: '이건 type',
    },
    memberDTO: {
      token: '이건 토큰',
      email: '이건 이메일',
      nickname: '이건 닉네임',
      age: '이건 나이',
      gender: '이건 성별',
      mobile: '이건 폰번호',
      profileImage: '이건 프로필 이미지',
      tier: '이건 티어',
      agreeAge: true,
      agreeTerms: true,
      agreePrivacy: true,
      agreePromotion: true,
    },
    createdAt: '이건 작성한 날짜',
    updatedAt: '이건 업데이트한 날짜',
    hashtagList: [
      {
        id: 0,
        name: '해시태그 1',
      },
      {
        id: 1,
        name: '해시태그 2',
      },
    ],
    isVote: false,
  },
  {
    id: 2,
    title: '이건 title',
    content: '이건 content',
    thumbnailURL: '이건 thumbnailURL',
    viewCount: 6,
    status: '이건 status',
    video: {
      url: '이건 url',
      type: '이건 type',
    },
    memberDTO: {
      token: '이건 토큰',
      email: '이건 이메일',
      nickname: '이건 닉네임',
      age: '이건 나이',
      gender: '이건 성별',
      mobile: '이건 폰번호',
      profileImage: '이건 프로필 이미지',
      tier: '이건 티어',
      agreeAge: true,
      agreeTerms: true,
      agreePrivacy: true,
      agreePromotion: true,
    },
    createdAt: '이건 작성한 날짜',
    updatedAt: '이건 업데이트한 날짜',
    hashtagList: [
      {
        id: 0,
        name: '해시태그 1',
      },
      {
        id: 1,
        name: '해시태그 2',
      },
    ],
    isVote: true,
  },
];

export default function HomePostItems() {
  const router = useRouter();

  return (
    <div className='min-h-[calc(100vh-504px)] flex flex-col'>
      {posts.length === 0 ? (
        <div className='flex flex-col flex-grow items-center justify-center'>
          현재 작성된 게시물이 없습니다.
        </div>
      ) : (
        <div>
          {posts.map((post, index) => (
            <div
              key={index}
              className='px-[55px] pt-[40px] pb-[30px] h-fit w-full mb-[50px] rounded-[1.875rem] bg-[#ffffff]'
              onClick={() => {
                router.push(`/post/${post.id}/`);
              }}
            >
              <div className='flex w-full flex-row justify-between font-medium'>
                <div className='p-content-s-mb text-[1.563rem]'>게시글 제목</div>
                <div className='text-[0.75rem] text-[#C8C8C8]'>조회수 2</div>
              </div>
              <div className='p-content-s-mb flex flex-row items-center justify-start font-medium'>
                <IoPersonCircleSharp className='mr-[0.625rem] h-[2.5rem] w-[2.5rem] rounded-full  text-[#D9D9D9]' />
                <div>
                  <div className='flex flex-row'>
                    <div className='mr-[0.625rem] text-[0.75rem] text-[#333333]'>닉네임</div>
                    <div className='text-[0.75rem] text-[#909090]'>티어</div>
                  </div>
                  <div className='text-[0.75rem] text-[#C8C8C8]'>날짜</div>
                </div>
              </div>
              <div className='flex h-fit flex-row'>
                {post.video.type === 'FILE' ? (
                  <video
                    muted
                    controls
                    className='p-content-rounded p-content-s-mb p-content-mr aspect-video h-[362px] w-[50%] max-w-[37.875rem]'
                  >
                    <source src={post.video.url} type='video/webm' />
                  </video>
                ) : (
                  <iframe
                    className='p-content-rounded p-content-s-mb p-content-mr aspect-video h-[362px] w-[50%] max-w-[37.875rem]'
                    src={post.video.url}
                    title={post.title}
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                    referrerPolicy='strict-origin-when-cross-origin'
                    allowFullScreen
                  ></iframe>
                )}
                <div className='flex w-full flex-col overflow-hidden'>
                  <div className='mb-1 line-clamp-[8] h-[50%] cursor-pointer overflow-hidden text-ellipsis decoration-solid'>
                    content
                  </div>
                  <div className='relative flex h-[167px] items-center justify-center rounded-[1.875rem] bg-gradient-to-b from-[#ADADAD]/30 to-[#DCDCDC]/30'>
                    {post?.isVote ? <HomeVoted /> : <HomeNotVoted />}
                  </div>
                </div>
              </div>
              <PostTag hashtags={post?.hashtagList} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
