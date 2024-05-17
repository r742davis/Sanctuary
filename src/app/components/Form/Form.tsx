import { EditableField } from "@components";
import useForm from "lib/hooks/useForm";
import styles from "./Form.module.css";
import { Note } from "lib/note-api";
import { sanitizeAndValidateInput } from "lib/validation";
import { useState } from "react";
import classNames from "classnames";

export default function Form({ onSubmit }: { onSubmit: (newNote: Note) => void }) {
  const [error, setError] = useState<string | null>(null);
  const { values, handleChange, resetForm } = useForm<Note>({
    title: "",
    content: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, content } = values;

    try {
      const validTitle = sanitizeAndValidateInput(title, { fieldName: "title", minLength: 2 });
      const validContent = sanitizeAndValidateInput(content, { fieldName: "content" });

      if (validTitle && validContent) {
        onSubmit(values);
        resetForm();
        setError(null);
      }
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <EditableField name="title" className={styles["title"]} placeholder="Title" handleChange={handleChange} />
      <EditableField name="content" placeholder="Take a note..." handleChange={handleChange} />
      <div className={styles.container}>
        <p className={classNames(styles.error, { [styles["is-visible"]]: !!error })}>
          {error}
          <span className={styles.close} onClick={() => setError(null)}>
            &times;
          </span>
        </p>
        <button className={styles.button} type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}
