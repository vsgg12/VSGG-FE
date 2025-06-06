'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Mousewheel, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import { useRouter } from 'next/navigation';

function VerticalBannerSwiper() {
  const router = useRouter();

  const handleFeedbackBannerClick = () => {
    router.push('https://forms.gle/RN9FPwW6UgrExoTo8');
  };
  const handleUploadBannerClick = () => {
    router.push('https://forms.gle/gFMtaNWqMZN7oqJW7');
  };

  return (
    <div className='w-full flex gap-[10px] items-end'>
      <Swiper
        direction='vertical'
        mousewheel={true}
        modules={[Autoplay, Pagination, Mousewheel, Navigation]}
        spaceBetween={30}
        pagination={{
          clickable: false,
          el: '.custom-pagination',
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        className='w-[150.8px] h-[59.47px]'
      >
        <SwiperSlide>
          <img
            src='/images/banner/VSGG배너_피드백시RP증정.png'
            alt='피드백배너'
            className='w-full h-full cursor-pointer'
            onClick={handleFeedbackBannerClick}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src='/images/banner/VSGG배너_영상업로드시RP증정.png'
            alt='영상업로드배너'
            className='w-full h-full cursor-pointer'
            onClick={handleUploadBannerClick}
          />
        </SwiperSlide>
      </Swiper>
      <div className='custom-pagination flex flex-col' />
    </div>
  );
}

export default VerticalBannerSwiper;
