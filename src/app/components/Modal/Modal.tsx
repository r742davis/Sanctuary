import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

export type ModalProps = {
  onClose: () => void;
  title?: string;
};

export default function Modal({
  children,
  onClose,
  title,
}: ModalProps & PropsWithChildren) {
  const portalRoot = document.getElementById("portal-root") as HTMLElement;

  const modalJsx = (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h4>Note</h4>
          <button className={styles["close-button"]} onClick={onClose}>
            &times;
          </button>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );

  return portalRoot ? createPortal(modalJsx, portalRoot) : null;
}
