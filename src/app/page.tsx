"use client";

import { useCallback, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Card, SearchBar } from "@components";
import queryClient from "lib/react-query-client";
import { NoteData, createNote, getNotes } from "lib/note-api";
import styles from "./page.module.css";

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const {
    isPending,
    error,
    data: notesData,
    isFetching,
  } = useQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
    retry: 3,
  });

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notes"] }),
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
        <div className={styles.title}>
          <h2>Notes</h2>
          <button
            className={styles.button}
            onClick={() => {
              mutation.mutate({
                title: "TEST 1",
                content: "hello",
              });
            }}
            title="Create New Note"
          >
            +
          </button>
        </div>
        <div className={styles.list}>
          {filteredCards.map((card, i) => (
            <Card key={`card-${i}`} title={card.title} content={card.content} />
          ))}
        </div>
      </div>
    </main>
  );
}
