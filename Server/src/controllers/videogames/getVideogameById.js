require("dotenv").config();
const { Videogame, Genre } = require("../../db");
const axios = require("axios");
const { VIDEOGAMES, API_KEY } = process.env;

const getVideogameById = async (idVideogame) => {
  try {
    let videogame;

    // Verificamos si el id corresponde al de la API o la base de datos.
    const isUUID =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        idVideogame
      );

    // Si pertenece a la base de datos, lo buscamos ahi.
    if (isUUID) {
      // Realizamos la busquyeda.
      videogame = await Videogame.findByPk(idVideogame, {
        include: { model: Genre, as: "Genres", attributes: ["name"] },
      });
      // Si existe el juego, cambiamos la propiedad "Genres" a "genres".
      if (videogame) {
        videogame = {
          ...videogame.toJSON(),
          genres: videogame.Genres.map((genre) => genre.name),
        };
        delete videogame.Genres; // Eliminamos la propiedad "Genres"
      }
    } else {
      // En caso de que no se un "UUID", lo buscamos en la API
      const { data } = await axios(`${VIDEOGAMES}/${idVideogame}${API_KEY}`);

      videogame = {
        id: data.id,
        name: data.name,
        description: data.description,
        released: data.released,
        background_image: data.background_image,
        rating: data.rating,
        genres: data.genres,
      };
    }

    // Si existe el juego lo retornamos.
    if (videogame) {
      return videogame;
    } else {
      throw new Error("Videojuego no encontrado");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = getVideogameById;
