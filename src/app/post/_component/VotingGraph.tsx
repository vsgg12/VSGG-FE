import { useState } from "react";
import { voteColors } from '../../../data/championData'


interface IVotingGraphProps{
  selectedIndex: number;
}

export default function VotingGraph({selectedIndex}:IVotingGraphProps) {
  const [votingGraph, setVotingGraph] = useState<number[]>(Array(10).fill(-1));

  const handleClick = (index: number) => {
    const lastCheckedIndex = findLastCheckedIndex(votingGraph);
    console.log(lastCheckedIndex);

    if(votingGraph[index] !== -1){
      const newGraph = [...votingGraph];
      for(let idx = index; idx <= lastCheckedIndex; idx++){
        newGraph[idx] = -1;
      }
      setVotingGraph(newGraph);   
    }else{
      const newGraph = [...votingGraph];
      for (let idx = lastCheckedIndex + 1; idx <= index; idx++) {
        newGraph[idx] = selectedIndex;
      }
      setVotingGraph(newGraph);
    }
    console.log( votingGraph)

  };

  const findLastCheckedIndex = (arr: number[]) => {
    for (let index = arr.length - 1; index >= 0; index--) {
      if (arr[index] !== -1) return index;
    }
    return -1; 
  };

  return (
    <>
    {votingGraph.map((voting, index)=>{
      const colorClass = (voting !== -1) && `${voteColors[voting].background} ${voting !== selectedIndex ? 'disabled' : ''}`;
      const roundedClass = index === 0 ? 'rounded-l-[30px]' : (index === 9 ? 'rounded-r-[30px]' : ''); 

      return(
      <div key={index} className={`p-voing-bar-element ${roundedClass} ${colorClass}`} onClick={()=>{handleClick(index)}}></div>
      )
      })}
    </>
  );
}
