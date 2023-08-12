import React from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";

const Card = ({ image, name, genres, id, rating }) => {
  // Destructuramos las props que nos llegan desde el componente Cards
  return (
    <div className={styles.cardContainer}>
      {/* Creamos una etiqueta img para mostrar la imagen que nos viene por props */}
      {image ? (
        <img src={image} alt={name} className={styles.imgCard} />
      ) : (
        <img
          src="https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif"
          alt="cargando..."
        />
      )}

      {/* Luego creamos tres etiquetas <p> para mostrar informacion relevante acerca del juego */}
      <p>Nombre: {name}</p>
      <p>Géneros: {genres}</p>
      <p>Rating: {rating}</p>

      {/* Creamos un boton para que nos lleve al detalle de ese videojuego usando la etiqueta Link */}
      <Link to={`/detail/${id}`}>
        <button className={styles.detailLink}>Ver detalles</button>
      </Link>
    </div>
  );
};

export default Card;
