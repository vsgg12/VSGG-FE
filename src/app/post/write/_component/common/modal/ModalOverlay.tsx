'use client';

import { ReactNode } from 'react';

interface OverlayProps {
  children: ReactNode;
  onClose: () => void;
  zIndex?: number;
}

const ModalOverlay = ({ children, onClose, zIndex = 50 }: OverlayProps) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50`}
      style={{ zIndex }}
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
};

export default ModalOverlay;
