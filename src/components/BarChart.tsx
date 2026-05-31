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
      style={{ border: '2px solid #E20A29', borderRadius: '50px' }}
    >
      <ProgressBar
        completed={num}
        bgColor='#E20A29'
        labelColor='#E20A29'
        baseBgColor='#FFF'
        borderRadius='50px'
        height={`${isMobile ? "20.55px": "30px"}`}
        animateOnRender
      />
    </div>
  );
};

export default BarChart;
