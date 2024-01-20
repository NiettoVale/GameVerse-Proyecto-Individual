// action.js
import {
  OBTENER_VIDEOJUEGOS,
  ORDENAR_POR_NOMBRE,
  ORDENAR_POR_RATING,
  SET_TOTAL_PAGINAS,
  OBTENER_VIDEOJUEGOS_DB,
  OBTENER_GENEROS,
  FILTER,
  GET_USERS,
} from "./action-types";
import Swal from "sweetalert2";

const get_videogamesDb = process.env.REACT_APP_GET_VIDEOGAMESDB;
const get_genresDB = process.env.REACT_APP_GET_GENRESDB;
const get_videogamesApi = process.env.REACT_APP_GET_VIDEOGAMESAPI;
const get_users = process.env.REACT_APP_GET_USERS;
const api_key = process.env.REACT_APP_API_KEY;

// Acción para obtener los juegos de la API:
export const obtenerVideojuegos = (pagina) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${get_videogamesApi}${api_key}&page=${pagina}&page_size=15`
      );

      if (!response.ok) {
        throw new Error("Error al obtener los videojuegos");
      }

      const data = await response.json();
      const videogames = data.results;
      const totalPaginas = Math.ceil(100 / 15);

      dispatch({ type: OBTENER_VIDEOJUEGOS, payload: videogames });
      dispatch({ type: SET_TOTAL_PAGINAS, payload: totalPaginas });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
      console.log(error.message);
    }
  };
};

// Acción para obtener los juegos de la base de datos:
export const obtenerVideojuegosDB = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(get_videogamesDb);

      if (!response.ok) {
        throw new Error("Algo salió mal");
      }

      const data = await response.json();
      if (!data.error) {
        const modifiedData = data.map((item) => {
          const { Genres, ...rest } = item;
          return { ...rest, genres: Genres };
        });

        dispatch({ type: OBTENER_VIDEOJUEGOS_DB, payload: modifiedData });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.error,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
      console.log(error.message);
    }
  };
};

export const obtenerGeneros = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(get_genresDB);

      if (!response.ok) {
        throw new Error("Error al obtener los géneros");
      }

      const data = await response.json();
      dispatch({ type: OBTENER_GENEROS, payload: data });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
      console.log(error.message);
    }
  };
};

export const obtenerUsuarios = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(get_users);

      if (!response.ok) {
        throw new Error("Error al obtener los usuarios");
      }

      const responseData = await response.json();
      dispatch({ type: GET_USERS, payload: responseData });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
      console.log(error.message);
    }
  };
};

// Acciones para aplicar filtros y ordenar por nombre y rating
export const sortvideogamesByName = (ascendente) => {
  return { type: ORDENAR_POR_NOMBRE, payload: ascendente };
};

export const sortvideogamesByRating = (ascendente) => {
  return { type: ORDENAR_POR_RATING, payload: ascendente };
};

export const filterGames = (genre) => {
  return { type: FILTER, payload: genre };
};
