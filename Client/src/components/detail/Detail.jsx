import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2
import styles from "./Detail.module.css";

import editIcon from "../../image/editar.png";
import deleteIcon from "../../image/eliminar.png";
import volverIcon from "../../image/volver.png";

// importamos los datos necesarios para trabajar a traves de variables de entornos:
const get_videogames = process.env.REACT_APP_GET_VIDEOGAMES;
const get_videogamesApi = process.env.REACT_APP_GET_VIDEOGAMESAPI;
const api_key = process.env.REACT_APP_API_KEY;
const deleteVideogame = process.env.REACT_APP_DELETE_VIDEOGAME;

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [videogame, setVideogame] = useState({});

  const isUUID =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

  useEffect(() => {
    if (isUUID) {
      axios(`${get_videogames}/${id}`).then(({ data }) => {
        setVideogame(data);
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
  }, [isUUID, id]);

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`${deleteVideogame}/${id}`);

      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: data.message,
      });

      navigate("/createVideogames");
      window.location.reload();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Algo salió mal!!!",
      });
      console.log(error.message);
    }
  };

  const handleUpdate = () => {
    navigate("/updategame", { state: { id } });
  };

  return (
    <div className={styles.pageContainer}>
      {videogame.id ? (
        <div className={styles.container}>
          <div className={styles.topButtons}>
            <Link to={"/home"} className={styles.link}>
              <button className={styles.buttonDetail}>
                <img className={styles.icon} src={volverIcon} alt="volver" />
                Volver
              </button>
            </Link>
            {isUUID ? (
              <div className={styles.btnContainer}>
                <button className={styles.buttonDetail} onClick={handleUpdate}>
                  <img className={styles.icon} src={editIcon} alt="Editar" />
                  Editar
                </button>
                <button className={styles.buttonDetail} onClick={handleDelete}>
                  <img
                    className={styles.icon}
                    src={deleteIcon}
                    alt="Eliminar"
                  />
                  Eliminar
                </button>
              </div>
            ) : null}
          </div>
          <p className={styles.attribute}>
            <span className={styles.attributesName}>ID:</span> {videogame.id}
          </p>
          <p className={styles.attribute}>
            <span className={styles.attributesName}>Nombre:</span>{" "}
            {videogame.name}
          </p>
          <p className={styles.attribute}>
            <span className={styles.attributesName}>Plataformas:</span>{" "}
            {videogame.platforms}
          </p>
          <p className={styles.attribute}>
            <span className={styles.attributesName}>Descripción:</span>{" "}
            <span dangerouslySetInnerHTML={{ __html: videogame.description }} />
          </p>
          <p className={styles.attribute}>
            <span className={styles.attributesName}>Fecha de lanzamiento:</span>{" "}
            {videogame.released}
          </p>
          <p className={styles.attribute}>
            <span className={styles.attributesName}>Rating:</span>{" "}
            {videogame.rating}
          </p>
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
      ) : (
        <img
          src="https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif"
          alt="Cargando..."
        />
      )}
    </div>
  );
};

export default Detail;

// import React, { useEffect, useState } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import styles from "./Detail.module.css";

// import editIcon from "../../image/editar.png";
// import deleteIcon from "../../image/eliminar.png";
// import volverIcon from "../../image/volver.png";

// // importamos los datos necesarios para trabajar a traves de variables de entornos:
// const get_videogames = process.env.REACT_APP_GET_VIDEOGAMES;
// const get_videogamesApi = process.env.REACT_APP_GET_VIDEOGAMESAPI;
// const api_key = process.env.REACT_APP_API_KEY;
// const deleteVideogame = process.env.REACT_APP_DELETE_VIDEOGAME;

// const Detail = () => {
//   // Obtenemos la  propiedad "id" de la URL a traves del hook useParams:
//   const { id } = useParams();
//   const navigate = useNavigate();
//   // Creamos un estado local para almacenar la informacion del videojuego que buscamos a partir de su "id"
//   const [videogame, setVideogame] = useState({});

//   /*
//   Usamos una regex para validar si el "id" es un "UUID" para saber a que lugar hacemos una peticion.
//   Si resulta true hacemos una peticion a la base de datos, caso contrario a la API.
//   */
//   const isUUID =
//     /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

//   useEffect(() => {
//     // Aca se verifica su valor booleano para saber a donde hacer la peticion:
//     if (isUUID) {
//       // Mediante axios realizamos una solicitud al backend:
//       axios(`${get_videogames}/${id}`).then(({ data }) => {
//         /*
//         A partir de la respuesta obtenida por el servidor seteamos
//         la informacion del juego en el estado "videogame".
//         */
//         setVideogame(data);
//       });
//     } else {
//       /*
//       En este caso "isUUID" da false por lo cual hacemos una peticion a la API
//       y realizamos el mismo proceso anteriormente mencionado.
//       */
//       axios(`${get_videogamesApi}/${id}${api_key}`).then(({ data }) => {
//         const dataVideogame = {
//           id: data.id,
//           name: data.name,
//           background_image: data.background_image,
//           platforms: data.platforms
//             .map((platform) => platform.platform.name)
//             .join(", "), // en este caso "platforms" viene como un arreglo de objetos, por lo cual lo mapeamos
//           // y unimos la propiedad "name" como un string de muchas plataformas.
//           description: data.description,
//           released: data.released,
//           rating: data.rating,
//           genres: data.genres.map((genre) => genre.name).join(", "), // Realizamos lo mismo que con las plataformas.
//         };
//         setVideogame(dataVideogame);
//       });
//     }
//   }, [isUUID, id]);

//   const handleDelete = async () => {
//     // Este manejador nos permite eliminar un juego desde la base de datos
//     try {
//       // Hacemos una una peticion de tipo delete al backend.
//       const { data } = await axios.delete(`${deleteVideogame}/${id}`);

//       alert(data.message); // Muestra la alerta con el mensaje que nos devuelve el servidor

//       // Redirigimos al usuario al "home" y recargamos de nuevo la pagina para hacer definitiva la eliminacion
//       navigate("/createVideogames");
//       window.location.reload();
//     } catch (error) {
//       // Mostramos si hubo un error por consola.
//       alert("Algo salio mal!!!");
//       console.log(error.message);
//     }
//   };

//   const handleUpdate = async () => {
//     navigate("/updategame", { state: { id } });
//   };

//   return (
//     <div className={styles.pageContainer}>
//       {/* Verifico si es un UUID o un ID, para ver si muestro algunos botones extra o no */}

//       {videogame.id ? (
//         <div className={styles.container}>
//           <div className={styles.topButtons}>
//             <Link to={"/home"} className={styles.link}>
//               <button className={styles.buttonDetail}>
//                 <img className={styles.icon} src={volverIcon} alt="volver" />
//                 Volver
//               </button>
//             </Link>
//             {isUUID ? (
//               <div className={styles.btnContainer}>
//                 <button className={styles.buttonDetail} onClick={handleUpdate}>
//                   <img className={styles.icon} src={editIcon} alt="Editar" />
//                   Editar
//                 </button>
//                 <button className={styles.buttonDetail} onClick={handleDelete}>
//                   <img
//                     className={styles.icon}
//                     src={deleteIcon}
//                     alt="Eliminar"
//                   />
//                   Eliminar
//                 </button>
//               </div>
//             ) : // En caso de que sea un "id" comun no hacemos nada.
//             null}
//           </div>
//           {/* Mostramos mas informacion sobre el videojuego elegido */}
//           <p className={styles.attribute}>
//             <span className={styles.attributesName}>ID:</span> {videogame.id}
//           </p>
//           <p className={styles.attribute}>
//             <span className={styles.attributesName}>Nombre:</span>{" "}
//             {videogame.name}
//           </p>
//           <p className={styles.attribute}>
//             <span className={styles.attributesName}>Plataformas:</span>{" "}
//             {videogame.platforms}
//           </p>
//           <p className={styles.attribute}>
//             <span className={styles.attributesName}>Descripción:</span>{" "}
//             <span dangerouslySetInnerHTML={{ __html: videogame.description }} />
//           </p>
//           <p className={styles.attribute}>
//             <span className={styles.attributesName}>Fecha de lanzamiento:</span>{" "}
//             {videogame.released}
//           </p>
//           <p className={styles.attribute}>
//             <span className={styles.attributesName}>Rating:</span>{" "}
//             {videogame.rating}
//           </p>
//           <p className={styles.attribute}>
//             <span className={styles.attributesName}>Géneros:</span>{" "}
//             {videogame.genres}
//           </p>
//           <img
//             className={styles.image}
//             src={videogame.background_image}
//             alt={videogame.name}
//           />
//         </div>
//       ) : (
//         // En caso de que videogame no contenga la info necesaria para ser mostrada, mostramos un gif de carga
//         <img
//           src="https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif"
//           alt="Cargando..."
//         />
//       )}
//     </div>
//   );
// };

// export default Detail;
