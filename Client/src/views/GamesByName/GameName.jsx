import React, { useEffect, useState } from "react";
import Cards from "../../components/cards/Cards";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const GameName = () => {
  // Obtener el estado de la ruta con el nombre enviado desde SearchBar
  const location = useLocation();
  const { name } = location.state;

  const [videogames, setVideogames] = useState([]);

  // Define la función para obtener los videojuegos con el nombre proporcionado
  const getVideogames = async (searchName) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/videogames/name?name=${searchName}`
      );

      setVideogames(data);
    } catch (error) {
      console.error("Error al obtener los videojuegos:", error);
    }
  };

  // Llama a getVideogames una vez que el componente se haya montado
  useEffect(() => {
    getVideogames(name);
  }, [name]);
  return (
    <div>
      <Link to={"/home"}>
        <button>Volver</button>
      </Link>
      <Cards videogames={videogames} />
    </div>
  );
};

export default GameName;
