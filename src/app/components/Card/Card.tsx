"use client";

import { useState } from "react";
import classNames from "classnames";
import { Form, Modal } from "@components";
import { DeleteIcon, EditIcon } from "@icons";
import { Note, useNoteMutations } from "@lib";
import styles from "./Card.module.css";

export type CardProps = {
  _id: string;
  title: string;
  content: string;
};

type CardStatuses = "IDLE" | "EDITING" | "DELETING" | "VIEWING";

export default function Card({ _id, title, content }: CardProps) {
  const [status, setStatus] = useState<CardStatuses>("IDLE");
  const { deleteNoteMutation, updateNoteMutation } = useNoteMutations();

  const handleUpdateNote = (updatedNote: Note) => {
    updateNoteMutation({ _id, ...updatedNote });
    setStatus("IDLE");
  };

  const handleDeleteNote = () => {
    deleteNoteMutation(_id);
    setStatus("IDLE");
  };

  const renderCardContent = (showButtons = true, showAnimations = false) => (
    <div
      className={classNames(styles.card, {
        [styles["is-open"]]: status !== "IDLE",
        [styles["show-animations"]]: showAnimations,
      })}
      title="Click to open note"
      aria-label="Click to open note"
    >
      <div className={styles["click-wrapper"]} onClick={() => setStatus("VIEWING")}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.content}>{content}</p>
      </div>
      {showButtons && (
        <div className={styles["button-container"]}>
          <button className={classNames(styles.button, styles.delete)} onClick={() => setStatus("DELETING")}>
            <DeleteIcon />
          </button>
          <button className={classNames(styles.button, styles.edit)} onClick={() => setStatus("EDITING")}>
            <EditIcon />
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {status === "EDITING" && (
        <Modal onClose={() => setStatus("IDLE")} header="Update Your Note">
          <Form initialValues={{ title, content }} onSubmit={handleUpdateNote} />
        </Modal>
      )}
      {status === "DELETING" && (
        <Modal onClose={() => setStatus("IDLE")} header="Do you want to delete this note?" autoHeight>
          <div className={styles["delete-notification"]}>
            <button onClick={handleDeleteNote}>Confirm</button>
            <button onClick={() => setStatus("IDLE")}>Cancel</button>
          </div>
        </Modal>
      )}
      {status === "VIEWING" && (
        <Modal onClose={() => setStatus("IDLE")} removePadding>
          {renderCardContent(false)}
        </Modal>
      )}
      {renderCardContent(true, true)}
    </>
  );
}
