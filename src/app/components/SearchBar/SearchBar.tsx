import { PropsWithChildren } from "react";
import styles from "./SearchBar.module.css";

type SearchBarProps = {} & PropsWithChildren;

export default function SearchBar({ children }: SearchBarProps) {
  return <div className={styles.search}>{children}</div>;
}