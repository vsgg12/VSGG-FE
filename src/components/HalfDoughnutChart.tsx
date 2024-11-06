import React from 'react';
import { Chart, ArcElement } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

Chart.register(ArcElement);

interface HalfDoughnutChartProps {
  win: number;
  lose: number;
}

const HalfDoughnutChart: React.FC<HalfDoughnutChartProps> = ({ win, lose }) => {
  const total = win + lose;
  const winPercentage = (win / total) * 100;

  const data = {
    datasets: [
      {
        label: '# of Votes',
        data: [win, lose],
        backgroundColor: ['#8A1F21', '#000000'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    rotation: -90,
    circumference: 180,
    cutout: '67%',
  };

  return (
    <div className='relative flex flex-col items-center justify-center '>
      <Doughnut data={data} options={options} />
      <span className='absolute text-[25px] text-[#8A1F21] bottom-[45px]'>
        {winPercentage.toFixed(0)}%
      </span>
    </div>
  );
};

export default HalfDoughnutChart;
