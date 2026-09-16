import React from 'react';
import ProgressBar from '@ramonak/react-progress-bar';
import { colors } from '@/constants/colors';

interface BarChartProps {
  num: number;
  isMobile?: boolean;
}

const BarChart: React.FC<BarChartProps> = ({ num, isMobile }) => {
  return (
    <div
      className={`${isMobile ? 'w-full' : 'w-[200px]'}`}
      style={{ border: `2px solid ${colors.brand[500]}`, borderRadius: '50px' }}
    >
      <ProgressBar
        completed={num}
        bgColor={colors.brand[500]}
        labelColor={colors.brand[500]}
        baseBgColor={colors.white}
        borderRadius='50px'
        height={`${isMobile ? "20.55px": "30px"}`}
        animateOnRender
      />
    </div>
  );
};

export default BarChart;
