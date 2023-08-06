import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <nav className={styles.navBar}>
      <Link to={"/"}>
        <button className={styles.navButton}>Landing</button>
      </Link>

      <Link to={"/form"}>
        <button className={styles.navButton}>Crear Videojuego</button>
      </Link>

      <Link to={"/createVideogames"}>
        <button className={styles.navButton}>Videojuegos Creados</button>
      </Link>

      <div className={styles.searchBarContainer}>
        <SearchBar />
      </div>
    </nav>
  );
};

export default NavBar;
