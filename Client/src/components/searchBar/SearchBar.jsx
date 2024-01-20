import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2
import styles from "./SearchBar.module.css";

const get_videgameByName = process.env.REACT_APP_GET_VIDEOGAMEBYNAME;

const SearchBar = () => {
  const [searchName, setSearchName] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setSearchName(event.target.value);
  };

  const handleSearch = async () => {
    if (searchName.trim() !== "") {
      try {
        const response = await fetch(`${get_videgameByName}${searchName}`);
        const responseData = await response.json();

        if (response.status === 200) {
          navigate("/gameName", { state: { searchGames: responseData } });
        } else if (response.status === 404) {
          // Use SweetAlert2 for 404 errors
          Swal.fire({
            icon: "error",
            title: "Error",
            text: responseData.error,
          });
        }
      } catch (error) {
        // Use SweetAlert2 for general errors
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Algo salió mal!!!",
        });
        console.log(error.message);
      }
    } else {
      // Use SweetAlert2 for empty search name
      Swal.fire({
        icon: "warning",
        title: "Advertencia",
        text: "No ingresó ningún nombre!!!",
      });
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Ingrese el nombre del juego a buscar..."
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
