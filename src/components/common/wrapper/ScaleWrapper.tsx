'use client';

import React, { useEffect, useState } from 'react';

export default function ScaleWrapper({ children }: { children: React.ReactNode }) {
  const [scale, setScale] = useState(1);
  const [isMounted, setIsMounted] = useState(false);

  // 개발자님의 황금 비율 기준점 (2560x1664 해상도 기준 75% 배율의 논리 픽셀값)
  const BASE_WIDTH = 1706;
  const BASE_HEIGHT = 1109;

  useEffect(() => {
    setIsMounted(true);

    const handleResize = () => {
      const currentWidth = window.innerWidth;
      const currentHeight = window.innerHeight;

      // 너비 비율과 높이 비율 중 '더 작은 값'을 기준으로 스케일링합니다.
      // 이렇게 하면 가로로 좁은 화면이든, 세로로 납작한 화면이든 콘텐츠가 절대 잘리지 않고 화면 안에 쏙 들어옵니다 (object-fit: contain 과 같은 원리).
      const widthRatio = currentWidth / BASE_WIDTH;
      const heightRatio = currentHeight / BASE_HEIGHT;

      setScale(Math.min(widthRatio, heightRatio));
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // SSR 환경에서 하이드레이션 에러 방지를 위해 마운트 전에는 렌더링하지 않음
  if (!isMounted) return null;

  return (
    // 1. 화면 전체를 덮고 넘어가는 부분을 숨기는 최상위 컨테이너
    <div className='relative w-screen h-screen overflow-hidden bg-gray-20'>
      {/* 2. 핵심 해결책: Absolute Centering
        Flexbox를 쓰지 않고 화면 정중앙(top-1/2 left-1/2)에 요소를 배치한 뒤
        translate(-50%, -50%)로 정중앙 영점을 맞춥니다.
        이렇게 하면 스케일이 커지든 작아지든 무조건 화면 정중앙을 기준으로 크기가 변합니다.
      */}
      <div
        className='absolute top-1/2 left-1/2 flex justify-center items-center'
        style={{
          width: `${BASE_WIDTH}px`,
          height: `${BASE_HEIGHT}px`,
          transform: `translate(-50%, -50%) scale(${scale})`,
          transformOrigin: 'center center',
        }}
      >
        {/* 기존 Champion / Fault 컴포넌트 내부 요소들이 렌더링될 영역 */}
        {children}
      </div>
    </div>
  );
}
