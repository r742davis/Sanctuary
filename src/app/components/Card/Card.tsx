"use client";

import { useState } from "react";
import classNames from "classnames";
import { Modal } from "@components";
import { DeleteIcon, EditIcon } from "@icons";
import styles from "./Card.module.css";

export type CardProps = {
  title: string;
  content: string;
};

type CardStatuses = "IDLE" | "EDITING" | "DELETING" | "VIEWING";

export default function Card({ title, content }: CardProps) {
  const [status, setStatus] = useState<CardStatuses>("IDLE");

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setStatus("DELETING");
  };
  const handleEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setStatus("EDITING");
  };
  const handleView = () => setStatus("VIEWING");
  const handleClose = () => setStatus("IDLE");

  const renderCardContent = (showButtons = true) => (
    <div
      className={classNames(styles.card, { [styles["is-open"]]: status !== "IDLE" })}
      onClick={handleView}
      title="Click to open note"
      aria-label="Click to open note"
    >
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.content}>{content}</p>
      {showButtons && (
        <div className={styles["button-container"]}>
          <button className={classNames(styles.button, styles.delete)} onClick={handleDelete}>
            <DeleteIcon />
          </button>
          <button className={classNames(styles.button, styles.edit)} onClick={handleEdit}>
            <EditIcon />
          </button>
        </div>
      )}
    </div>
  );

  switch (status) {
    case "EDITING":
      return (
        <>
          <Modal onClose={handleClose} removePadding>
            {renderCardContent(false)}
          </Modal>
          {renderCardContent()}
        </>
      );
    case "DELETING":
      return (
        <>
          <Modal onClose={handleClose} removePadding>
            <p>Do you want to delete this note?</p>
            <button>Confirm</button>
            <button>Cancel</button>
          </Modal>
          {renderCardContent()}
        </>
      );
    case "VIEWING":
      return (
        <>
          <Modal onClose={handleClose} removePadding>
            {renderCardContent(false)}
          </Modal>
          {renderCardContent()}
        </>
      );
    default:
      return renderCardContent();
  }
}
