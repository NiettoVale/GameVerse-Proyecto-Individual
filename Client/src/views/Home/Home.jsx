import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../../components/navBar/NavBar";
import Cards from "../../components/cards/Cards";
import styles from "./Home.module.css";
import "./Home.module.css";

const Home = () => {
  // Definimos la cantidad de elementos por página.
  const itemsPorPagina = 15;

  // Calculamos el número total de páginas en función del total de videojuegos (100) y la cantidad de elementos por página.
  const totalPaginas = Math.ceil(100 / itemsPorPagina);

  // Declaramos el estado local 'paginaActual' y la función 'setPaginaActual' para actualizarlo.
  const [paginaActual, setPaginaActual] = useState(1);

  // Declaramos el estado local 'videojuegos' y la función 'setVideojuegos' para almacenar los resultados de los videojuegos obtenidos de la API.
  const [videojuegos, setVideojuegos] = useState([]);

  /*
  Definimos una función asincrónica 'getVideogames' que recibe como parámetro el número de página.
  Esta función realiza una petición a la API para obtener los videojuegos de esa página.
  */
  const getVideogames = async (pagina) => {
    try {
      // Realizamos una petición GET a la API con los atributos 'page --> pagina actual'y 'page_size --> cantidad de elementos que queremos en cada pagina'
      const { data } = await axios.get(
        `https://api.rawg.io/api/games?key=aeb12d6781774ed69cb910c7ad69b389&dates=2019-09-01,2023-05-30&platforms=18,1,7&page=${pagina}&page_size=${itemsPorPagina}`
      );

      // Aca actualizamos el estado 'videojuegos' con los resultados obtenidos de la API (data.results).
      setVideojuegos(data.results);
    } catch (error) {
      // Si ocurre algún error durante la petición a la API, se muestra un mensaje de error.
      console.error("Error al obtener los videojuegos:", error);
    }
  };

  // Aca usamos el hook 'useEffect' para ejecutar la función 'getVideogames' cuando el valor de 'paginaActual' cambia.
  useEffect(() => {
    getVideogames(paginaActual);
  }, [paginaActual]);

  // Define la función 'paginar' que recibe el número de página como parámetro y actualiza el estado 'paginaActual' con ese valor.
  const paginar = (numeroPagina) => setPaginaActual(numeroPagina);

  return (
    <div>
      <NavBar />
      <div className={styles.contenedorFiltros}>
        <button>Ordenar Ascendente A-Z</button>
        <button>Ordenar Descendente A-Z</button>
        <button>Ordenar Ascendente Rating</button>
        <button>Ordenar Descendente Rating</button>
      </div>
      <div className={styles.paginado}>
        {/* [1,2,3,4,5,6,7] */}
        {Array.from({ length: totalPaginas }, (_, index) => index + 1).map(
          (number) => (
            <button key={number} onClick={() => paginar(number)}>
              {number}
            </button>
          )
        )}
      </div>

      <div>
        <Cards videogames={videojuegos} />
      </div>
    </div>
  );
};

export default Home;
