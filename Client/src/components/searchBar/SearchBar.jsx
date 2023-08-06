import React, { useState } from "react";
import styles from "./SearchBar.module.css";
import { Link, useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSearch = () => {
    // Redireccionar a la ruta "/gameName" y pasar el nombre como estado de la ruta.
    navigate("/gameName", { state: { name } });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Ingrese el nombre a buscar..."
        className={styles.searchInput}
        value={name}
        onChange={handleChange}
      />

      {/* Llamar a handleSearch cuando se hace clic en el botón */}
      <button className={styles.searchButton} onClick={handleSearch}>
        Buscar
      </button>
    </div>
  );
};

export default SearchBar;
