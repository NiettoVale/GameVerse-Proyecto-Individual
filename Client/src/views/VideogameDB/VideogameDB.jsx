import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Cards from "../../components/cards/Cards";
import styles from "./VideogameDB.module.css";
import { obtenerVideojuegosDB } from "../../redux/actions";

const VideoGamesComponent = () => {
  const data = useSelector((state) => state.videogamesDB);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(obtenerVideojuegosDB());
  }, [dispatch]);
  return (
    <div>
      {data.length === 0 ? (
        <div>
          <p>No se crearon videojuegos.</p>
          <Link to={"/form"}>
            <button>Crear videojuego</button>
          </Link>
        </div>
      ) : (
        <div>
          <div className={styles.headerContainer}>
            <h1>VIDEOJUEGOS CREADOS:</h1>
            <Link to={"/home"}>
              <button className={styles.btnDB}>Volver</button>
            </Link>
          </div>
          <Cards videogames={data} />
        </div>
      )}
    </div>
  );
};

export default VideoGamesComponent;
