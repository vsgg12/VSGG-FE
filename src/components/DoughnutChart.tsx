import React, { useEffect, useState } from 'react';
import { Chart, ArcElement, Tooltip, Legend, TooltipModel } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import VoteResultCard from './VoteResultCard';

Chart.register(ArcElement, Tooltip, Legend);

interface DoughnutChartPropsHome {
  size: 'home' | 'post';
  voteInfos: IGetInGameInfoType[];
  isMobile?: boolean;
}

const DoughnutChart: React.FC<DoughnutChartPropsHome> = ({
  voteInfos,
  size,
  isMobile,
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
      newChampionNames.push(info.championName!);
      newAverageValues.push(info.averageRatio!);
      newChampionPositions.push(info.position!);
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
        backgroundColor: ['#000000', '#9D2A2C', '#B5B5B5', '#656565', '#70191B'],
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
        enabled: isMobile ? true : false,
        external: (context: { chart: Chart; tooltip: TooltipModel<'doughnut'> }) => {
          const tooltipModel = context.tooltip;

          if (tooltipModel.opacity === 0 || !tooltipModel.dataPoints?.length) {
            return;
          }

          const label = tooltipModel.dataPoints[0].label;
          const value = tooltipModel.dataPoints[0].raw as number;

          const index = championNames.indexOf(label);
          if (index !== -1) {
            setSelectedPosition(championPositions[index]);
          }

          setSelectedLabel(label);
          setSelectedValue(value);
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
      {selectedLabel && !isMobile && (
        <VoteResultCard name={selectedLabel} value={selectedValue} position={selectedPosition} />
      )}
    </div>
  );
};

export default DoughnutChart;
