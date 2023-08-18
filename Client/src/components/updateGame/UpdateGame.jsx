import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./UpdateGame.module.css";

const UpdateGame = () => {
  // usamos el hook "useLocation" para obtener informacion de la ruta en la que estamos.
  const location = useLocation();

  //  Accedemos al estado del objeto lacation y extraemos la propiedad id.
  const id = location.state.id;

  // Creamos un estado local para almacenar la info del formulario
  const [gameData, setGameData] = useState({
    name: "",
    platforms: "",
    description: "",
    released: "",
    rating: "",
  });

  // Creamos un estado local para almacenar los errores.

  // Creamos una funcion que manja los cambios en los inputs.
  const handleChange = (event) => {
    // Hacemos la destructuracion de name y value de "target"
    const { name, value } = event.target;

    // Seteamos el cambio correspondiente.
    setGameData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Creamos una funcion que maneja el envio del form.
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      // Realizamos una petición al backend:
      const response = await fetch(`http://localhost:3001/videogames/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gameData),
      });
      // Extraemos los datos de la respuesta en json.
      const responseData = await response.json();

      // Verificamos el estado de la respuesta y mostramos el mensaje.
      if (response.status === 200) {
        alert(responseData.message);
      } else if (response.status === 500) {
        alert(responseData.message);
      }
    } catch (error) {
      // Si hubo algun error lo informamos.
      alert("Algo salió mal!!!");
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
            onChange={handleChange}
          />

          <label className={styles.label}>Plataformas:</label>
          <input
            className={styles.input}
            type="text"
            name="platforms"
            value={gameData.platforms}
            onChange={handleChange}
          />

          <label className={styles.label}>Descripción:</label>
          <textarea
            className={styles.textarea}
            name="description"
            value={gameData.description}
            onChange={handleChange}
          />

          <label className={styles.label}>Fecha de lanzamiento:</label>
          <input
            className={styles.input}
            type="date"
            name="released"
            value={gameData.released}
            onChange={handleChange}
          />

          <label className={styles.label}>Rating:</label>
          <input
            className={styles.input}
            type="number"
            name="rating"
            value={gameData.rating}
            onChange={handleChange}
            min="1"
            max="10"
            step="1"
          />

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
