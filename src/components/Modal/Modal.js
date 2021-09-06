import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ children, onClose }) {
  const windowListener = useRef(null);

  useEffect(() => {
    windowListener.current = window.addEventListener('keydown', handleKeyDown);
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
      windowListener.current = window.removeEventListener(
        'keydown',
        handleKeyDown,
      );
    }
  };

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={styles.modal__backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal__content}>{children}</div>
    </div>,
    modalRoot,
  );
}
