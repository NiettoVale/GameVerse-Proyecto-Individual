import React from "react";
import Card from "../card/Card";
import styles from "./Cards.module.css";

const Cards = ({ videogames }) => {
  console.log(videogames[0]);
  return (
    <div className={styles.contenedorCards}>
      {videogames.map(({ background_image, name, genres, id }) => {
        const genresToShow = genres
          ? genres.map((genre) => genre.name).join(", ")
          : "Géneros no disponibles";

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
