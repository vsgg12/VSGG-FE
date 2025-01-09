import React from 'react';
import ProgressBar from '@ramonak/react-progress-bar';

interface BarChartProps {
  num: number;
  isMobile?: boolean;
}

const BarChart: React.FC<BarChartProps> = ({ num, isMobile }) => {
  return (
    <div
      className={`${isMobile ? 'w-full' : 'w-[200px]'}`}
      style={{ border: '2px solid #8A1F21', borderRadius: '50px' }}
    >
      <ProgressBar
        completed={num}
        bgColor='#8A1F21'
        labelColor='#8A1F21'
        baseBgColor='#FFF'
        borderRadius='50px'
        height={`${isMobile ? "20.55px": "30px"}`}
        animateOnRender
      />
    </div>
  );
};

export default BarChart;
