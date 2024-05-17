"use client";

import { useState } from "react";
import classNames from "classnames";
import { Modal } from "@components";
import styles from "./Card.module.css";

export type CardProps = {
  title: string;
  content: string;
};

export default function Card({ title, content }: CardProps) {
  const [isCardOpen, setCardOpen] = useState(false);

  const handleCardClick = () => {
    setCardOpen(true);
  };

  const handleCloseCard = () => {
    setCardOpen(false);
  };

  const cardJsx = (
    <div
      className={classNames(styles.card, { [styles["is-open"]]: isCardOpen })}
      onClick={() => handleCardClick()}
      title="Click to open note"
      aria-label="Click to open note"
    >
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.content}>{content}</p>
    </div>
  );

  return (
    <>
      {isCardOpen && (
        <Modal onClose={handleCloseCard} removePadding>
          {cardJsx}
        </Modal>
      )}
      {cardJsx}
    </>
  );
}
