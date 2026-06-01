'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const CHAT_IMAGES = [
  { id: 1, src: '/images/login/loginContentImg1.png', alt: '로그인 대화 1' },
  { id: 2, src: '/images/login/loginContentImg2.png', alt: '로그인 대화 2' },
  { id: 3, src: '/images/login/loginContentImg3.png', alt: '로그인 대화 3' },
  { id: 4, src: '/images/login/loginContentImg4.png', alt: '로그인 대화 4' },
];

const LoginModalContent = () => {
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev >= CHAT_IMAGES.length) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col gap-4 w-full max-w-[392px] items-start justify-start">
      {CHAT_IMAGES.map((item, index) => (
        <div
          key={item.id}
          className={`w-full flex justify-start relative h-[47px] transition-opacity duration-500 ${
            index < visibleCount ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill
            className="object-contain object-left"
          />
        </div>
      ))}
    </div>
  );
};

export default LoginModalContent;