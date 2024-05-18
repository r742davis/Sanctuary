import { useState } from "react";
import classNames from "classnames";
import { EditableField } from "@components";
import { Note, sanitizeAndValidateInput, useForm } from "@lib";
import styles from "./Form.module.css";

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
