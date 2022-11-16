import React from "react";
import styles from "./Header.module.css";
import { BsFillMoonStarsFill, BsSun } from "react-icons/bs";
import { useDarkMode } from "../context/DarkModeContext";

export default function Header ({ filters, filter, onFilterChange })  {
  const { darkMode, toggleDarkMode } = useDarkMode();
  return (
    <header className={styles.header}>
      <ul className={styles.filters}>
        {filters.map((value, index) => (
          <li className={styles.li} key={index}>
            <button
              className={`${styles.filter} ${
                filter === value && styles.selected
              }`}
              onClick={() => onFilterChange(value)}
            >
              {value}
            </button>
          </li>
        ))}
      </ul>
      <div>
        <button className={styles.toggle} onClick={toggleDarkMode}>
          {!darkMode && <BsFillMoonStarsFill />}
          {darkMode && <BsSun />}
        </button>
      </div>
    </header>
  );
};
