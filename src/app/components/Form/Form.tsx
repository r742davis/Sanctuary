import { useState } from "react";
import classNames from "classnames";
import { EditableField } from "@components";
import { Note, sanitizeAndValidateInput, useForm } from "@lib";
import styles from "./Form.module.css";

export default function Form({
  initialValues,
  onSubmit,
}: {
  initialValues?: { title?: string; content?: string };
  onSubmit: (note: Pick<Note, "title" | "content">) => void;
}) {
  const [error, setError] = useState<string | null>(null);
  const { values, handleChange, resetForm } = useForm<Pick<Note, "title" | "content">>({
    title: initialValues?.title ?? "",
    content: initialValues?.content ?? "",
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
      <EditableField
        name="title"
        className={styles["title"]}
        placeholder="Title"
        value={initialValues?.title}
        handleChange={handleChange}
      />
      <EditableField
        name="content"
        placeholder="Take a note..."
        value={initialValues?.content}
        handleChange={handleChange}
      />
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
