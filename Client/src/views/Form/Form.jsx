import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Form.module.css";
import styles from "./Form.module.css";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    platforms: "",
    background_image: "",
    released: "",
    rating: "",
    genres: [], // Cambiamos el estado del género a un array vacío
  });

  const [genresList, setGenresList] = useState([]);

  // Función para manejar cambios en los campos de entrada y selección
  const handleChange = (event) => {
    const { name, value } = event.target;

    // Si es el campo de selección de géneros, convertimos los valores seleccionados en un array
    if (name === "genres") {
      const selectedGenres = Array.from(
        event.target.selectedOptions,
        (option) => option.value
      );
      setFormData((prevData) => ({
        ...prevData,
        [name]: selectedGenres,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    // Obtener los géneros desde la URL proporcionada
    axios.get("http://localhost:3001/genres").then((response) => {
      setGenresList(response.data);
    });
  }, []);

  // Función para manejar el envío del formulario
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      // Convertimos rating a un número
      const newVideogame = {
        ...formData,
        rating: parseInt(formData.rating),
      };

      // Enviamos el género seleccionado como un array en lugar de una cadena de texto
      const { data } = await axios.post(
        "http://localhost:3001/videogames",
        newVideogame
      );

      alert(data);
    } catch (error) {
      alert("Hubo un error!!!");

      console.log(error);
    }
  };

  return (
    <div className={styles.containerPrincipal}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <Link to={"/home"}>
          <button className={styles.goBackButton}>Volver</button>
        </Link>
        <label>
          Nombre:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Descripción:
          <input
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Plataformas:
          <input
            type="text"
            name="platforms"
            value={formData.platforms}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Imagen de fondo:
          <input
            type="text"
            name="background_image"
            value={formData.background_image}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Fecha de lanzamiento:
          <input
            type="text"
            name="released"
            value={formData.released}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Rating:
          <input
            type="text"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Géneros:
          <select name="genres" value={formData.genres} onChange={handleChange}>
            <option value="">Seleccionar género</option>
            {genresList.map((genre, index) => (
              <option key={index} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button className={styles.createBtn}>Crear Juego</button>
      </form>
    </div>
  );
};

export default Form;
