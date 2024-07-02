import React from 'react';
import { Chart, ArcElement, Tooltip, Legend, TooltipItem } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

Chart.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  voteInfos: IGetVoteType[] | undefined;
  size: 'home' | 'post';
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ voteInfos, size }) => {
  const championNames = voteInfos?.map((info) => info.championName);
  const averageValues = voteInfos?.map((info) => info.votedRatio);

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
      className={`flex ${size === 'home' ? 'h-[110px] w-[110px]' : 'h-[200px] w-[200px]'} flex-col items-center justify-center`}
    >
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;
