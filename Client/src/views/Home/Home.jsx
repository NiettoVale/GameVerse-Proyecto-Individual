import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "../../components/navBar/NavBar";
import Cards from "../../components/cards/Cards";
import styles from "./Home.module.css";
import {
  obtenerVideojuegos,
  sortvideogamesByName,
  sortvideogamesByRating,
} from "../../redux/actions";
import { SET_PAGINA_ACTUAL } from "../../redux/action-types";

const Home = () => {
  const [paginaActual, setPaginaActual] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const videogames = useSelector((state) => state.videogames);
  const totalPaginas = useSelector((state) => state.totalPaginas);
  const dispatch = useDispatch();

  const handleSortByName = (ascendente) => {
    dispatch(sortvideogamesByName(ascendente));
  };

  const handleSortByRating = (ascendente) => {
    dispatch(sortvideogamesByRating(ascendente));
  };

  useEffect(() => {
    setIsLoading(true);

    dispatch({ type: SET_PAGINA_ACTUAL, payload: paginaActual });

    dispatch(obtenerVideojuegos(paginaActual)).then(() => {
      setIsLoading(false);
    });
  }, [dispatch, paginaActual]);

  const paginar = (numeroPagina) => setPaginaActual(numeroPagina);

  return (
    <div className={styles.homeContainer}>
      <NavBar />

      <div className={styles.filtros}>
        <div className={styles.filtrosDropdown}>
          <button className={styles.filtrosBtn}>Filtros</button>
          <div className={styles.filtrosContent}>
            <div className={styles.filtrosOrdenamiento}>
              <h3>Ordenamiento</h3>
              <button onClick={() => handleSortByName(true)}>
                Ordenar Ascendente A-Z
              </button>
              <button onClick={() => handleSortByName(false)}>
                Ordenar Descendente A-Z
              </button>
              <button onClick={() => handleSortByRating(true)}>
                Ordenar Ascendente Rating
              </button>
              <button onClick={() => handleSortByRating(false)}>
                Ordenar Descendente Rating
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.paginado}>
        <button
          onClick={() => paginar(Math.max(1, paginaActual - 1))}
          className={styles.btnPaginado}
        >
          Anterior
        </button>
        <p className={styles.paginaInfo}>
          Página {paginaActual} de {totalPaginas}
        </p>
        <button
          onClick={() => paginar(Math.min(totalPaginas, paginaActual + 1))}
          className={styles.btnPaginado}
        >
          Siguiente
        </button>
      </div>

      <div className={styles.contenidoCentral}>
        {isLoading ? (
          <div className={styles.loadingContainer}>
            <img
              src="https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif"
              alt="Cargando..."
              className={styles.loadingImage}
            />
          </div>
        ) : (
          <Cards videogames={videogames} />
        )}
      </div>
    </div>
  );
};

export default Home;
