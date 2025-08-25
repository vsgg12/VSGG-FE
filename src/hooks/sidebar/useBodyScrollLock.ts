import { useEffect, useRef } from 'react';

export default function useBodyScrollLock(lock: boolean) {
  const scrollYRef = useRef<number>(0);

  useEffect(() => {
    if (lock) {
      // 잠금 시작 시 scrollY 저장
      scrollYRef.current = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      // 잠금 해제할 때, 원래 scrollY 위치 복원 안함 (그대로 유지)
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      // scroll 위치는 그대로 두고, body 위치만 조절
      const scrollY = Math.abs(parseInt(document.body.style.top || '0', 10));
      window.scrollTo(0, scrollYRef.current || scrollY);
    }

    return () => {
      // 언마운트 시에도 복원 로직 동일하게
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [lock]);
}
