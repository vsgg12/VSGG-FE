import { useState, useEffect, memo } from 'react';
import moment from 'moment';
import 'moment/locale/ko';
import Image from 'next/image';
import Btn_arrow_left from '../../../../../public/svg/calandar/Btn_arrow_left.svg';
import Btn_arrow_right from '../../../../../public/svg/calandar/Btn_arrow_right.svg';

type ButtonProperty = 'disabled' | 'confirm' | 'default' | 'pressed';

interface ICalendarProps {
  handleCloseModal?: () => void;
}

const Calendar = memo(({ handleCloseModal }: { handleCloseModal?: () => void }) => {
  const [currentDate, setCurrentDate] = useState(moment());
  const [selectDate, setSelectDate] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [buttonProperty, setButtonProperty] = useState<ButtonProperty>('disabled');

  const goToPreviousMonth = () => {
    setCurrentDate((prevDate) => moment(prevDate).subtract(1, 'month'));
  };

  const goToNextMonth = () => {
    setCurrentDate((prevDate) => moment(prevDate).add(1, 'month'));
  };

  const handleDateClick = (date: string) => {
    if (moment(date).isSameOrAfter(moment(), 'day')) {
      setSelectDate(date);
    }
  };

  const handleClickBtn = () => {
    setSelectedDate(selectDate);
    handleCloseModal?.();
  };

  useEffect(() => {
    if (selectDate && moment(selectDate).isSameOrAfter(moment(), 'day')) {
      setButtonProperty('confirm');
    } else {
      setButtonProperty('disabled');
    }
  }, [selectDate]);

  const renderDaysOfWeek = () => {
    moment.locale('ko');
    const daysOfWeek = moment.weekdaysShort();
    return daysOfWeek.map((day) => (
      <div
        key={day}
        className='w-[100%] text-center text-lg font-medium leading-[32px] text-gray-400'
      >
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
    const rangeEnd = moment(selectDate).startOf('day');

    while (currentDay.isSameOrBefore(endOfLastWeek)) {
      const week: JSX.Element[] = [];
      for (let i = 0; i < 7; i++) {
        const date = currentDay.format('YYYY-MM-DD');
        const isPastDate = currentDay.isBefore(moment(), 'day');
        const isSelected = date === selectDate;
        const isToday = currentDay.isSame(moment(), 'day');
        const isInRange = currentDay.isBetween(rangeStart, rangeEnd, 'day', '[]');
        const isSaturday = currentDay.day() === 6; // Saturday
        const isSunday = currentDay.day() === 0; // Sunday

        week.push(
          <div
            key={date}
            className={`relative flex justify-center items-center mt-[15px] text-lg font-medium leading-[32px] 
                      ${isToday ? 'text-white rounded-l-full ' : 'text-black'}
                      ${isSelected ? 'text-white rounded-r-full' : ''}
                      ${isInRange ? 'bg-white' : ''}
                      ${isSaturday ? 'rounded-r-full' : ''}
                      ${isSunday ? 'rounded-l-full' : ''}
                      ${isPastDate ? 'pointer-events-none opacity-20' : 'cursor-pointer'} w-full`}
            onClick={() => handleDateClick(date)}
          >
            <div
              className={`absolute ${isToday || isSelected ? 'text-white bg-black rounded-full w-[30px] h-[30px] ' : ''}`}
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
    <div className='relative w-[314px] h-[354px] pt-[30px] bg-[#F8F8F8] rounded-3xl'>
      <div className='flex justify-center gap-[24px] items-center mb-[36px] px-[14px]'>
        <button className='bg-none border-none cursor-pointer'>
          <Image
            src={Btn_arrow_left}
            width={24}
            height={24}
            alt='왼쪽 버튼'
            onClick={goToPreviousMonth}
          />
        </button>
        <div className='text-xl font-medium text-gray-400 leading-[32px]'>
          {currentDate.format('YYYY년 MM월')}
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
      <div className='flex justify-between font-medium text-lg leading-[32px] text-gray-400 px-[8px]'>
        {renderDaysOfWeek()}
      </div>
      <div className='flex flex-col justify-items-center px-[8px]'>{renderCalendarGrid()}</div>
      <div className=' w-full bottom-[36px] left-[24px] flex'>
        <button onClick={handleClickBtn} className='w-full text-center'>
          해당 날짜로 선택 완료
        </button>
      </div>
    </div>
  );
});
export default Calendar;
