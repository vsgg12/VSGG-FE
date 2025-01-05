import React from 'react';
import { Chart, ArcElement } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

Chart.register(ArcElement);

interface HalfDoughnutChartProps {
  win: number;
  lose: number;
  isMobile?: boolean;
}

const HalfDoughnutChart: React.FC<HalfDoughnutChartProps> = ({ win, lose, isMobile }) => {
  const total = win + lose;
  const isZero = total === 0;
  const winPercentage = isZero ? 0 : (win / total) * 100;

  const data = {
    datasets: [
      {
        label: '# of Votes',
        data: isZero ? [0, 1] : [win, lose],
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
      <span
        className={`absolute ${isMobile ? 'text-[16px]' : 'text-[20px]'} font-medium text-[#8A1F21] translate-y-[25px]`}
      >
        {isZero ? '0' : winPercentage.toFixed(0)}%
      </span>
    </div>
  );
};

export default HalfDoughnutChart;
