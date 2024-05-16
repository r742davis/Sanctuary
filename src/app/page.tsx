"use client";

import { Card, SearchBar } from "@components";
import styles from "./page.module.css";
import { useState } from "react";

export default function Home() {
  const [keyword, setKeyword] = useState("");

  const cardsArray1 = new Array(3).fill({
    title: "Oh my!",
    content: "Singing in the rain",
  });

  const cardsArray2 = new Array(3).fill({
    title: "Hello",
    content: "Content goes here boyyy",
  });

  const cardsArray3 = new Array(4).fill({
    title: "Metals",
    content: "Quartz is a mineral",
  });

  const combinedArrays: Array<{ title: string; content: string }> = [...cardsArray1, ...cardsArray2, ...cardsArray3];

  const filterItems = (query: string) => {
    const regex = new RegExp(query, "i");
    return combinedArrays.filter((item) => regex.test(item.content));
  };

  const handleSubmitKeyword = (submission: string) => {
    console.log('submit');
    setKeyword(submission);
  };

  const filteredCards = !!keyword ? filterItems(keyword) : combinedArrays;

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1>Sanctuary</h1>
        <SearchBar handleSubmit={handleSubmitKeyword} />
      </div>
      <div className={styles.content}>
        <h2>Notes</h2>
        <div className={styles.list}>
          {filteredCards.map((card, i) => (
            <Card key={`card-${i}`} title={card.title} content={card.content} />
          ))}
        </div>
      </div>
    </main>
  );
}
