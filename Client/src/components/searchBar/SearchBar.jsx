import React from "react";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
  return (
    <div>
      <input
        type="text"
        placeholder="Ingrese el nombre a buscar..."
        className={styles.searchInput}
      />
      <button className={styles.searchButton}>Buscar</button>
    </div>
  );
};

export default SearchBar;
