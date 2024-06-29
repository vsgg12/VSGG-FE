'use client';
import PostTag from '../_component/PostTag';
import PostCommentInput from '../_component/PostCommentInput';
import Comment from '../_component/Comment';
import VoteForm from '../_component/VoteForm';
import { IoPersonCircleSharp } from 'react-icons/io5';
import VoteResult from '../_component/VoteResult';
import Header from '@/components/Header';
import Search from '@/components/Search';
import { commentData } from './dummyData/dummy';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import getPostItem from '@/api/getPostItem';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import moment from 'moment';
import PostComment from '@/api/postComment';
import DOMPurify from 'dompurify';

const voteAVGInfos: GetAVGType[] = [
  {
    championName: '노틸러스',
    averageValue: 1,
    position: '탑',
    tier: '챌린저',
  },
  {
    championName: '가렌',
    averageValue: 2,
    position: '정글',
    tier: '그랜드마스터',
  },
  {
    championName: '트위스티드 페이트',
    averageValue: 2,
    position: '탑',
    tier: '마스터',
  },
  {
    championName: '갈리오',
    averageValue: 3,
    position: '탑',
    tier: '챌린저',
  },
  {
    championName: '티모',
    averageValue: 0,
    position: '탑',
    tier: '챌린저',
  },
];

export default function PostRead() {
  const { postId } = useParams();
  const id: string = postId as string;
  const queryClient = useQueryClient();

  const { data: post } = useQuery<GetPostItemType>({
    queryKey: ['POST_ITEM', id],
    queryFn: async () => getPostItem(id),
  });
  const [formattedDate, setFormattedDate] = useState<string>('');
  const [votingStatus, setVotingStatus] = useState<string>('');
  const [isCommentInProgress, setIsCommentInProgress] = useState<boolean>(false);
  const [sanitizedHtml, setSanitizedHtml] = useState<string>('');

  useEffect(() => {
    if (post) {
      console.log(post);
      setFormattedDate(moment(post.postDTO.createdAt).format('YYYY-MM-DD'));
      setVotingStatus(post.postDTO.status);
      const sanitize = DOMPurify.sanitize(post.postDTO.content);
      setSanitizedHtml(sanitize);
    }
  }, [post]);

  const { mutate: writeComment } = useMutation({
    mutationFn: () => PostComment({ CommentAddRequest: { parentId, content }, token }),
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['', parentId, content] });
      setIsCommentInProgress(false);
    },
  });

  const handleCommentSubmit = async () => {
    if (isCommentInProgress) {
      writeComment();
    }
    setIsCommentInProgress(true);
  };

  return (
    <>
      <Header />
      <main>
        <Search />
        <section className='flex justify-center'>
          <div className='w-[100%] mx-28'>
            <header className='flex flex-row items-center justify-between'>
              <button
                onClick={() => {
                  history.back();
                }}
                className='mb-[44px] box-content flex h-[34px] w-[92px] items-center justify-center rounded-[150px] bg-[#8A1F21] text-white'
              >
                <div className='text-[13px]'>글 목록</div>
              </button>
              <div className='text-xs text-[#909090]'>홈{' > '}게시글</div>
            </header>
            <div className='flex flex-row'>
              {post && (
                <div className='p-content-mr p-content-rounded scroll relative mb-11 max-h-[1000px] w-2/3 bg-white px-[63px] pb-[44px]'>
                  <div className='sticky top-[-1px] bg-[#ffffff] pb-[30px] pt-[44px] z-10'>
                    <div className='flex w-full flex-row place-items-start justify-between font-medium'>
                      <div className='p-content-s-mb text-[25px]'>{post.postDTO.title}</div>
                      <div className='text-[12px] text-[#C8C8C8]'>
                        조회수 {post.postDTO.viewCount}
                      </div>
                    </div>
                    <div className='flex flex-row items-center justify-start font-medium '>
                      <IoPersonCircleSharp className='mr-[0.625rem] h-[2.5rem] w-[2.5rem] rounded-full  text-[#D9D9D9]' />
                      <div>
                        <div className='flex flex-row'>
                          <div className=' mr-[6px] text-[12px] text-[#333333]'>
                            {post.postDTO.memberDTO.nickname}
                          </div>
                          <div className='text-[12px] text-[#909090]'>
                            {post.postDTO.memberDTO.tier}
                          </div>
                        </div>
                        <div className='text-[12px] text-[#C8C8C8]'>{formattedDate}</div>
                      </div>
                    </div>
                  </div>
                  <video
                    controls
                    className='p-content-s-mb h-[50%] w-full overflow-hidden rounded-[30px] mt-5'
                  >
                    <source src={post.postDTO.video.url} type='video/webm' />
                  </video>
                  <PostTag hashtags={post.postDTO.hashtagList} />
                  <div
                    className='w-full mt-10'
                    dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
                  ></div>
                </div>
              )}

              <div className='p-content-rounded scroll relative mb-11 max-h-[1000px] w-1/3 bg-white px-[63px] pb-[44px]'>
                <div className='sticky top-[-1px] bg-[#ffffff] pt-[44px]'>
                  <div className='p-content-s-mb text-lg'>댓글</div>
                  <div className='flex flex-row'>
                    <PostCommentInput
                      handleSubmit={handleCommentSubmit}
                      isProgress={isCommentInProgress}
                    />
                  </div>
                </div>
                {commentData.length === 0 ? (
                  <div className='flex justify-center'>
                    <div>아직 댓글이 없습니다.</div>
                  </div>
                ) : (
                  <>
                    {commentData.map((comment, index) => (
                      <div key={index} className='mb-[20px] text-[13px]'>
                        <Comment />
                        <button
                          key={index}
                          type='button'
                          // onClick={() => {
                          //   if (index === showReply) {
                          //     setShowReply(undefined);
                          //   } else {
                          //     setShowReply(index);
                          //   }
                          // }}
                          className='mb-[10px] text-[10px] font-medium text-[#8A1F21]'
                        >
                          {/* {index === showReply ? '닫기' : '답글'} */}
                        </button>
                        {/* {index === showReply && (
                          <div className='text-[12px]'>
                            <PostCommentInput postId={params.postId} parentId={comment.id} />
                          </div>
                        )} */}
                        <div className='mb-[30px] border-l-2 border-[#8A1F21] pl-6'>
                          {commentData?.map((reply, index) => (
                            <div key={index} className='mb-[10px]'>
                              <Comment />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
            {post && post.postDTO.isVote ? (
              <VoteResult postId={3} voteInfos={voteAVGInfos} />
            ) : (
              post && (
                <VoteForm
                  setIsVoted={() => {
                    return;
                  }}
                  voteInfo={post.postDTO.inGameInfoList}
                />
              )
            )}
            <VoteResult postId={3} voteInfos={voteAVGInfos} />
          </div>
        </section>
      </main>
    </>
  );
}
