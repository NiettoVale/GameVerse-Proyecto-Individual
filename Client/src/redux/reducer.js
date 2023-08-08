import {
  OBTENER_VIDEOJUEGOS,
  ORDENAR_POR_NOMBRE,
  ORDENAR_POR_RATING,
  ORDENAR_POR_GENERO,
  SET_TOTAL_PAGINAS,
  OBTENER_VIDEOJUEGOS_DB,
  OBTENER_GENEROS,
} from "./action-types";

const initialState = {
  videogames: [],
  videogamesDB: [],
  genres: [],
  paginaActual: 1,
  totalPaginas: 1,
  generoSeleccionado: null,
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case OBTENER_VIDEOJUEGOS:
      return {
        ...state,
        videogames: payload,
      };

    case OBTENER_VIDEOJUEGOS_DB:
      return {
        ...state,
        videogamesDB: payload,
      };

    case OBTENER_GENEROS:
      return {
        ...state,
        genres: payload,
      };

    case ORDENAR_POR_NOMBRE:
      const sortedvideogamesByName = [...state.videogames].sort((a, b) =>
        payload ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      );
      return {
        ...state,
        videogames: sortedvideogamesByName,
      };

    case ORDENAR_POR_RATING:
      const sortedvideogamesByRating = [...state.videogames].sort((a, b) => {
        const ratingA = parseFloat(a.rating);
        const ratingB = parseFloat(b.rating);

        // Si payload es true, ordenar ascendente, de lo contrario, ordenar descendente
        return payload ? ratingA - ratingB : ratingB - ratingA;
      });
      return {
        ...state,
        videogames: sortedvideogamesByRating,
      };

    case ORDENAR_POR_GENERO:
      const generoSeleccionado = state.generoSeleccionado;
      if (!generoSeleccionado) {
        return state; // Si no hay género seleccionado, no se realiza ordenamiento
      }

      const sortedvideogamesByGenre = [...state.videogames].filter(
        (videojuego) => videojuego.genre === generoSeleccionado
      );

      return {
        ...state,
        videogames: sortedvideogamesByGenre,
      };

    case SET_TOTAL_PAGINAS:
      return {
        ...state,
        totalPaginas: payload,
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
