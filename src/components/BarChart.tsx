import React from 'react';
import ProgressBar from '@ramonak/react-progress-bar';

interface BarChartProps {
  num: number;
}

const BarChart: React.FC<BarChartProps> = ({ num }) => {
  return (
    <div className='w-full' style={{ border: '2px solid #8A1F21', borderRadius: '15px' }}>
      <ProgressBar
        completed={num}
        bgColor='#8A1F21'
        labelColor='#8A1F21'
        baseBgColor='#FFF'
        borderRadius='15px'
      />
    </div>
  );
};

export default BarChart;
