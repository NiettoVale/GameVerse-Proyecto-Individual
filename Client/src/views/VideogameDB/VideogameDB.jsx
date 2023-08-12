import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Cards from "../../components/cards/Cards";
import styles from "./VideogameDB.module.css";
import { obtenerVideojuegosDB } from "../../redux/actions";

const VideoGamesComponent = () => {
  // Traemos del estado global los videojuegos almacenados en la DB.
  const data = useSelector((state) => state.videogamesDB);
  // Accedemos a la funcion "dispatch" de redux, la cual nos permite despachar acciones.
  const dispatch = useDispatch();

  // Utilizamos el hook useEffect para realizar una acción cuando el componente se monta.
  useEffect(() => {
    // Hacemos un dispatch de la acción obtenerVideojuegosDB() para obtener videojuegos de la base de datos.
    dispatch(obtenerVideojuegosDB());
  }, [dispatch]); // Agregamos dispatch como dependencia porque se utiliza en el efecto.

  return (
    <div>
      {/* Verificamos si hay juegos, en caso de que no, mostramos un mensaje diciendo que no hay juegos */}
      {data.length === 0 ? (
        <div className={styles.container}>
          <Link to={"/form"}>
            <button className={styles.btn}>Crear videojuego</button>
          </Link>
        </div>
      ) : (
        // En el caso de que haya algún juego los mostramos
        <div>
          <div className={styles.headerContainer}>
            <h1>VIDEOJUEGOS CREADOS:</h1>
            <Link to={"/home"}>
              <button className={styles.btnDB}>Volver</button>
            </Link>
          </div>
          {/* pasamos los juegos al componente Cards para renderizar los juegos */}
          <Cards videogames={data} />
        </div>
      )}
    </div>
  );
};

export default VideoGamesComponent;
