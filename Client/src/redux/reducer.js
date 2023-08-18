// Importamos las actions-types necesarias:
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

/*
Creamos un estado global para almacenar lo siguiente:
  * los videojuegos de la API.
  * los videojuegos de la Base de datos.
  * los generos obtenidos de la API.
  * los usuarios de la base de datos.
  * el total de páginas.
*/
const initialState = {
  videogames: [],
  videogamesDB: [],
  gamesByGenres: [],
  genres: [],
  users: [],
  totalPaginas: 1,
};

/*
Definimos el reducer, pasandole como parametros el estado inicial
y la destructuracion de la action --> type, payload.
*/
const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    // almacenamos la cantidad total de las paginas.
    case SET_TOTAL_PAGINAS:
      return {
        ...state,
        totalPaginas: payload,
      };

    // Almacenamos los juegos de la API.
    case OBTENER_VIDEOJUEGOS:
      return {
        ...state,
        videogames: payload,
        gamesByGenres: [],
      };

    // Almacenamos los juegos de la DB.
    case OBTENER_VIDEOJUEGOS_DB:
      return {
        ...state,
        videogamesDB: payload,
      };

    // Almacenamos los generos de la API
    case OBTENER_GENEROS:
      return {
        ...state,
        genres: payload,
      };

    // Ordenamos por nombre y modificamos los juegos de la API
    case ORDENAR_POR_NOMBRE:
      /*
      ? [...state.videogames] --> generamos una copia del state videogames.
      
      ? .sort((a, b)) --> utilizamos el sort para ordenar el arreglo
      
      ? payload ? a.name.localeCompare(b.name) --> el payload es un bool, si es true se va a ordenar lexicograficamente de forma ascendente mediante el metodo localeCompare.

      ? : b.name.localeCompare(a.name) --> en caso de que sea false se ordenara lexicograficamente de forma descendentemente mediante el metodo localeCompare.
      */
      const sortedvideogamesByName = [...state.videogames].sort((a, b) =>
        payload ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      );

      // Devolvemos el estado con los juegos ordenados por nombre:
      return {
        ...state,
        videogames: sortedvideogamesByName,
      };

    // Ordenamos por rating y modificamos los juegos de la API
    case ORDENAR_POR_RATING:
      const sortedvideogamesByRating = [...state.videogames].sort((a, b) => {
        // Si payload es verdadero, se ordena en orden ascendente (a - b).
        // Si payload no es verdadero, se ordena en orden descendente (b - a).
        return payload ? a.rating - b.rating : b.rating - a.rating;
      });

      // devolvemos el estado con los juegos ordenados por rating:
      return {
        ...state,
        videogames: sortedvideogamesByRating,
      };

    case FILTER:
      const allVideogamesFiltered = state.videogames.filter((videogame) => {
        return videogame.genres.some((genre) => payload.includes(genre.name));
      });

      return {
        ...state,
        gamesByGenres: allVideogamesFiltered,
      };

    case GET_USERS:
      return {
        ...state,
        users: payload,
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
