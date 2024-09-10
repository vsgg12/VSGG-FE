import { useState, memo } from 'react';
import moment from 'moment';
import 'moment/locale/ko';
import Image from 'next/image';
import Btn_arrow_left from '../../../../../public/svg/calandar/Btn_arrow_left.svg';
import Btn_arrow_right from '../../../../../public/svg/calandar/Btn_arrow_right.svg';

interface ICalendarProps {
  selectedDate: string | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<string | null>>;
  setIsCalendarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Calendar = memo(({ selectedDate, setSelectedDate, setIsCalendarOpen }: ICalendarProps) => {
  const [currentDate, setCurrentDate] = useState(moment());

  const goToPreviousMonth = () => {
    setCurrentDate((prevDate) => moment(prevDate).subtract(1, 'month'));
  };

  const goToNextMonth = () => {
    setCurrentDate((prevDate) => moment(prevDate).add(1, 'month'));
  };

  const handleDateClick = (date: string) => {
    if (moment(date).isSameOrAfter(moment(), 'day')) {
      setSelectedDate(date);
    }
  };

  const renderDaysOfWeek = () => {
    moment.locale('ko');
    const daysOfWeek = moment.weekdaysShort();
    return daysOfWeek.map((day) => (
      <div key={day} className='w-[100%] text-center text-[12px] text-gray-400'>
        {day}
      </div>
    ));
  };

  const renderCalendarGrid = () => {
    const startOfMonth = moment(currentDate).startOf('month');
    const endOfMonth = moment(currentDate).endOf('month');
    const startOfFirstWeek = moment(startOfMonth).startOf('week');
    const endOfLastWeek = moment(endOfMonth).endOf('week');
    const calendar: JSX.Element[] = [];
    const currentDay = moment(startOfFirstWeek);

    const rangeStart = moment().startOf('day');
    const rangeEnd = moment(selectedDate).startOf('day');

    while (currentDay.isSameOrBefore(endOfLastWeek)) {
      const week: JSX.Element[] = [];
      for (let i = 0; i < 7; i++) {
        const date = currentDay.format('YYYY/MM/DD');
        const isPastDate = currentDay.isBefore(moment(), 'day');
        const isSelected = date === selectedDate;
        const isToday = currentDay.isSame(moment(), 'day');
        const isInRange = currentDay.isBetween(rangeStart, rangeEnd, 'day', '[]');
        const isSaturday = currentDay.day() === 6; // Saturday
        const isSunday = currentDay.day() === 0; // Sunday

        week.push(
          <div
            key={date}
            className={`relative flex justify-center items-center  text-[12px] font-medium leading-[30px] 
                      ${isToday ? 'text-white rounded-l-full ' : 'text-black'}
                      ${isSelected ? 'text-white rounded-r-full' : ''}
                      ${isInRange ? 'bg-[#8A1F21] bg-opacity-[50%]' : ''}
                      ${isSaturday ? 'rounded-r-full' : ''}
                      ${isSunday ? 'rounded-l-full' : ''}
                      ${isPastDate ? 'pointer-events-none opacity-20' : 'cursor-pointer'} w-full`}
            onClick={() => handleDateClick(date)}
          >
            <div
              className={`absolute ${isToday || isSelected ? 'text-white bg-[#8A1F21] rounded-full w-[30px] h-[30px] ' : ''}`}
            />
            <div className={`relative z-10 ${isToday || isSelected ? 'text-white' : 'text-black'}`}>
              {currentDay.month() === currentDate.month() ? currentDay.format('D') : ''}
            </div>{' '}
          </div>,
        );
        currentDay.add(1, 'day');
      }
      calendar.push(
        <div
          key={currentDay.format('YYYY-MM-DD')}
          className='grid grid-cols-7 justify-items-center px-2'
        >
          {week}
        </div>,
      );
    }

    return calendar;
  };

  return (
    <div className='relative w-[314px] h-[350px] pt-[10px] bg-[#F8F8F8] rounded-3xl '>
      <div className='flex justify-center gap-[80px] items-center mt-[10px] px-[14px]'>
        <button className='bg-none border-none cursor-pointer'>
          <Image
            src={Btn_arrow_left}
            width={24}
            height={24}
            alt='왼쪽 버튼'
            onClick={goToPreviousMonth}
          />
        </button>
        <div className='text-[16px]  text-gray-400 leading-[32px]'>
          {currentDate.format('MM월')}
        </div>
        <button className='bg-none border-none cursor-pointer'>
          <Image
            src={Btn_arrow_right}
            width={24}
            height={24}
            alt='오른쪽 버튼'
            onClick={goToNextMonth}
          />
        </button>
      </div>
      <div className='flex justify-between leading-[45px] text-gray-400 px-[10px]'>
        {renderDaysOfWeek()}
      </div>
      <div className='flex flex-col justify-items-center gap-2'>{renderCalendarGrid()}</div>
      <button
        className='text-center bg-[#333333] text-white w-[282px] h-[35px] rounded-[30px] translate-x-4 mt-4'
        onClick={() => {
          setIsCalendarOpen(false);
        }}
      >
        확인
      </button>
    </div>
  );
});
export default Calendar;
