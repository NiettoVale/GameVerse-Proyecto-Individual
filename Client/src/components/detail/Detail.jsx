import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import styles from "./Detail.module.css";

const Detail = () => {
  const { id } = useParams();
  const [videogame, setVideogame] = useState({});

  useEffect(() => {
    const isUUID =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        id
      );
    if (isUUID) {
      axios(`http://localhost:3001/videogames/${id}`).then(({ data }) => {
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
      axios(
        `https://api.rawg.io/api/games/${id}?key=aeb12d6781774ed69cb910c7ad69b389&dates=2019-09-01,2023-05-30&platforms=18,1,7`
      ).then(({ data }) => {
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
  }, [id]);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <div>
          <Link to={"/home"}>
            <button className={styles.button}>Volver</button>
          </Link>
        </div>
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
