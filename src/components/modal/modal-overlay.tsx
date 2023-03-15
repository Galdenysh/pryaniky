import React from 'react';
import styles from './modal.module.css';

interface ModalOverlayProps {
  closePopup: () => void;
}

function ModalOverlay(props: ModalOverlayProps) {
  const { closePopup } = props;

  return <div className={styles.overlay} onClick={closePopup} role="presentation" />;
}

export default ModalOverlay;
