"use client";
import PostTag from "../_component/PostTag";
import PostCommentInput from "../_component/PostCommentInput";
import PostComment from "../_component/PostComment";
import VoteForm from "../_component/VoteForm";
import { IoPersonCircleSharp } from "react-icons/io5";
import VoteResult from "../_component/VoteResult";
import Header from "@/components/Header";
import Search from "@/components/Search";
import { commentData, post } from "./dummyData/dummy";


const voteAVGInfos: GetAVGType[] = [
  {
    championName: "가렌",
    averageValue: 0,
    position: "탑",
    tier: "챌린저"
  },
  {
    championName: "가렌",
    averageValue: 2,
    position: "정글",
    tier: "그랜드마스터",
  },
  {
    championName: "트위스티드 페이트",
    averageValue: 2,
    position: "탑",
    tier: "마스터",
  },
  {
    championName: "가렌",
    averageValue: 3,
    position: "탑",
    tier: "챌린저",
  },
  {
    championName: "가렌",
    averageValue: 0,
    position: "탑",
    tier: "챌린저",
  },
]

const ingameInfo: GetGameInfoType[] = [
  {
    inGameInfoId: 0,
    tier: "챌린저",
    position: "탑",
    championName: "가렌",
  },
  {
    inGameInfoId: 0,
    tier: "그랜드마스터",
    position: "JUNGLE",
    championName: "가렌",
  },
  {
    inGameInfoId: 0,
    tier: "마스터",
    position: "탑",
    championName: "트위스티드 페이트",
  },
  {
    inGameInfoId: 0,
    tier: "챌린저",
    position: "탑",
    championName: "가렌",
  },
  {
    inGameInfoId: 0,
    tier: "챌린저",
    position: "탑",
    championName: "가렌",
  },
];

interface IPostReadParams {
  postId: string;
}

export default function PostRead({ params }: { params: IPostReadParams }) {

  return (
    <>
      <Header />
      <main>
        <Search />
        <section className="flex justify-center">
          <div className="w-4/5 max-w-[1400px]">
            <header className="mb-[44px] flex flex-row items-center justify-between">
              <button
                onClick={() => {
                  history.back();
                }}
                className=" mb-[44px] box-content flex h-[34px] w-[92px] items-center justify-center rounded-[150px] bg-[#8A1F21] text-white"
              >
                <div className="text-[13px]">글 목록</div>
              </button>
              <div className="text-xs text-[#909090]">홈{" > "}게시글</div>
            </header>

            <div className="flex flex-row">
              {post && (
                <div className=" p-content-mr p-content-rounded scroll relative mb-11 max-h-[1000px] w-2/3 bg-white  px-[63px] pb-[44px]">
                  <div className="sticky top-[-1px] bg-[#ffffff] pb-[30px] pt-[44px]">
                    <div className="flex w-full flex-row place-items-start justify-between font-medium">
                      <div className="p-content-s-mb text-[25px]">
                        {post[0].title}
                      </div>
                      <div className="text-[12px] text-[#C8C8C8]">
                        조회수 {post[0].viewCount}
                      </div>
                    </div>
                    <div className="p-content-s-mb flex flex-row items-center justify-start font-medium">
                      <IoPersonCircleSharp className="mr-[0.625rem] h-[2.5rem] w-[2.5rem] rounded-full  text-[#D9D9D9]" />
                      <div>
                        <div className="flex flex-row">
                          <div className=" mr-[6px] text-[12px] text-[#333333]">
                            {post[0].memberDTO.nickname}
                          </div>
                          <div className="text-[12px] text-[#909090]">
                            {post[0].memberDTO.tier}
                          </div>
                        </div>
                        <div className="text-[12px] text-[#C8C8C8]">
                          2024-06-19
                        </div>
                      </div>
                    </div>
                  </div>
                  {post[0].video.type === "FILE" ? (
                    <video
                      controls
                      className="p-content-s-mb h-[50%] w-full overflow-hidden rounded-[30px]"
                    >
                      <source src={post[0].video.url} type="video/webm" />
                    </video>
                  ) : (
                    <iframe
                      className="p-content-rounded p-content-s-mb h-[50%] w-full"
                      src="https://www.youtube.com/embed/TByv13Yq4I4"
                      title="롤 랭크 4:5 바론한타"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    ></iframe>
                  )}

                  <PostTag hashtags={post[0].hashtagList} />
                  <div className="w-full">{post[0].content}</div>
                </div>
              )}

              <div className="p-content-rounded scroll relative mb-11 max-h-[1000px] w-1/3 bg-white px-[63px] pb-[44px]">
                <div className="sticky top-[-1px] bg-[#ffffff] pt-[44px]">
                  <div className="p-content-s-mb text-lg">댓글</div>
                  <div className="flex flex-row">
                    <PostCommentInput postId={Number(params.postId)} />
                  </div>
                </div>
                {commentData.length === 0 ? (
                  <div className="flex justify-center">
                    <div>아직 댓글이 없습니다.</div>
                  </div>
                ) : (
                  <>
                    {commentData.map((comment, index) => (
                      <div key={index} className="mb-[20px] text-[13px]">
                        <PostComment />
                        <button
                          key={index}
                          type="button"
                          // onClick={() => {
                          //   if (index === showReply) {
                          //     setShowReply(undefined);
                          //   } else {
                          //     setShowReply(index);
                          //   }
                          // }}
                          className="mb-[10px] text-[10px] font-medium text-[#8A1F21]"
                        >
                          {/* {index === showReply ? '닫기' : '답글'} */}
                        </button>
                        {/* {index === showReply && (
                          <div className='text-[12px]'>
                            <PostCommentInput postId={params.postId} parentId={comment.id} />
                          </div>
                        )} */}
                        <div className="mb-[30px] border-l-2 border-[#8A1F21] pl-6">
                          {commentData?.map((reply, index) => (
                            <div key={index} className="mb-[10px]">
                              <PostComment />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
            <VoteForm
              setIsVoted={() => {return;}}
              postId={2}
              voteInfo={voteAVGInfos}
            />

            <VoteResult postId={3} voteInfos={voteAVGInfos} />
          </div>
        </section>
      </main>
    </>
  );
}
