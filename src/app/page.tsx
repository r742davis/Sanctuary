"use client";

import { useCallback, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Card, SearchBar } from "@components";
import styles from "./page.module.css";

type NoteData = {
  title: string;
  content: string;
  date: Date;
};

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const {
    isPending,
    error,
    data: notesData,
    isFetching,
  } = useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      try {
        const { data: notes } = await axios.get<NoteData[]>(
          (process.env.NEXT_PUBLIC_HEROKU_API_URI as string) || (process.env.HEROKU_API_URI as string)
        );
        return notes;
      } catch (error) {
        throw new Error("Failed to fetch note data");
      }
    },
    retry: 3,
  });

  const filterNotes = useCallback((query: string, notes: Array<NoteData>) => {
    const regex = new RegExp(query, "i");
    return notes.filter((note) => regex.test(note.content));
  }, []);

  const handleSubmitKeyword = (submission: string) => {
    setKeyword(submission);
  };

  const filteredCards: Array<NoteData> = !!notesData ? filterNotes(keyword, notesData) : [];

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
