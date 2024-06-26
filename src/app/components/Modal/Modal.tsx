import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import classNames from "classnames";
import styles from "./Modal.module.css";

export type ModalProps = {
  onClose: () => void;
  header?: string;
  removePadding?: boolean;
  autoHeight?: boolean;
};

export default function Modal({
  children,
  onClose,
  removePadding,
  autoHeight,
  header = "Note",
}: ModalProps & PropsWithChildren) {
  const portalRoot = document.getElementById("portal-root") as HTMLElement;

  const modalJsx = (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={classNames(styles.modal, { [styles["auto-height"]]: autoHeight })}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <h4>{header}</h4>
          <button className={styles["close-button"]} onClick={onClose} title="Close the note">
            &times;
          </button>
        </div>
        <div className={classNames(styles.content, { [styles["remove-padding"]]: removePadding })}>{children}</div>
      </div>
    </div>
  );

  return portalRoot ? createPortal(modalJsx, portalRoot) : null;
}
