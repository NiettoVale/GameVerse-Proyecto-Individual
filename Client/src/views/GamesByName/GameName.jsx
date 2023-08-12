import React from "react";
import { Link, useLocation } from "react-router-dom";
import Cards from "../../components/cards/Cards";
import styles from "./GameName.module.css";

const GameName = () => {
  /*
  Usamos el hook useLocation el cual nos brinda informacion de la ruta actual.
  Y con "location.state.searchGames" obtenemops la informacion del estado que pasamos al navegar
  desde la searchBar y lo almacenamos en una variable.
  */

  const location = useLocation();
  const searchGames = location.state.searchGames;
  return (
    <div>
      {/* Creamos un boton para volver al home */}
      <Link to={"/home"}>
        <button className={styles.btnGame}>Volver al incio</button>
      </Link>
      {/* Mostramos un h1 con un titlo acorde a lo que hace el componente */}
      <h1 className={styles.titleGame}>Resultado de búsqueda: </h1>
      {/* Le pasamos los juegos encontrados al componente "Cards" para que los pueda renderizar adecuadamente. */}
      <Cards videogames={searchGames} />
    </div>
  );
};

export default GameName;
