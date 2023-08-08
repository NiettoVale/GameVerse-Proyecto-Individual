import React, { useState } from "react";
import styles from "./SearchBar.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchName, setSearchName] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setSearchName(event.target.value);
  };

  const handleSearch = async () => {
    if (searchName.trim() !== "") {
      try {
        const response = await axios.get(
          `http://localhost:3001/videogames/name?name=${searchName}`
        );

        console.log("Este es la data: ", response.data);
        // Redirigir utilizando navigate y pasar props como parámetros
        navigate("/gameName", { state: { searchGames: response.data } });
      } catch (error) {
        if (error.response && error.response.status === 404) {
          alert("No se encontraron videojuegos con ese nombre.");
          // Manejar la respuesta cuando no se encuentren juegos
          // Puedes mostrar un mensaje o realizar la acción que desees
        } else {
          console.error("Error fetching data:", error);
        }
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Ingrese el nombre a buscar..."
        className={styles.searchInput}
        value={searchName}
        onChange={handleChange}
      />

      <button className={styles.searchButton} onClick={handleSearch}>
        Buscar
      </button>
    </div>
  );
};

export default SearchBar;

//! Version 2:
// import React, { useState } from "react";
// import styles from "./SearchBar.module.css";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import GameName from "../../views/GamesByName/GameName";

// const SearchBar = () => {
//   const [searchName, setSearchName] = useState("");
//   const [searchResults, setSearchResults] = useState([]); // Para almacenar los resultados de búsqueda

//   const handleChange = (event) => {
//     setSearchName(event.target.value);
//   };

//   const handleSearch = async () => {
//     if (searchName.trim() !== "") {
//       try {
//         const response = await axios.get(
//           `http://localhost:3001/videogames/name?name=${searchName}`
//         );
//         console.log("Soy la respuesta del la searchBar: ", response.data);
//         setSearchResults(response.data); // Almacena los resultados en el estado
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     }
//   };
//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Ingrese el nombre a buscar..."
//         className={styles.searchInput}
//         value={searchName}
//         onChange={handleChange}
//       />

//       <Link to={"/gameName"}>
//         <button className={styles.searchButton} onClick={handleSearch}>
//           Buscar
//         </button>

//         <GameName searchGames={searchResults} />
//       </Link>
//     </div>
//   );
// };

// export default SearchBar;

//! Otra version:
// import React, { useState } from "react";
// import styles from "./SearchBar.module.css";

// const SearchBar = () => {
//   const [name, setName] = useState("");

//   const handleChange = (event) => {
//     setName(event.target.value);
//   };

//   const isButtonDisabled = name.trim() === "";
//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Ingrese el nombre a buscar..."
//         className={styles.searchInput}
//         value={name}
//         onChange={handleChange}
//       />

//       <button className={styles.searchButton} disabled={isButtonDisabled}>
//         Buscar
//       </button>
//     </div>
//   );
// };

// export default SearchBar;
