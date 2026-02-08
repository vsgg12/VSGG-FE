interface Props {
  position: string;
  championName: string;
  championImage: string;
  claim: string;
  ratio: string; // 비율
  voteNum: number; // 득표수
}

const ClaimVoteItem = ({ position, championImage, championName, claim, ratio, voteNum }: Props) => {
  return (
    <div>
      <div></div>
    </div>
  );
};

export default ClaimVoteItem;
