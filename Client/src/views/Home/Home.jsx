import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "../../components/navBar/NavBar";
import Cards from "../../components/cards/Cards";
import styles from "./Home.module.css";
import {
  obtenerVideojuegos,
  sortvideogamesByName,
  sortvideogamesByRating,
  sortvideogamesByGenre,
  obtenerGeneros, // Agrega esta importación
} from "../../redux/actions";
import { SET_PAGINA_ACTUAL } from "../../redux/action-types";

const Home = () => {
  const [paginaActual, setPaginaActual] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const videogames = useSelector((state) => state.videogames);
  const genres = useSelector((state) => state.genres);
  const totalPaginas = useSelector((state) => state.totalPaginas);
  const dispatch = useDispatch();

  const handleSortByName = (ascendente) => {
    dispatch(sortvideogamesByName(ascendente));
  };

  const handleSortByRating = (ascendente) => {
    dispatch(sortvideogamesByRating(ascendente));
  };

  const handleSortByGenre = (genre) => {
    dispatch(sortvideogamesByGenre(genre));
  };

  useEffect(() => {
    setIsLoading(true); // Indicar que la carga está en progreso

    dispatch({ type: SET_PAGINA_ACTUAL, payload: paginaActual });

    // Llamar a la acción para obtener los videojuegos de la página actual.
    dispatch(obtenerVideojuegos(paginaActual)).then(() => {
      setIsLoading(false); // Indicar que la carga ha finalizado
    });

    // Obtener los géneros
    dispatch(obtenerGeneros());
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

            <div className={styles.filtrosGeneros}>
              <h3>Géneros</h3>
              {genres.map((genre) => (
                <button
                  key={genre.id}
                  onClick={() => handleSortByGenre(genre.name)}
                >
                  {genre.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.paginado}>
        {Array.from({ length: totalPaginas }, (_, index) => index + 1).map(
          (number) => (
            <button
              key={number}
              onClick={() => paginar(number)}
              className={styles.btnPaginado}
            >
              {number}
            </button>
          )
        )}
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

// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import NavBar from "../../components/navBar/NavBar";
// import Cards from "../../components/cards/Cards";
// import styles from "./Home.module.css";
// import "./Home.module.css";
// import {
//   obtenerVideojuegos,
//   sortvideogamesByName,
//   sortvideogamesByRating,
// } from "../../redux/actions";
// import { SET_PAGINA_ACTUAL } from "../../redux/action-types";

// const Home = () => {
//   const [paginaActual, setPaginaActual] = useState(1);
//   const [isLoading, setIsLoading] = useState(true);
//   const videogames = useSelector((state) => state.videogames);
//   const totalPaginas = useSelector((state) => state.totalPaginas);
//   const dispatch = useDispatch();

//   const handleSortByName = (ascendente) => {
//     dispatch(sortvideogamesByName(ascendente));
//   };

//   const handleSortByRating = (ascendente) => {
//     dispatch(sortvideogamesByRating(ascendente));
//   };

//   useEffect(() => {
//     setIsLoading(true); // Indicar que la carga está en progreso

//     dispatch({ type: SET_PAGINA_ACTUAL, payload: paginaActual });

//     // Llamar a la acción para obtener los videojuegos de la página actual.
//     dispatch(obtenerVideojuegos(paginaActual)).then(() => {
//       setIsLoading(false); // Indicar que la carga ha finalizado
//     });
//   }, [dispatch, paginaActual]);

//   const paginar = (numeroPagina) => setPaginaActual(numeroPagina);

//   return (
//     <div>
//       <NavBar />
//       <div className={styles.contenedorFiltros}>
//         <button onClick={() => handleSortByName(true)}>
//           Ordenar Ascendente A-Z
//         </button>

//         <button onClick={() => handleSortByName(false)}>
//           Ordenar Descendente A-Z
//         </button>

//         <button onClick={() => handleSortByRating(true)}>
//           Ordenar Ascendente Rating
//         </button>

//         <button onClick={() => handleSortByRating(false)}>
//           Ordenar Descendente Rating
//         </button>
//       </div>

//       <div className={styles.paginado}>
//         {Array.from({ length: totalPaginas }, (_, index) => index + 1).map(
//           (number) => (
//             <button key={number} onClick={() => paginar(number)}>
//               {number}
//             </button>
//           )
//         )}
//       </div>

//       {isLoading ? (
//         <div className={styles.loadingContainer}>
//           <img
//             src="https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif"
//             alt="Cargando..."
//             className={styles.loadingImage}
//           />
//         </div>
//       ) : (
//         <Cards videogames={videogames} />
//       )}
//     </div>
//   );
// };

// export default Home;
