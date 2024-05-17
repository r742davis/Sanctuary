import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";
import classNames from "classnames";

export type ModalProps = {
  onClose: () => void;
  header?: string;
  removePadding?: boolean;
};

export default function Modal({ children, onClose, removePadding, header = "Note" }: ModalProps & PropsWithChildren) {
  const portalRoot = document.getElementById("portal-root") as HTMLElement;

  const modalJsx = (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h4>{header}</h4>
          <button className={styles["close-button"]} onClick={onClose}>
            &times;
          </button>
        </div>
        <div className={classNames(styles.content, { [styles["remove-padding"]]: removePadding })}>{children}</div>
      </div>
    </div>
  );

  return portalRoot ? createPortal(modalJsx, portalRoot) : null;
}
