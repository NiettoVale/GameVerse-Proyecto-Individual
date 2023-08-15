// action.js
import axios from "axios";
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

const get_videogamesDb = process.env.REACT_APP_GET_VIDEOGAMESDB;
const get_genresDB = process.env.REACT_APP_GET_GENRESDB;
const get_videogamesApi = process.env.REACT_APP_GET_VIDEOGAMESAPI;
const get_users = process.env.REACT_APP_GET_USERS;
const api_key = process.env.REACT_APP_API_KEY;

// Acción para obtener los juegos de la API:
export const obtenerVideojuegos = (pagina) => {
  return async (dispatch) => {
    try {
      const page_size = 15; // Tamaño de página (cantidad de videojuegos por página)
      /*
      Realizamos una peticion a la API pasando la pagina actual que recibimos por parametro
      y el tamaño de la pagina, es decir la cantidad de viedoejuegos que queremos mostrar
      por página.
      */
      const { data } = await axios.get(
        `${get_videogamesApi}${api_key}&page=${pagina}&page_size=${page_size}`
      );

      // Guardamos los videojuegos en una variable
      const videogames = data.results;

      // Calculamos el número total de páginas.
      const totalPaginas = Math.ceil(100 / page_size);

      /*
      Despachamos una action pasandole como payload los juegos que almacenamos
      y el total de paginas
      */
      dispatch({ type: OBTENER_VIDEOJUEGOS, payload: videogames });
      dispatch({ type: SET_TOTAL_PAGINAS, payload: totalPaginas });
    } catch (error) {
      // Si hay algun error lo informamos:
      alert("Error al obtener los videojuegos");
      console.log(error.message);
    }
  };
};

// Acción para obtener los juegos de la base de datos:
export const obtenerVideojuegosDB = () => {
  return async (dispatch) => {
    try {
      /*
      Realizamos una peticion al backend para obtener los juegos creados:
      */
      const { data } = await axios(`${get_videogamesDb}`);
      console.log(data.error);

      if (data.error) {
        alert(data.error);
      }

      // Cambiamos la propiedad "Genres" por "genres" y almacenamos el resultado en un una variable
      const modifiedData = data.map((item) => {
        const { Genres, ...rest } = item;
        return { ...rest, genres: Genres };
      });
      // Despachamos la action pasandole como payload la info de los juegos de la base de datos.
      dispatch({ type: OBTENER_VIDEOJUEGOS_DB, payload: modifiedData });
    } catch (error) {
      // Si hay algun error lo informamos:

      console.log(error.message);
    }
  };
};

export const obtenerGeneros = () => {
  return async (dispatch) => {
    /*
    Realizamos una peticion a la API para obtener los generos
    y despachamos la action pasandole como payload el resultado
    de la peticion.
    */
    const { data } = await axios(`${get_genresDB}`);
    dispatch({ type: OBTENER_GENEROS, payload: data });
  };
};

export const obtenerUsuarios = () => {
  return async (dispatch) => {
    const response = await fetch(get_users);
    const responseData = await response.json();

    dispatch({ type: GET_USERS, payload: responseData });
  };
};

// Acciones para aplicar filtros y ordenar por nombre y rating
export const sortvideogamesByName = (ascendente) => {
  return { type: ORDENAR_POR_NOMBRE, payload: ascendente };
};

export const sortvideogamesByRating = (ascendente) => {
  return { type: ORDENAR_POR_RATING, payload: ascendente };
};

// Video de DAI:
export const filterGames = (genre) => {
  return { type: FILTER, payload: genre };
};
