import React, { SetStateAction } from 'react';

interface ModalLayoutProps {
  children: React.ReactNode;
  setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
}

function ModalLayout({ children, setIsModalOpen }: ModalLayoutProps) {
  return (
    <div
      className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'
      onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target === event.currentTarget) {
          setIsModalOpen(false);
        }
      }}
    >
      {children}
    </div>
  );
}

export default ModalLayout;
