import classNames from "classnames";
import styles from "./EditableField.module.css";

type EditableFieldProps = {
  className?: string;
  placeholder?: string;
  name: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export default function EditableField({
  className = "",
  placeholder = "Add text...",
  name,
  handleChange,
}: EditableFieldProps) {
  return (
    <textarea
      className={classNames(styles["editable__content"], { [className]: !!className })}
      contentEditable="true"
      aria-multiline="true"
      role="textbox"
      aria-label={placeholder}
      placeholder={placeholder}
      name={name}
      spellCheck="true"
      onChange={(e) => handleChange(e)}
    />
  );
}
