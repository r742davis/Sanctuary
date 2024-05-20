"use client";

import { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, Form, Modal, SearchBar } from "@components";
import { Note, NoteData, getNotes, useNoteMutations } from "@lib";
import styles from "./page.module.css";

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const { data: notesData } = useQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
    retry: 3,
  });
  const { createNoteMutation } = useNoteMutations();

  const filterNotes = useCallback((query: string, notes: Array<NoteData>) => {
    const regex = new RegExp(query, "i");
    return notes.filter((note) => regex.test(note.title) || regex.test(note.content));
  }, []);

  const handleSubmitKeyword = (submission: string) => {
    setKeyword(submission);
  };

  const handleToggleModal = (isOpen: boolean) => {
    setModalOpen(isOpen);
  };

  const handleCreateNote = (newNote: Note) => {
    createNoteMutation(newNote);
    handleToggleModal(false);
  };

  const filteredCards: Array<NoteData> = !!notesData ? filterNotes(keyword, notesData) : [];

  return (
    <>
      {isModalOpen && (
        <Modal onClose={() => handleToggleModal(false)} header="Create New Note">
          <Form onSubmit={handleCreateNote} />
        </Modal>
      )}

      <main className={styles.main}>
        <header className={styles.header}>
          <h1>Sanctuary</h1>
          <SearchBar handleSubmit={handleSubmitKeyword} />
        </header>
        <div className={styles.content}>
          <div className={styles.title}>
            <h2>Notes</h2>
            <button className={styles.button} onClick={() => handleToggleModal(true)} title="Create New Note">
              +
            </button>
          </div>
          <div className={styles.list}>
            {filteredCards.map(({ _id, title, content }, i) => (
              <Card key={`card-${i}`} _id={_id} title={title} content={content} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
