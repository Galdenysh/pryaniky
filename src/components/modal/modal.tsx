import { ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from './modal-overlay';
import styles from './modal.module.css';

const modalRoot = document.getElementById('modals') as HTMLElement;

interface ModalProps {
  children: ReactNode;
  closePopup: () => void;
}

function Modal(props: ModalProps) {
  const { children, closePopup } = props;

  const closePopupEsc = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      closePopup();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', closePopupEsc);

    return () => {
      document.removeEventListener('keydown', closePopupEsc);
    };
  }, []);

  return ReactDOM.createPortal(
    <section className={styles.popup}>
      <div className={styles.container}>
        {children}
      </div>
      <ModalOverlay closePopup={closePopup} />
    </section>,
    modalRoot,
  );
}

export default Modal;
