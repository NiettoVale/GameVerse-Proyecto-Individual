// action.js
import axios from "axios";
import {
  OBTENER_VIDEOJUEGOS,
  ORDENAR_POR_NOMBRE,
  ORDENAR_POR_RATING,
  SET_TOTAL_PAGINAS,
  OBTENER_VIDEOJUEGOS_DB,
  OBTENER_GENEROS,
  ORDENAR_POR_GENERO,
} from "./action-types";

const get_videogamesDb = process.env.REACT_APP_GET_VIDEOGAMESDB;
const get_genresApi = process.env.REACT_APP_GET_GENRESAPI;
const get_videogamesApi = process.env.REACT_APP_GET_VIDEOGAMESAPI;
const api_key = process.env.REACT_APP_API_KEY;

// Acción para obtener los juegos de la API:
export const obtenerVideojuegos = (pagina) => {
  return async (dispatch) => {
    try {
      const page_size = 15; // Tamaño de página (cantidad de videojuegos por página)
      const { data } = await axios.get(
        `${get_videogamesApi}${api_key}&page=${pagina}&page_size=${page_size}`
      );
      const videogames = data.results;

      // Calcular el número total de páginas.
      const totalPaginas = Math.ceil(100 / page_size);

      // Actualizar el estado global con los videojuegos y el número total de páginas.
      dispatch({ type: OBTENER_VIDEOJUEGOS, payload: videogames });
      dispatch({ type: SET_TOTAL_PAGINAS, payload: totalPaginas });
    } catch (error) {
      alert(`Error al obtener los videojuegos: ${error.message}`);
    }
  };
};

// Acción para obtener los juegos de la base de datos:
export const obtenerVideojuegosDB = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`${get_videogamesDb}`);

      if (data) {
        const modifiedData = data.map((item) => {
          const { Genres, ...rest } = item;
          return { ...rest, genres: Genres };
        });
        dispatch({ type: OBTENER_VIDEOJUEGOS_DB, payload: modifiedData });
      }
    } catch (error) {}
  };
};

export const obtenerGeneros = () => {
  return async (dispatch) => {
    const { data } = await axios(`${get_genresApi}`);
    dispatch({ type: OBTENER_GENEROS, payload: data.results });
  };
};

// Acciones para aplicar filtros y ordenar por nombre y rating
export const sortvideogamesByName = (ascendente) => {
  return { type: ORDENAR_POR_NOMBRE, payload: ascendente };
};

export const sortvideogamesByRating = (ascendente) => {
  return { type: ORDENAR_POR_RATING, payload: ascendente };
};

export const sortvideogamesByGenre = (ascendente) => {
  return { type: ORDENAR_POR_GENERO, payload: ascendente };
};
