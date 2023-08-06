import React from "react";
import Card from "../card/Card";
import styles from "./Cards.module.css";

const Cards = ({ videogames }) => {
  return (
    <div className={styles.contenedorCards}>
      {videogames.map(({ background_image, name, genres, id }) => {
        // Verificar si los géneros están disponibles antes de mostrarlos
        const genresToShow = genres.map((genre) => genre.name).join(", ");
        return (
          <Card
            key={id}
            image={background_image}
            name={name}
            genres={genresToShow}
            id={id}
          />
        );
      })}
    </div>
  );
};

export default Cards;
