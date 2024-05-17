"use client";

import { useCallback, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Card, Form, Modal, SearchBar } from "@components";
import queryClient from "lib/react-query-client";
import { Note, createNote, getNotes } from "lib/note-api";
import styles from "./page.module.css";

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
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

  const { mutate, isError: isMutationError } = useMutation({
    mutationFn: createNote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notes"] }),
  });

  const filterNotes = useCallback((query: string, notes: Array<Note>) => {
    const regex = new RegExp(query, "i");
    return notes.filter((note) => regex.test(note.content));
  }, []);

  const handleSubmitKeyword = (submission: string) => {
    setKeyword(submission);
  };

  const handleToggleModal = (isOpen: boolean) => {
    setModalOpen(isOpen);
  };

  const handleCreateNote = (newNote: Note) => {
    mutate(newNote);
    if (!isMutationError) setModalOpen(false);
  };

  const filteredCards: Array<Note> = !!notesData ? filterNotes(keyword, notesData) : [];

  return (
    <>
      {isModalOpen && (
        <Modal onClose={() => handleToggleModal(false)} header="Create New Note">
          <Form onSubmit={handleCreateNote} />
        </Modal>
      )}

      <main className={styles.main}>
        <div className={styles.header}>
          <h1>Sanctuary</h1>
          <SearchBar handleSubmit={handleSubmitKeyword} />
        </div>
        <div className={styles.content}>
          <div className={styles.title}>
            <h2>Notes</h2>
            <button className={styles.button} onClick={() => handleToggleModal(true)} title="Create New Note">
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
    </>
  );
}
