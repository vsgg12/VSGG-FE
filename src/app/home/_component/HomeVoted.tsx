import PostVotingChampList from "@/app/post/_component/PostVotingChampList";
import PostVotingGraph from "@/app/post/_component/PostVotingGraph";

export default function HomeVoted() {
  return (
    <>
      <div className="h-[8.563rm] rounded-[1.875em] bg-gray-100">
        <div className="flex items-center p-[1.563em] text-[0.625em]">
          <PostVotingChampList />
          <PostVotingGraph />
        </div>
      </div>
    </>
  );
}
