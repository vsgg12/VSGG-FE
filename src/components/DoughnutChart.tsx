import React, { useEffect, useState } from 'react';
import { Chart, ArcElement, Tooltip, Legend, TooltipItem } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import VoteResultCard from './VoteResultCard';

Chart.register(ArcElement, Tooltip, Legend);

interface DoughnutChartPropsHome {
  size: 'home' | 'post';
  voteInfos: IGetInGameInfoType[];
}

const DoughnutChart: React.FC<DoughnutChartPropsHome> = ({
  voteInfos,
  size,
}: DoughnutChartPropsHome) => {
  const [championNames, setChampionNames] = useState<string[]>([]);
  const [averageValues, setAverageValues] = useState<(number | null)[]>([]);
  const [championPositions, setChampionPositions] = useState<string[]>([]);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);

  useEffect(() => {
    const newChampionNames: string[] = [];
    const newAverageValues: (number | null)[] = [];
    const newChampionPositions: string[] = [];

    voteInfos.forEach((info) => {
      newChampionNames.push(info.championName);
      newAverageValues.push(info.averageRatio);
      newChampionPositions.push(info.position);
    });

    setChampionNames(newChampionNames);
    setAverageValues(newAverageValues);
    setChampionPositions(newChampionPositions);
  }, [voteInfos]);

  const data = {
    labels: championNames,
    datasets: [
      {
        label: '# of Votes',
        data: averageValues,
        backgroundColor: ['#000000', '#9D2A2C', '#B5B5B5', '#656565', '#8A1F21'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // 범례를 숨깁니다.
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context: TooltipItem<'doughnut'>) {
            const label = context.label || '';
            const value = context.raw as number;

            const index = championNames.indexOf(label);
            if (index !== -1) {
              setSelectedPosition(championPositions[index]);
            }

            setSelectedLabel(label);
            setSelectedValue(value);

            return `${label}`;
          },
        },
      },
    },
  };

  return (
    <div className='flex relative'>
      <div
        className={`flex ${size === 'home' ? 'h-[110px] w-[110px]' : 'h-[200px] w-[200px]'} items-center justify-center`}
      >
        <Doughnut data={data} options={options} />
      </div>
      {selectedLabel && (
        <VoteResultCard name={selectedLabel} value={selectedValue} position={selectedPosition} />
      )}
    </div>
  );
};

export default DoughnutChart;
