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

// Acción para obtener los juegos de la API:
export const obtenerVideojuegos = (pagina) => {
  return async (dispatch) => {
    try {
      const page_size = 15; // Tamaño de página (cantidad de videojuegos por página)
      const { data } = await axios.get(
        `https://api.rawg.io/api/games?key=c55f5d34232e434f8035276fcdb6303e&dates=2019-09-01,2023-05-30&platforms=18,1,7&page=${pagina}&page_size=${page_size}`
      );
      const videogames = data.results;

      // Calcular el número total de páginas.
      const totalPaginas = Math.ceil(100 / page_size);

      // Actualizar el estado global con los videojuegos y el número total de páginas.
      dispatch({ type: OBTENER_VIDEOJUEGOS, payload: videogames });
      dispatch({ type: SET_TOTAL_PAGINAS, payload: totalPaginas });
    } catch (error) {
      console.error("Error al obtener los videojuegos :(O):", error);
    }
  };
};

// Acción para obtener los juegos de la base de datos:
export const obtenerVideojuegosDB = () => {
  return async (dispatch) => {
    const { data } = await axios("http://localhost:3001/videogames");
    const modifiedData = data.map((item) => {
      const { Genres, ...rest } = item;
      return { ...rest, genres: Genres };
    });
    dispatch({ type: OBTENER_VIDEOJUEGOS_DB, payload: modifiedData });
  };
};

export const obtenerGeneros = () => {
  return async (dispatch) => {
    const { data } = await axios(
      "https://api.rawg.io/api/genres?key=c55f5d34232e434f8035276fcdb6303e&dates=2019-09-01,2023-05-30&platforms=18,1,7"
    );
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
