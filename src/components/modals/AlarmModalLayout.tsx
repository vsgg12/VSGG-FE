import { useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: (isNotification: boolean) => void;
  children: React.ReactNode;
}

export const AlarmModalLayout = ({ isOpen, onClose, children }: ModalProps) => {
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
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        height: '100vh',
        width: '100vw',
      }}
    >
      <div
        ref={modalRef}
        style={{
          position: 'absolute',
          top: 0,
          left: '260px',
          height: '100vh',
          backgroundColor: '#fff',
          width: '362px',
          boxShadow: '4px 0 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        {children}
      </div>
    </div>
  );
};
