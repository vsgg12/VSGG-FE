import { useState } from 'react';
import { mobileVoteComponentColors } from '../../../../../data/championData';
import usePostIdStore from '../../store/usePostIdStore';

export default function VotingGraphMobile() {
  const [votingGraph, setVotingGraph] = useState<number[]>(Array(10).fill(-1));
  const { voteResult, setVoteResult, selectedChampIdx } = usePostIdStore();

  const handleClick = (index: number) => {
    const lastCheckedIndex = findLastCheckedIndex(votingGraph);
    const newVoteResult = [...voteResult];

    if (votingGraph[index] !== -1) {
      const newGraph = [...votingGraph];
      for (let idx = index; idx <= lastCheckedIndex; idx++) {
        if (votingGraph[lastCheckedIndex] === selectedChampIdx) {
          newGraph[idx] = -1;
          if (newVoteResult[selectedChampIdx]) {
            newVoteResult[selectedChampIdx] = newVoteResult[selectedChampIdx] - 1;
          }
        }
      }
      setVotingGraph(newGraph);
      setVoteResult(newVoteResult);
    } else {
      const newGraph = [...votingGraph];
      for (let idx = lastCheckedIndex + 1; idx <= index; idx++) {
        if (
          votingGraph[lastCheckedIndex] === selectedChampIdx ||
          !votingGraph.includes(selectedChampIdx)
        ) {
          newGraph[idx] = selectedChampIdx;
          newVoteResult[selectedChampIdx] = newVoteResult[selectedChampIdx] + 1;
        }
      }
      setVotingGraph(newGraph);
      setVoteResult(newVoteResult);
    }
  };

  const findLastCheckedIndex = (arr: number[]) => {
    for (let index = arr.length - 1; index >= 0; index--) {
      if (arr[index] !== -1) return index;
    }
    return -1;
  };

  return (
    <>
      {votingGraph.map((voting, index) => {
        const colorClass =
          voting !== -1 &&
          `${mobileVoteComponentColors[voting].background} ${voting !== selectedChampIdx && 'pointer-events-none'}`;
        const roundedClass =
          index === 0 ? 'rounded-l-[30px]' : index === 9 ? 'rounded-r-[30px]' : '';

        return (
          <div
            key={index}
            className={`p-voting-bar-mobile ${roundedClass} ${colorClass}`}
            onClick={() => {
              handleClick(index);
            }}
          ></div>
        );
      })}
    </>
  );
}
