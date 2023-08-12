import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import styles from "./NavBar.module.css";

const NavBar = () => {
  /*
  Aca rendierizamos la barra de navegacion que contiene lo siguiente:

  * - Un boton que nos redirige a la landing.
  * - Un boton que nos redirige a un formulario para crear un nuevo videojuego.
  * - Un boton que nos redirige a una vista de los videojuegos que creo el usuario.
  * - Una barra de busqueda.

  */
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
