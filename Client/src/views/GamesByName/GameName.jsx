import React from "react";
import { Link, useLocation } from "react-router-dom";
import Cards from "../../components/cards/Cards";

const GameName = () => {
  const location = useLocation();
  const searchGames = location.state.searchGames;
  console.log("Este es el arreglo buscado: ", searchGames[0]);
  return (
    <div>
      <Link to={"/home"}>
        <button>Volver al incio</button>
      </Link>
      <h1>Resultado de búsqueda: </h1>
      <Cards videogames={searchGames} />
    </div>
  );
};

export default GameName;
