"use client";

import { useState } from "react";
import classNames from "classnames";
import styles from "./SearchBar.module.css";

export type SearchBarProps = {
  placeholder?: string;
  handleSubmit: (keyword: string) => void;
};

export default function SearchBar({ handleSubmit, placeholder = "Search" }: SearchBarProps) {
  const [searchInput, setSearchInput] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") return handleSubmit(searchInput);
  };

  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        value={searchInput}
        placeholder={placeholder}
        onChange={(e) => handleInputChange(e)}
        onKeyDown={(e) => handleKeyDown(e)}
      />
      <button
        className={classNames(styles.button, {
          [styles["is-visible"]]: !!searchInput,
        })}
        onClick={(e) => handleSubmit(searchInput)}
        title="Submit"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M10.5858 6.34317L12 4.92896L19.0711 12L12 19.0711L10.5858 17.6569L16.2427 12L10.5858 6.34317Z"
            fill="currentColor"
          />
        </svg>
      </button>
    </div>
  );
}
