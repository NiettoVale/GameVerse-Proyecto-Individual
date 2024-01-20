import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { obtenerGeneros, obtenerVideojuegosDB } from "../../redux/actions";
import axios from "axios";
import styles from "./Form.module.css";
import validateForm from "./validation";
import Swal from "sweetalert2";

const post_videogames = process.env.REACT_APP_POST_VIDEOGAMES;

const Form = () => {
  const gamesDataBase = useSelector((state) => state.videogamesDB);
  const genresList = useSelector((state) => state.genres);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    platforms: "",
    background_image: "",
    released: "",
    rating: "",
    genres: [],
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (event) => {
    const { name, value, selectedOptions } = event.target;

    if (name === "genres") {
      const selectedGenres = Array.from(
        selectedOptions,
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

    setFormErrors(validateForm({ ...formData, [name]: value }));
  };

  useEffect(() => {
    dispatch(obtenerGeneros());
    dispatch(obtenerVideojuegosDB());
  }, [dispatch]);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const newVideogame = {
        ...formData,
        rating: parseFloat(formData.rating),
      };

      let exist = false;

      gamesDataBase.forEach(({ name }) => {
        if (name === formData.name) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Ya hay un juego con ese nombre",
          });
          exist = true;
        }
      });

      if (!exist) {
        const { data } = await axios.post(`${post_videogames}`, newVideogame);
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: data,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error!!!",
      });
      console.log(error.message);
    }
  };

  const areAllFieldsFilled = () => {
    const requiredFields = [
      "name",
      "description",
      "platforms",
      "background_image",
      "released",
      "rating",
      "genres",
    ];

    const isGenreNotEmpty = formData["genres"].length > 0;

    return requiredFields.every((field) => {
      if (field === "genres") {
        return isGenreNotEmpty;
      }
      return formData[field] !== "";
    });
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
        {formErrors.name && <p className={styles.error}>{formErrors.name}</p>}

        <br />
        <label>
          Descripción:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        {formErrors.description && (
          <p className={styles.error}>{formErrors.description}</p>
        )}

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
        {formErrors.platforms && (
          <p className={styles.error}>{formErrors.platforms}</p>
        )}

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
        {formErrors.background_image && (
          <p className={styles.error}>{formErrors.background_image}</p>
        )}

        <br />

        <label>
          Fecha de lanzamiento:
          <input
            type="date"
            name="released"
            value={formData.released}
            onChange={handleChange}
          />
        </label>
        {formErrors.released && (
          <p className={styles.error}>{formErrors.released}</p>
        )}

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
        {formErrors.rating && (
          <p className={styles.error}>{formErrors.rating}</p>
        )}

        <br />

        <label>
          Géneros:
          <select
            name="genres"
            value={formData.genres}
            onChange={handleChange}
            multiple
          >
            <option value="">Seleccionar género</option>
            {genresList.map((genre, index) => (
              <option key={index} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </label>

        <br />

        <button
          className={`${styles.createBtn} ${
            !areAllFieldsFilled() ? styles.disabled : ""
          }`}
          disabled={!areAllFieldsFilled()}
        >
          Crear Juego
        </button>
      </form>
    </div>
  );
};

export default Form;
