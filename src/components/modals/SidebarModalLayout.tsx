import { useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: (isNotification: boolean) => void;
  children: React.ReactNode;
}

export const SidebarModalLayout = ({ isOpen, onClose, children }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 w-screen h-screen z-[1000]'>
      <div ref={modalRef} className='absolute top-0 left-[260px] h-screen w-[362px] bg-white'>
        {children}
      </div>
    </div>
  );
};
