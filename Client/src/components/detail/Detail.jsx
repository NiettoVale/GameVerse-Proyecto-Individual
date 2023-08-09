import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import styles from "./Detail.module.css";

const get_videogames = process.env.REACT_APP_GET_VIDEOGAMES;
const get_videogamesApi = process.env.REACT_APP_GET_VIDEOGAMESAPI;
const api_key = process.env.REACT_APP_API_KEY;
const deleteVideogame = process.env.REACT_APP_DELETE_VIDEOGAME;

const Detail = () => {
  const { id } = useParams();
  const [videogame, setVideogame] = useState({});
  const isUUID =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
  useEffect(() => {
    if (isUUID) {
      axios(`${get_videogames}/${id}`).then(({ data }) => {
        const dataVideogame = {
          id: data.id,
          name: data.name,
          background_image: data.background_image,
          platforms: data.platforms,
          description: data.description,
          released: data.released,
          rating: data.rating,
          genres: data.genres.map((genre) => genre).join(", "),
        };
        setVideogame(dataVideogame);
      });
    } else {
      axios(`${get_videogamesApi}/${id}${api_key}`).then(({ data }) => {
        const dataVideogame = {
          id: data.id,
          name: data.name,
          background_image: data.background_image,
          platforms: data.platforms
            .map((platform) => platform.platform.name)
            .join(", "),
          description: data.description,
          released: data.released,
          rating: data.rating,
          genres: data.genres.map((genre) => genre.name).join(", "),
        };
        setVideogame(dataVideogame);
      });
    }

    return () => setVideogame({});
  }, [isUUID, id]);

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`${deleteVideogame}/${id}`);
      window.alert(data.message); // Muestra la alerta con el mensaje del servidor
      // Redirige al usuario al inicio
      window.location.href = "/home";
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <div>
          <Link to={"/home"}>
            <button className={styles.buttonDetail}>Volver</button>
          </Link>
        </div>
        {isUUID ? (
          <div>
            <button className={styles.buttonDetail}>Editar</button>
            <button className={styles.buttonDetail} onClick={handleDelete}>
              Eliminar
            </button>
          </div>
        ) : (
          ""
        )}
        <p className={styles.attribute}>
          <span className={styles.attributesName}>ID:</span> {videogame.id}
        </p>{" "}
        <p className={styles.attribute}>
          <span className={styles.attributesName}>Nombre:</span>{" "}
          {videogame.name}
        </p>{" "}
        <p className={styles.attribute}>
          <span className={styles.attributesName}>Plataformas:</span>{" "}
          {videogame.platforms}
        </p>{" "}
        <p className={styles.attribute}>
          <span className={styles.attributesName}>Descripción:</span>{" "}
          {<span dangerouslySetInnerHTML={{ __html: videogame.description }} />}
          {/* {videogame.description} */}
        </p>{" "}
        <p className={styles.attribute}>
          <span className={styles.attributesName}>Fecha de lanzamiento:</span>{" "}
          {videogame.released}
        </p>{" "}
        <p className={styles.attribute}>
          <span className={styles.attributesName}>Rating:</span>{" "}
          {videogame.rating}
        </p>{" "}
        <p className={styles.attribute}>
          <span className={styles.attributesName}>Géneros:</span>{" "}
          {videogame.genres}
        </p>
        <img
          className={styles.image}
          src={videogame.background_image}
          alt={videogame.name}
        />
      </div>
    </div>
  );
};

export default Detail;
