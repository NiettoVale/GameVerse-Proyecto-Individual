import React from "react";
import Card from "../card/Card";
import styles from "./Cards.module.css";

const Cards = ({ videogames }) => {
  // Destructuramos "videogames" que nos viene por props
  return (
    <div className={styles.contenedorCards}>
      {videogames.map(({ background_image, name, genres, id, rating }) => {
        /* 
        Aca recorremos el arreglo "videogames" con un .map y destructuramos la info que necesitamos.
        Luego creamos una variable llamada "genresToShow (generos para mostrar) la cual me va a convertir el arreglo
        a una cadena de caracteres con todos los generos seperados por comas.
        */
        const genresToShow = genres
          ? genres.map((genre) => genre.name).join(", ")
          : "Géneros no disponibles";

        // Finalmente devolvemos el componente Card con la info necesaria.
        return (
          <Card
            key={id}
            image={background_image}
            name={name}
            genres={genresToShow}
            id={id}
            rating={rating}
          />
        );
      })}
    </div>
  );
};

export default Cards;
