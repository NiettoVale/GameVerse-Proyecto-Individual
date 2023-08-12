import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SearchBar.module.css";
const get_videgameByName = process.env.REACT_APP_GET_VIDEOGAMEBYNAME;

const SearchBar = () => {
  // Creamos un estado local para almacenar el nombre de los juegos a buscar.
  const [searchName, setSearchName] = useState("");
  // Usamos el hook useNavigate para poder navegar entre las rutas y enviarle informacion.
  const navigate = useNavigate();

  // creamos un manejador para controlar los cambios que se hagan en el input de la barra de busqueda.
  const handleChange = (event) => {
    // Seteamos dicho valor en el "searchName"
    setSearchName(event.target.value);
  };

  // Creamos un manejador de la busqueda el cual va a realizar la peticion al backend.
  const handleSearch = async () => {
    if (searchName.trim() !== "") {
      try {
        const response = await fetch(`${get_videgameByName}${searchName}`); // hacemos la peticion al backend
        const responseData = await response.json(); // extraemos los datos del cuerpo de la respuesta usando .json()

        // Preguntamos si el estado de la peticion es 200, si es asi nos movemos a la ruta "gameName"
        // y le pasamos la info de los juegos
        if (response.status === 200) {
          navigate("/gameName", { state: { searchGames: responseData } });
        } else if (response.status === 404) {
          // En caso de que sea un 404 mostramos en un alert el mensaje del servidor
          alert(responseData.error);
        }
      } catch (error) {
        // Manejamos otro error que se pueda presentar.
        alert("Error en el servidor");
        console.log(error.message);
      }
    }
  };

  return (
    <div>
      {/* Generamos un input para ingresar el nombre del juego a buscar:  */}
      <input
        type="text"
        placeholder="Ingrese el nombre a buscar..."
        className={styles.searchInput}
        value={searchName}
        onChange={handleChange}
      />

      {/* Usamos este boton para hacer la peticion al backend */}
      <button className={styles.searchButton} onClick={handleSearch}>
        Buscar
      </button>
    </div>
  );
};

export default SearchBar;
