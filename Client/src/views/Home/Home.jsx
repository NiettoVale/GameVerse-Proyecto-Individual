import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "../../components/navBar/NavBar";
import Cards from "../../components/cards/Cards";
import styles from "./Home.module.css";
import {
  obtenerVideojuegos,
  sortvideogamesByName,
  sortvideogamesByRating,
  filterGames,
  obtenerGeneros,
} from "../../redux/actions";
import { SET_PAGINA_ACTUAL } from "../../redux/action-types";

const Home = () => {
  // Cremaos un estado local para almacenar la página actual y estado de carga.
  const [paginaActual, setPaginaActual] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Obtenemos los datos del estado global usando el hook useSelector.
  const videogames = useSelector((state) => state.videogames);
  const genres = useSelector((state) => state.genres);
  const gamesByGenres = useSelector((state) => state.gamesByGenres);
  const totalPaginas = useSelector((state) => state.totalPaginas);

  // Obtener la funcion "dispatch" para despachar acciones usando useDispatch.
  const dispatch = useDispatch();

  // Creamos manejadores para el ordenamiento por nombre y rating
  const handleSortByName = (ascendente) => {
    // Despachamos la accion pasandole un valor boolean como parametro.
    dispatch(sortvideogamesByName(ascendente));
  };

  const handleSortByRating = (ascendente) => {
    // Despachamos la accion pasandole un valor boolean como parametro.
    dispatch(sortvideogamesByRating(ascendente));
  };

  const handleFilterGenres = (genre) => {
    dispatch(filterGames(genre));
  };

  // Efecto para cargar datos y paginación cuando cambia la página actual
  useEffect(() => {
    setIsLoading(true);

    dispatch({ type: SET_PAGINA_ACTUAL, payload: paginaActual });

    dispatch(obtenerVideojuegos(paginaActual)).then(() => {
      setIsLoading(false);
    });

    // Verifica si los géneros aún no están en el estado
    if (genres.length === 0) {
      dispatch(obtenerGeneros());
    }
  }, [dispatch, paginaActual, genres]);

  // Creamos una función para cambiar la página actual
  const paginar = (numeroPagina) => setPaginaActual(numeroPagina);

  return (
    <div className={styles.homeContainer}>
      {/* Barra de navegación */}
      <NavBar />

      {/* Filtros */}
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

              <h3>Géneros</h3>
              {genres.map((gen) => (
                <button key={gen} onClick={() => handleFilterGenres(gen)}>
                  {gen}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Paginación */}
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

      {/* Contenido central */}
      <div className={styles.contenidoCentral}>
        {/* Mostrar una animación de carga o los videojuegos */}
        {isLoading ? (
          <div className={styles.loadingContainer}>
            <img
              src="https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif"
              alt="Cargando..."
              className={styles.loadingImage}
            />
          </div>
        ) : (
          <Cards
            videogames={gamesByGenres.length > 0 ? gamesByGenres : videogames}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
