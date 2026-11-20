'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import NextImage from 'next/image';
import feedbackBanner from '../../../../public/images/banner/VSGG배너_피드백시RP증정.png';
import uploadBanner from '../../../../public/images/banner/VSGG배너_영상업로드시RP증정.png';

import 'swiper/css';
import 'swiper/css/pagination';

function HorizontalBannerSwiper() {
  const handleFeedbackBannerClick = () => {
    window.open('https://forms.gle/RN9FPwW6UgrExoTo8', '_blank');
  };
  const handleUploadBannerClick = () => {
    window.open('https://forms.gle/gFMtaNWqMZN7oqJW7', '_blank');
  };

  return (
    <div className='w-full flex flex-col gap-[10px]'>
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        pagination={{
          clickable: true,
          el: '.custom-pagination',
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        className='w-[206px] h-[81.24px] flex'
      >
        <SwiperSlide>
          <NextImage
            src={feedbackBanner}
            alt='피드백배너'
            sizes='206px' // 실제 표시 너비 → 1x/2x용 작은 이미지만 받음
            priority // 모바일 홈 최상단이라 LCP 후보 → 미리 로드
            className='w-full h-full cursor-pointer'
            onClick={handleFeedbackBannerClick}
          />
        </SwiperSlide>
        <SwiperSlide>
          <NextImage
            src={uploadBanner}
            alt='영상업로드배너'
            sizes='206px'
            className='w-full h-full cursor-pointer'
            onClick={handleUploadBannerClick}
          />
        </SwiperSlide>
      </Swiper>
      <div className='custom-pagination flex justify-end'></div>
    </div>
  );
}

export default HorizontalBannerSwiper;
