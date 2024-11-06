import React from 'react';
import ProgressBar from '@ramonak/react-progress-bar';

interface BarChartProps {
  num: number;
}

const BarChart: React.FC<BarChartProps> = ({ num }) => {
  return (
    <div className='w-[200px]' style={{ border: '2px solid #8A1F21', borderRadius: '50px' }}>
      <ProgressBar
        completed={num}
        bgColor='#8A1F21'
        labelColor='#8A1F21'
        baseBgColor='#FFF'
        borderRadius='50px'
        height='30px'
        animateOnRender
      />
    </div>
  );
};

export default BarChart;
