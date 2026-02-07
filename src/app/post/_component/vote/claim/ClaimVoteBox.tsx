interface Props{
  voteData: IGetInGameInfoType[];
}

const ClaimVoteBox = ({voteData}: Props) => {

  const getRatio = (voteNum: number, totalVoteNum: number) => {
    return voteNum / totalVoteNum * 100;
  }

  return (
    <div>
      <div></div>
    </div>
  )
}

export default ClaimVoteBox;