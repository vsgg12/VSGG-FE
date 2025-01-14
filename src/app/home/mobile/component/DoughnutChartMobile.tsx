import React, { useEffect, useState } from 'react';
import { Chart, ArcElement, Tooltip, Legend, TooltipItem } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

Chart.register(ArcElement, Tooltip, Legend);

interface DoughnutChartPropsHome {
  size: 'home' | 'post';
  voteInfos: IGetInGameInfoType[];
}

const DoughnutChartMobile: React.FC<DoughnutChartPropsHome> = ({
  voteInfos,
  size,
}: DoughnutChartPropsHome) => {
  const [championNames, setChampionNames] = useState<string[]>([]);
  const [averageValues, setAverageValues] = useState<(number | null)[]>([]);

  useEffect(() => {
    const newChampionNames: string[] = [];
    const newAverageValues: (number | null)[] = [];

    voteInfos.forEach((info) => {
      newChampionNames.push(info.championName);
      newAverageValues.push(info.averageRatio);
    });

    setChampionNames(newChampionNames);
    setAverageValues(newAverageValues);
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
            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  return (
    <div
      className={`flex ${size === 'home' ? 'h-[50%] w-[50%]' : 'h-[100px] w-[100px]'} flex-col items-center justify-center`}
    >
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughnutChartMobile;
