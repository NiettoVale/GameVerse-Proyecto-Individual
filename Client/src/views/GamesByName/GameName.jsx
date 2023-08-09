import React from "react";
import { Link, useLocation } from "react-router-dom";
import Cards from "../../components/cards/Cards";

const GameName = () => {
  const location = useLocation();
  const searchGames = location.state.searchGames;
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
