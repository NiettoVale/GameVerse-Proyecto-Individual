import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./UpdateGame.module.css";
import validateGame from "./validationGame";

const UpdateGame = () => {
  const location = useLocation();
  const id = location.state.id;

  const [gameData, setGameData] = useState({
    name: "",
    platforms: "",
    description: "",
    released: "",
    rating: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setGameData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors(
      validateGame({
        ...gameData,
        [name]: value,
      })
    );
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      console.log("Datos a enviar:", gameData);

      // Realizar la petición al servidor
      const response = await fetch(`http://localhost:3001/videogames/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gameData),
      });
      const responseData = await response.json();

      console.log("Esta es la respones:");
      console.log(responseData);
      console.log("Esta es la gameData:");
      console.log(gameData);

      if (response.status === 200) {
        alert(responseData.message);
      } else if (response.status === 500) {
        alert(responseData.message);
      }
    } catch (error) {
      alert("Error del servidor!!!");
      console.log(error);
    }
  };
  return (
    <div className={styles.containerPrincipal}>
      <div className={styles.formContainer}>
        <h2>Actualizando el juego de id: </h2>
        <h2 className={styles.id}>{id}</h2>
        <form onSubmit={handleSubmit}>
          <label className={styles.label}>Nombre:</label>
          <input
            className={styles.input}
            type="text"
            name="name"
            value={gameData.name}
            onChange={handleInputChange}
          />
          {errors.name && <p className={styles.error}>{errors.name}</p>}

          <label className={styles.label}>Plataformas:</label>
          <input
            className={styles.input}
            type="text"
            name="platforms"
            value={gameData.platforms}
            onChange={handleInputChange}
          />

          <label className={styles.label}>Descripción:</label>
          <textarea
            className={styles.textarea}
            name="description"
            value={gameData.description}
            onChange={handleInputChange}
          />

          <label className={styles.label}>Fecha de lanzamiento:</label>
          <input
            className={styles.input}
            type="date"
            name="released"
            value={gameData.released}
            onChange={handleInputChange}
          />

          <label className={styles.label}>Rating:</label>
          <input
            className={styles.input}
            type="number"
            name="rating"
            value={gameData.rating}
            onChange={handleInputChange}
            min="1"
            max="10"
            step="1"
          />
          {errors.rating && <p className={styles.error}>{errors.rating}</p>}

          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.btnUpdate}>
              Actualizar
            </button>
            <Link to={"/home"}>
              <button type="submit" className={styles.btnUpdate}>
                Volver
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateGame;
