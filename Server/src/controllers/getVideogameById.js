require("dotenv").config();
const { Videogame, Genre } = require("../db.js");
const axios = require("axios");
const { VIDEOGAMES, API_KEY } = process.env;

const getVideogameById = async (idVideogame) => {
  try {
    let videogame;

    const isUUID =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        idVideogame
      );

    if (isUUID) {
      // Buscar en la base de datos y cambiar propiedad "Genres" a "genres"
      videogame = await Videogame.findByPk(idVideogame, {
        include: { model: Genre, as: "Genres", attributes: ["name"] },
      });
      if (videogame) {
        videogame = {
          ...videogame.toJSON(),
          genres: videogame.Genres.map((genre) => genre.name),
        };
        delete videogame.Genres; // Eliminamos la propiedad "Genres"
      }
    } else {
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
