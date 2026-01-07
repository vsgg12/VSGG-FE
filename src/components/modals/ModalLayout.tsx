import React, { SetStateAction, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ModalLayoutProps {
  children: React.ReactNode;
  setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
}

function ModalLayout({ children, setIsModalOpen }: ModalLayoutProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const html = document.documentElement;
    const body = document.body;
    const root = document.getElementById('root'); // Vite/CRA 기본 ID가 root입니다.

    // 강제로 스크롤 막기
    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    if (root) root.style.overflow = 'hidden';

    return () => {
      html.style.overflow = '';
      body.style.overflow = '';
      if (root) root.style.overflow = '';
    };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      className='fixed inset-0 flex items-center justify-center z-[9999] bg-black bg-opacity-50'
      onWheel={(e) => e.stopPropagation()}
      onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target === event.currentTarget) {
          setIsModalOpen(false);
        }
      }}
    >
      {children}
    </div>,
    document.body,
  );
}

export default ModalLayout;
