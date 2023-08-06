import React from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";

const Card = ({ image, name, genres, id }) => {
  return (
    <div className={styles.cardContainer}>
      <img src={image} alt={name} />

      <p>Nombre: {name}</p>
      <p className={styles.genres}>Géneros: {genres}</p>

      <Link to={`/detail/${id}`}>
        <button className={styles.detailLink}>Ver detalles</button>
      </Link>
    </div>
  );
};

export default Card;
// import React from "react";
// import { Link } from "react-router-dom";
// import styles from "./Card.module.css";

// const Card = ({ image, name, genres, id }) => {
//   return (
//     <div className={styles.contenedorCard}>
//       <div className={styles.imageContainer}>
//         <Link to={`/detail/${id}`}>
//           <img src={image} alt={name} className={styles.image} />
//         </Link>
//       </div>

//       <p>Nombre: {name}</p>

//       <p>Generos: {genres}</p>
//     </div>
//   );
// };

// export default Card;
